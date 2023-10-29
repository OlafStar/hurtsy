import {z} from 'zod';

export const productCreationSchema = z.object({
    name: z.string(),
    description: z.string().optional(),
    mainImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.object({
        mainCategory: z.string(),
        subCategory: z.array(z.string()),
    }),
    prices: z.array(
        z.object({
            price: z.number(),
            minQuantity: z.number(),
            maxQuantity: z.number(),
        }),
    ),
    deliveryPrice: z.number().optional(),
    customizations: z
        .array(
            z.object({
                name: z.string(),
                minQuantity: z.number(),
            }),
        )
        .optional(),
    customProperties: z.array(
        z.object({
            name: z.string(),
            value: z.string(),
        }),
    ),
    companyId: z.string(),
    representativeId: z.string(),
});

export const productFormSchema = z.object({
    name: z.string().min(1),
    description: z.string().optional(),
    mainImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: z.object({
        mainCategory: z.string(),
        subCategory: z.array(z.string()),
    }),
    prices: z.array(
        z.object({
            price: z.number(),
            minQuantity: z.number(),
            maxQuantity: z.number(),
        }),
    ),
    deliveryPrice: z.number().optional(),
    customizations: z
        .array(
            z.object({
                name: z.string(),
                minQuantity: z.number(),
            }),
        )
        .optional(),
    customProperties: z.array(
        z.object({
            name: z.string(),
            value: z.string(),
        }),
    ),
});
