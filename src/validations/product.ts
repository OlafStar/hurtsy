import {z} from 'zod';

import {Category} from '~types/categories';

const subCategorySchema = z.array(z.string()).nonempty();

const categorySchema = z.object({
    mainCategory: z.nativeEnum(Category),
    subCategory: subCategorySchema,
});

const priceSchema = z.object({
    price: z.number(),
    minQuantity: z.number(),
    maxQuantity: z.number(),
});

const pricesSchema = z
    .array(priceSchema)
    .nonempty()
    .superRefine((prices, ctx) => {
        let lastIndexMax = 0;
        if (prices.length > 3) {
            ctx.addIssue({
                code: z.ZodIssueCode.too_big,
                maximum: 4,
                inclusive: true,
                type: 'number',
                message: 'Maksymalnie można dodać trzy warianty ceny',
            });
        }
        for (let i = 0; i < prices.length; i++) {
            console.log(prices[i].minQuantity, lastIndexMax);

            if (
                prices[i].minQuantity <= lastIndexMax &&
                prices[i].minQuantity !== 0
            ) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_small,
                    minimum: lastIndexMax,
                    inclusive: true,
                    type: 'number',
                    message:
                        'Minimalna wielkość nie może być mniejsza niż poprzednia maksymalna wielkość',
                });
            }
            if (prices[i].maxQuantity < prices[i].minQuantity) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_small,
                    minimum: prices[i].minQuantity,
                    inclusive: true,
                    type: 'number',
                    message:
                        'Maksymalna wielkość nie może być mniejsza niż minimalna',
                });
            }
            if (prices[i].minQuantity === 0 || prices[i].maxQuantity === 0) {
                ctx.addIssue({
                    code: z.ZodIssueCode.too_small,
                    minimum: 1,
                    inclusive: true,
                    type: 'number',
                    message: 'Podane parametry nie mogą być zerem',
                });
            }
            lastIndexMax = prices[i].maxQuantity;
        }
        return true;
    });

const customizationSchema = z
    .object({
        name: z.string(),
        minQuantity: z.number(),
    })
    .optional();

const customPropertiesSchema = z.object({
    name: z.string(),
    value: z.string(),
});

const baseProductSchema = {
    name: z.string(),
    description: z.string().optional(),
    mainImage: z.string(),
    images: z.array(z.string()).optional(),
    category: categorySchema,
    prices: pricesSchema,
    deliveryPrice: z.number().optional().nullable(),
    customizations: z.array(customizationSchema),
    customProperties: z.array(customPropertiesSchema),
};

export const productFormSchema = z.object({
    ...baseProductSchema,
    name: z.string().min(1),
});

export const editProductFormSchema = z.object({
    ...baseProductSchema,
    name: z.string().min(1),
    id: z.string(),
});

export const getProductFilterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    deliveryPrice: z.number().optional(),
    price: z.number().optional(),
    companyType: z.array(z.string()).optional(),
    companyId: z.string().optional(),
    pagination: z.object({page: z.number(), pageSize: z.number()}),
    isPromoted: z.string().optional(),
    minQuantity: z.number().optional(),
});

export const getPromotedProductFilterSchema = z.object({
    category: z.string().optional(),
    subCategory: z.string().optional(),
});
