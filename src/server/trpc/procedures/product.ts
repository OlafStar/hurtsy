import {editProductFormSchema, productFormSchema} from '~validations/product';
import {privateProcedure, publicProcedure} from '../trpc';
import {TRPCError} from '@trpc/server';
import prismadb from '~lib/prismadb';
import {getUserCompany} from '../utils/getUserCompany';
import {z} from 'zod';

export const productProcedures = {
    createProduct: privateProcedure
        .input(productFormSchema)
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = productFormSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const company = await getUserCompany(ctx);

            if (!company) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Company dosent exist',
                });
            }

            const defaultRepresentative = await prismadb.representative.findMany({
                where: {
                    companyId: company.id,
                    name: company.name,
                },
            });

            const product = await prismadb.product.create({
                data: {
                    name: validatedInput.data.name,
                    description: validatedInput.data.description,
                    mainImage: validatedInput.data.mainImage,
                    images: [...(validatedInput.data.images || [])],
                    category: validatedInput.data.category,
                    prices: validatedInput.data.prices,
                    deliveryPrice: validatedInput.data.deliveryPrice,
                    customizations:
                        validatedInput.data.customizations.length > 0
                            ? (validatedInput.data.customizations as {
                                  minQuantity: number;
                                  name: string;
                              }[])
                            : [],
                    customProperties: validatedInput.data.customProperties,
                    companyId: company.id,
                    representativeId:
                        validatedInput.data.representativeId ||
                        defaultRepresentative[0].id,
                },
            });

            console.log(product);

            return product;
        }),
    editProduct: privateProcedure
        .input(editProductFormSchema)
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = editProductFormSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const company = await getUserCompany(ctx);

            if (!company) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Company dosent exist',
                });
            }

            const defaultRepresentative = await prismadb.representative.findMany({
                where: {
                    companyId: company.id,
                    name: company.name,
                },
            });

            const product = await prismadb.product.update({
                where: {
                    id: validatedInput.data.id,
                },
                data: {
                    name: validatedInput.data.name,
                    description: validatedInput.data.description,
                    mainImage: validatedInput.data.mainImage,
                    images: [...(validatedInput.data.images || [])],
                    category: validatedInput.data.category,
                    prices: validatedInput.data.prices,
                    deliveryPrice: validatedInput.data.deliveryPrice,
                    customizations:
                        validatedInput.data.customizations.length > 0
                            ? (validatedInput.data.customizations as {
                                  minQuantity: number;
                                  name: string;
                              }[])
                            : [],
                    customProperties: validatedInput.data.customProperties,
                    companyId: company.id,
                    representativeId:
                        validatedInput.data.representativeId ||
                        defaultRepresentative[0].id,
                },
            });

            console.log(product);

            return product;
        }),
    getUserCompanyProducts: privateProcedure.query(async ({ctx}) => {
        const company = await getUserCompany(ctx);

        if (!company) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: 'Company dosent exist',
            });
        }

        return prismadb.product.findMany({
            where: {
                companyId: company.id,
            },
        });
    }),
    deleteProduct: privateProcedure
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

            const existingProduct = await prismadb.product.findUnique({
                where: {
                    id: validatedInput.data.id,
                },
            });

            if (!existingProduct) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Product not found.',
                });
            }

            await prismadb.product.delete({
                where: {
                    id: validatedInput.data.id,
                },
            });

            return {message: 'Product deleted successfully.'};
        }),
    getProductForEdit: privateProcedure
        .input(z.string())
        .query(async ({input, ctx}) => {
            const company = await getUserCompany(ctx);

            if (!company) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Company not found',
                });
            }

            const validatedInput = z.string().safeParse(input);

            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            return prismadb.product.findFirst({
                where: {
                    id: validatedInput.data,
                    companyId: company.id,
                },
            });
        }),
    getProduct: publicProcedure.input(z.string()).query(async ({input}) => {
        const validatedInput = z.string().safeParse(input);

        if (!validatedInput.success) {
            throw new TRPCError({
                code: 'BAD_REQUEST',
                message: validatedInput.error.message,
            });
        }

        return prismadb.product.findFirst({
            where: {
                id: validatedInput.data,
            },
        });
    }),
    getProducts: publicProcedure
        .input(
            z.object({
                search: z.string().optional(),
                category: z.string().optional(),
                subCategory: z.string().optional(),
            }),
        )
        .query(async ({input}) => {
            let whereClause: any = {};

            const validatedInput = z
                .object({
                    search: z.string().optional(),
                    category: z.string().optional(),
                    subCategory: z.string().optional(),
                })
                .safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const {search, subCategory, category} = validatedInput.data;
            // If search is provided, it will check for product name or description
            if (search) {
                whereClause.OR = [
                    {name: {contains: search}},
                    {description: {contains: search}},
                ];
            }

            // If category is provided, it will filter by main category
            if (category) {
                whereClause.AND = {
                    category: {
                        path: '$.mainCategory',
                        equals: category,
                    },
                };
            }

            // If subCategory is provided, it will filter by sub categories
            if (subCategory) {
                whereClause.AND = {
                    category: {
                        path: '$.subCategory',
                        array_contains: subCategory,
                    },
                };
            }

            console.log(whereClause);

            return await prismadb.product.findMany({where: whereClause});
        }),
};
