import {z} from 'zod';

const categorySchema = z.object({
    mainCategory: z.string(),
    subCategory: z.array(z.string()),
});

const priceSchema = z.object({
    price: z.number(),
    minQuantity: z.number(),
    maxQuantity: z.number(),
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
    mainImage: z.string().optional(),
    images: z.array(z.string()).optional(),
    category: categorySchema,
    prices: z.array(priceSchema),
    deliveryPrice: z.number().optional(),
    customizations: z.array(customizationSchema),
    customProperties: z.array(customPropertiesSchema),
};

export const productCreationSchema = z.object({
    ...baseProductSchema,
    companyId: z.string(),
    representativeId: z.string(),
});

export const productFormSchema = z.object({
    ...baseProductSchema,
    name: z.string().min(1),
});
