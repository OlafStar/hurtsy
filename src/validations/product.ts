import {z} from 'zod';

export const productCreationSchema = z.object({
    name: z.string(), //done
    description: z.string().optional(), //done
    mainImage: z.string().optional(), //done
    images: z.array(z.string()).optional(),
    category: z.object({
        mainCategory: z.string(), //done
        subCategory: z.array(z.string()), //done
    }),
    prices: z.array(
        z.object({
            price: z.number(), //done
            minQuantity: z.number(), //done
            maxQuantity: z.number(), //done
        }),
    ),
    deliveryPrice: z.number().optional(), //done
    customizations: z.array(
        z.object({
            name: z.string(), //done
            minQuantity: z.number(), //done
        }),
    ).optional(),
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
  name: z.string(), //done
  description: z.string().optional(), //done
  mainImage: z.string().optional(), //done
  images: z.array(z.string()).optional(),
  category: z.object({
      mainCategory: z.string(), //done
      subCategory: z.array(z.string()), //done
  }),
  prices: z.array(
      z.object({
          price: z.number(), //done
          minQuantity: z.number(), //done
          maxQuantity: z.number(), //done
      }),
  ),
  deliveryPrice: z.number().optional(), //done
  customizations: z.array(
      z.object({
          name: z.string(), //done
          minQuantity: z.number(), //done
      }),
  ).optional(),
  customProperties: z.array(
      z.object({
          name: z.string(),
          value: z.string(),
      }),
  ),})