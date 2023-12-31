import {TRPCError} from '@trpc/server';
import {z} from 'zod';

import prismadb from '~lib/prismadb';
import {companyCreationSchema, getCompaniesFilterSchema} from '~validations/company';
import {CategoryWeb} from '~types/products';

import {privateProcedure, publicProcedure} from '../trpc';
import {getUserCompany} from '../utils/getUserCompany';

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

            await prismadb.company.create({
                data: {
                    name: validatedInput.data.companyName,
                    description: validatedInput.data.description,
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
        }),
    editCompany: privateProcedure
        .input(companyCreationSchema)
        .mutation(async ({input, ctx}) => {
            const {
                user: {id},
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
            console.log('new image', validatedInput.data.image);

            await prismadb.company.update({
                data: {
                    name: validatedInput.data.companyName,
                    description: validatedInput.data.description,
                    city: validatedInput.data.city,
                    phone: validatedInput.data.phoneNumber,
                    image: validatedInput.data.image ?? null,
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
        }),
    getCompanyCategories: publicProcedure
        .input(z.string())
        .query(async ({input}) => {
            const validatedInput = z.string().safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const companyId = validatedInput.data;

            const productsCategories = (await prismadb.product.findMany({
                where: {
                    companyId: companyId,
                },
                select: {
                    category: true,
                },
            })) as Array<{category: CategoryWeb}>;

            const createCategoryIdentifier = (category: CategoryWeb) =>
                category.mainCategory.toLowerCase();

            const categoriesMap = new Map<string, CategoryWeb>();

            productsCategories.forEach((product) => {
                const category = product.category;
                const identifier = createCategoryIdentifier(category);
                const existingCategory = categoriesMap.get(identifier);

                if (existingCategory) {
                    existingCategory.subCategory = Array.from(
                        new Set([
                            ...existingCategory.subCategory,
                            ...category.subCategory,
                        ]),
                    );
                } else {
                    categoriesMap.set(identifier, {
                        mainCategory: category.mainCategory,
                        subCategory: Array.from(new Set(category.subCategory)),
                    });
                }
            });

            return Array.from(categoriesMap.values());
        }),

    getCompanies: publicProcedure
        .input(getCompaniesFilterSchema)
        .query(async ({input}) => {
            let whereClause: any = {};

            const validatedInput = getCompaniesFilterSchema.safeParse(input);
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
                pagination: {page, pageSize},
            } = validatedInput.data;

            // Initialize the AND array to hold all AND conditions
            whereClause.AND = [];

            // If search is provided, it will check for product name or description
            if (search) {
                whereClause.OR = [
                    {name: {contains: search}},
                    {products: {some: {name: {contains: search}}}},
                    {products: {some: {description: {contains: search}}}},
                ];
            }

            // If category is provided, it will filter by main category
            if (category) {
                whereClause.AND.push({
                    products: {
                        some: {
                            category: {
                                path: '$.mainCategory',
                                equals: category,
                            },
                        },
                    },
                });
            }

            // If subCategory is provided, it will filter by sub categories
            if (subCategory) {
                whereClause.AND.push({
                    products: {
                        some: {
                            category: {
                                path: '$.subCategory',
                                array_contains: subCategory,
                            },
                        },
                    },
                });
            }

            if (companyType) {
                console.log(companyType);
                whereClause.AND.push({
                    type: {
                        in: companyType,
                    },
                });
            }

            if (whereClause.AND.length === 0) {
                delete whereClause.AND;
            }

            const skip = (page - 1) * pageSize;

            const totalCompanies = await prismadb.company.count({
                where: whereClause,
            });

            const companies = await prismadb.company.findMany({
                where: whereClause,
                include: {
                    products: {
                        take: 3,
                    },
                },
                skip: skip,
                take: pageSize,
            });

            const isLastPage = skip + pageSize >= totalCompanies;

            return {
                companies,
                currentPage: page,
                isLastPage,
                totalCompanies,
                totalPages: Math.ceil(totalCompanies / pageSize),
            };
        }),
};
