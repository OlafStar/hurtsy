import {TRPCError} from '@trpc/server';
import {z} from 'zod';
import {addWeeks} from 'date-fns';

import {
    editProductFormSchema,
    getProductFilterSchema,
    productFormSchema,
} from '~validations/product';
import prismadb from '~lib/prismadb';
import {PLANS} from '~config/stripe';

import {privateProcedure, publicProcedure} from '../trpc';
import {getUserCompany} from '../utils/getUserCompany';

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

            const productsNumber = await prismadb.product.count({
                where: {
                    companyId: company.id,
                },
            });

            if (productsNumber >= ctx.subscriptionPlan.availableProducts) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Exceed max number',
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

            return product;
        }),
    getUserCompanyProducts: privateProcedure
        .input(z.boolean().optional())
        .query(async ({input, ctx}) => {
            const company = await getUserCompany(ctx);

            if (!company) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: 'Company dosent exist',
                });
            }

            const isPromoted = input;

            const getPromoted = isPromoted ? {promotedTo: {gte: new Date()}} : {};

            return prismadb.product.findMany({
                where: {
                    companyId: company.id,
                    AND: getPromoted,
                },
                orderBy: [
                    {
                        createdAt: 'desc',
                    },
                ],
            });
        }),
    getUserProductsCount: privateProcedure.query(async ({ctx}) => {
        const company = await getUserCompany(ctx);

        if (!company) {
            return {
                current: 0,
                max: PLANS[0].availableProducts,
            };
        }

        const counter = await prismadb.product.count({
            where: {
                companyId: company.id,
            },
        });

        return {
            current: counter,
            max: ctx.subscriptionPlan.availableProducts,
        };
    }),
    deleteProduct: privateProcedure
        .input(
            z.object({
                id: z.string(),
            }),
        )
        .mutation(async ({input}) => {
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
            include: {
                company: true,
            },
        });
    }),
    getProducts: publicProcedure
        .input(getProductFilterSchema)
        .query(async ({input}) => {
            let whereClause: any = {};

            const validatedInput = getProductFilterSchema.safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const {
                search,
                subCategory,
                category,
                companyType,
                deliveryPrice,
                companyId,
                pagination: {page, pageSize},
            } = validatedInput.data;

            // Initialize the AND array to hold all AND conditions
            whereClause.AND = [];

            // If search is provided, it will check for product name or description
            let keywords: string[] | undefined = undefined;

            if (search) {
                keywords = search.split(' ');
                whereClause.OR = keywords
                    .map((keyword) => [
                        {name: {contains: keyword}},
                        {description: {contains: keyword}},
                    ])
                    .flat();
            }

            // If category is provided, it will filter by main category
            if (category) {
                whereClause.AND.push({
                    category: {
                        path: '$.mainCategory',
                        equals: category,
                    },
                });
            }

            // If subCategory is provided, it will filter by sub categories
            if (subCategory) {
                whereClause.AND.push({
                    category: {
                        path: '$.subCategory',
                        array_contains: subCategory,
                    },
                });
            }

            if (deliveryPrice) {
                whereClause.AND.push({
                    deliveryPrice: {
                        lte: deliveryPrice,
                    },
                });
            }

            if (companyType) {
                whereClause.AND.push({
                    company: {
                        type: {
                            in: companyType,
                        },
                    },
                });
            }

            if (companyId) {
                whereClause.AND.push({
                    company: {
                        id: {
                            equals: companyId,
                        },
                    },
                });
            }

            if (whereClause.AND.length === 0) {
                delete whereClause.AND;
            }

            const skip = (page - 1) * pageSize;

            const totalProduct = await prismadb.product.count({
                where: whereClause,
            });

            const products = await prismadb.product.findMany({
                where: whereClause,
                include: {
                    company: true,
                },
                orderBy: [
                    {
                        promotedTo: 'desc',
                    },
                    {
                        createdAt: 'desc',
                    },
                ],
                skip: skip,
                take: pageSize,
            });

            const isLastPage = skip + pageSize >= totalProduct;

            const sortedProducts = products
                .map((product) => {
                    const matchCount = keywords?.reduce((count, keyword) => {
                        const regex = new RegExp(keyword, 'gi');
                        return (
                            count +
                            ((product.name.match(regex) || []).length +
                                (product.description!.match(regex) || []).length)
                        );
                    }, 0);
                    return {...product, matchCount};
                })
                .sort((a, b) => b.matchCount! - a.matchCount!);

            return {
                products: search ? sortedProducts : products,
                currentPage: page,
                isLastPage,
                totalProduct,
                totalPages: Math.ceil(totalProduct / pageSize),
            };
        }),
    promoteProduct: privateProcedure
        .input(z.string())
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = z.string().safeParse(input);
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

            const oneWeekFromNow = addWeeks(new Date(), 1);

            await prismadb.product.update({
                where: {
                    id: validatedInput.data,
                },
                data: {
                    promotedTo: oneWeekFromNow,
                },
            });
        }),
    bumpProduct: privateProcedure
        .input(z.string())
        .mutation(async ({input, ctx}) => {
            // Validate input
            const validatedInput = z.string().safeParse(input);
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

            await prismadb.product.update({
                where: {
                    id: validatedInput.data,
                },
                data: {
                    createdAt: new Date(),
                },
            });
        }),
};
