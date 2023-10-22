import {z} from 'zod';

export const companyCreationSchema = z.object({
    companyName: z.string().min(2).max(50),
    city: z.string().min(2).max(50),
    phoneNumber: z.string().length(9),
    website: z.string().url('Invalid website URL format').optional(),
    address: z.string().max(255),
    postalCode: z.string().min(4).max(10),
    country: z.string().min(2).max(50),
    established: z.number().int().min(1900).max(new Date().getFullYear()),
    type: z.enum(['Producent', 'Factory', 'Importer']),
});
