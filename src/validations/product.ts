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
    representativeId: z.string().optional(),
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
});
