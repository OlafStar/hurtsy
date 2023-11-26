import {z} from 'zod';

export const formOfferContent = z.object({
    message: z.string(),
    quantity: z.number(),
});

export const createOfferSchema = z.object({
    productId: z.string(),
    ...formOfferContent.shape,
});

export const offerFormSchema = z.object({
    ...formOfferContent.shape,
    email: z.string(),
});

export const messageForm = z.object({
    message: z.string(),
});

export const messageAction = z.object({
    message: z.string(),
    id: z.string(),
});
