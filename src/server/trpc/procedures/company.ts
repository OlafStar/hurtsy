import prismadb from '~lib/prismadb';
import {privateProcedure, publicProcedure} from '../trpc';
import {TRPCError} from '@trpc/server';
import {companyCreationSchema} from '~validations/company';
import {getUserCompany} from '../utils/getUserCompany';
import {z} from 'zod';

export const companyProcedures = {
    getCompany: publicProcedure.input(z.string()).query(async ({input}) => {
        const validatedInput = z.string().safeParse(input);

        if (!validatedInput.success) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: validatedInput.error.message,
            });
        }
        return await prismadb.company.findUnique({
            where: {
                id: validatedInput.data,
            },
        });
    }),
    getUserCompany: privateProcedure.query(async ({ctx}) => {
        const {
            user: {id},
        } = ctx;

        return await prismadb.company.findUnique({
            where: {
                userId: id,
            },
        });
    }),
    createCompany: privateProcedure
        .input(companyCreationSchema)
        .mutation(async ({input, ctx}) => {
            const {
                user: {email},
            } = ctx;

            const existingCompany = await getUserCompany(ctx);

            if (existingCompany) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'User already has a company.',
                });
            }
            // Validate input
            const validatedInput = companyCreationSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const company = await prismadb.company.create({
                data: {
                    name: validatedInput.data.companyName,
                    city: validatedInput.data.city,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image,
                    website: validatedInput.data.website,
                    street: validatedInput.data.address,
                    postCode: validatedInput.data.postalCode,
                    country: validatedInput.data.country,
                    establishment: validatedInput.data.established,
                    type: validatedInput.data.type,
                    userId: ctx.user.id,
                },
            });

            if (!company) {
                throw new TRPCError({
                    code: 'INTERNAL_SERVER_ERROR',
                    message: 'Error with creating company',
                });
            }

            await prismadb.representative.create({
                data: {
                    companyId: company.id,
                    name: company.name,
                    email: email as string,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image,
                },
            });


            return company;
        }),
    editCompany: privateProcedure
        .input(companyCreationSchema)
        .mutation(async ({input, ctx}) => {
            const {
                user: {email, id},
            } = ctx;

            // Validate input
            const validatedInput = companyCreationSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const existingCompany = await getUserCompany(ctx);

            if (!existingCompany) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Company not found',
                });
            }

            const companyRepresentative = await prismadb.representative.findFirst({
                where: {
                    name: existingCompany.name,
                },
            });

            if (companyRepresentative) {
                await prismadb.representative.update({
                    where: {
                        id: companyRepresentative?.id,
                    },
                    data: {
                        name: validatedInput.data.companyName,
                        image: validatedInput.data.image,
                    },
                });
            } else {
                await prismadb.representative.create({
                    data: {
                        companyId: existingCompany.id,
                        name: validatedInput.data.companyName,
                        email: email as string,
                        phone: validatedInput.data.phoneNumber,
                        image: validatedInput.data.image,
                    },
                });
            }

            const company = await prismadb.company.update({
                data: {
                    name: validatedInput.data.companyName,
                    city: validatedInput.data.city,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image,
                    website: validatedInput.data.website,
                    street: validatedInput.data.address,
                    postCode: validatedInput.data.postalCode,
                    country: validatedInput.data.country,
                    establishment: validatedInput.data.established,
                    type: validatedInput.data.type,
                    userId: id,
                },
                where: {
                    userId: id,
                },
            });

            return company;
        }),
};
