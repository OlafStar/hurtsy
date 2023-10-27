import {publicProcedure, privateProcedure, router} from './trpc';
import {TRPCError} from '@trpc/server';
import {z} from 'zod';
import prismadb from '~lib/prismadb';
import {
    companyCreationSchema,
    getCompanyRepresentativesInput,
    representativeCreationSchema,
    representativeEditSchema,
} from '~validations/company';
import { productCreationSchema } from '~validations/product';

export const appRouter = router({
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
                user: {id},
            } = ctx;

            const existingCompany = await prismadb.company.findUnique({
                where: {
                    userId: id,
                },
            });

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
                    website: validatedInput.data.website,
                    street: validatedInput.data.address,
                    postCode: validatedInput.data.postalCode,
                    country: validatedInput.data.country,
                    establishment: validatedInput.data.established,
                    type: validatedInput.data.type,
                    userId: ctx.user.id,
                },
            });

            console.log(company);

            return company;
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
    createRepresentatives: privateProcedure
        .input(representativeCreationSchema)
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = representativeCreationSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const representative = await prismadb.representative.create({
                data: {
                    companyId: validatedInput.data.companyId,
                    name: validatedInput.data.name,
                    email: validatedInput.data.email,
                    phone: validatedInput.data.phoneNumber,
                },
            });

            console.log(representative);

            return representative;
        }),
    editRepresentative: privateProcedure
        .input(representativeEditSchema) // You would need to define this validation schema
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = representativeEditSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            // Check if representative exists
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

            // Update the representative
            const updatedRepresentative = await prismadb.representative.update({
                where: {
                    id: validatedInput.data.id,
                },
                data: {
                    name: validatedInput.data.name,
                    email: validatedInput.data.email,
                    phone: validatedInput.data.phoneNumber,
                },
            });

            console.log(updatedRepresentative);

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

            await prismadb.representative.delete({
                where: {
                    id: validatedInput.data.id,
                },
            });

            return {message: 'Representative deleted successfully.'};
        }),
    createProduct: privateProcedure
        .input(productCreationSchema)
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = productCreationSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const product =
            //  await prismadb.product.create({
                // data:
                 {
                    name: validatedInput.data.name,
                    description: validatedInput.data.description,
                    mainImage: validatedInput.data.mainImage,
                    images: validatedInput.data.images,
                    category: {
                        create: validatedInput.data.category,
                    },
                    prices: validatedInput.data.prices,
                    deliveryPrice: validatedInput.data.deliveryPrice,
                    customizations: validatedInput.data.customizations,
                    customProperties: validatedInput.data.customProperties,
                    companyId: validatedInput.data.companyId,
                    representativeId: validatedInput.data.representativeId,
                }
            // });

            console.log(product);

            return product;
        }),
});

export type AppRouter = typeof appRouter;
