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
