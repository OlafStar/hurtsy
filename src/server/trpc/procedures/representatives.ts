import {
    getCompanyRepresentativesInput,
    representativeEditSchema,
    representativeFormSchema,
} from '~validations/company';
import {privateProcedure, publicProcedure} from '../trpc';
import {TRPCError} from '@trpc/server';
import prismadb from '~lib/prismadb';
import {z} from 'zod';
import {getUserCompany} from '../utils/getUserCompany';
import { PLANS } from '~config/stripe';

export const representativesProcedures = {
    getRepresentative: publicProcedure.input(z.string()).query(async ({input}) => {
        const validatedInput = z.string().safeParse(input);

        if (!validatedInput.success) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: validatedInput.error.message,
            });
        }
        return await prismadb.representative.findUnique({
            where: {
                id: validatedInput.data,
            },
        });
    }),
    getCompanyRepresentatives: publicProcedure
        .input(getCompanyRepresentativesInput)
        .query(async ({input}) => {
            return await prismadb.representative.findMany({
                where: {
                    companyId: input.companyId,
                },
            });
        }),
    getUserCompanyRepresentatives: privateProcedure.query(async ({ctx}) => {
        const company = await getUserCompany(ctx);

        if (!company) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'Not found company for user',
            });
        }

        return await prismadb.representative.findMany({
            where: {
                companyId: company.id,
            },
        });
    }),
    getUserRepresentativesCount: privateProcedure.query(async ({ctx}) => {
        const company = await getUserCompany(ctx);

        if (!company) {
            return {
                current: 0,
                max: PLANS[0].availableRepresentatives,
            };
        }

        const counter = await prismadb.representative.count({
            where: {
                companyId: company.id,
            },
        });

        return {
            current: counter,
            max: ctx.subscriptionPlan.availableRepresentatives,
        };
    }),
    createRepresentatives: privateProcedure
        .input(representativeFormSchema)
        .mutation(async ({input, ctx}) => {
            // Validate input
            const company = await getUserCompany(ctx);

            if (!company) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Company dosent exist',
                });
            }

            const representativesNumber = await prismadb.representative.count({
                where: {
                    companyId: company.id,
                },
            });

            if (
                representativesNumber >=
                ctx.subscriptionPlan.availableRepresentatives
            ) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Exceed max number',
                });
            }

            const validatedInput = representativeFormSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const representative = await prismadb.representative.create({
                data: {
                    companyId: company.id,
                    name: validatedInput.data.name,
                    email: validatedInput.data.email,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image,
                },
            });

            return representative;
        }),
    editRepresentative: privateProcedure
        .input(representativeEditSchema)
        .mutation(async ({input, ctx}) => {
            const validatedInput = representativeEditSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const existingRepresentative = await prismadb.representative.findUnique({
                where: {
                    id: validatedInput.data.id,
                },
            });

            if (!existingRepresentative) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Representative not found.',
                });
            }

            const company = await prismadb.company.findUnique({
                where: {
                    id: existingRepresentative.companyId,
                },
            });

            if (!company) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Company not found.',
                });
            }

            if (
                existingRepresentative.name === company.name &&
                validatedInput.data.name !== company.name
            ) {
                throw new TRPCError({
                    code: 'METHOD_NOT_SUPPORTED',
                    message: 'Cannot edit company representative name.',
                });
            }

            const updatedRepresentative = await prismadb.representative.update({
                where: {
                    id: validatedInput.data.id,
                },
                data: {
                    name: validatedInput.data.name,
                    email: validatedInput.data.email,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image,
                },
            });

            return updatedRepresentative;
        }),
    deleteRepresentative: privateProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({input, ctx}) => {
            const validatedInput = z
                .object({
                    id: z.string(),
                })
                .safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const existingRepresentative = await prismadb.representative.findUnique({
                where: {
                    id: validatedInput.data.id,
                },
            });

            if (!existingRepresentative) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Representative not found.',
                });
            }

            const company = await prismadb.company.findUnique({
                where: {
                    id: existingRepresentative.companyId,
                },
            });

            if (!company) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Company not found.',
                });
            }

            if (existingRepresentative.name === company?.name) {
                throw new TRPCError({
                    code: 'METHOD_NOT_SUPPORTED',
                    message: 'Company representative cannot be deleted.',
                });
            }

            await prismadb.representative.delete({
                where: {
                    id: validatedInput.data.id,
                },
            });

            return {message: 'Representative deleted successfully.'};
        }),
};
