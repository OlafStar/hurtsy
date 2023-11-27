import {z} from 'zod';

const stringField = (minLength: number, maxLength: number) =>
    z.string().min(minLength).max(maxLength);
const phoneField = z.string().length(9);

export const companyCreationSchema = z.object({
    companyName: stringField(2, 50),
    description: z.string(),
    city: stringField(2, 50),
    phoneNumber: phoneField,
    image: z.string().optional(),
    website: z.string().url('Invalid website URL format').optional(),
    address: z.string().max(255),
    postalCode: stringField(4, 10),
    country: stringField(2, 50),
    established: z.number().int().min(1900).max(new Date().getFullYear()),
    type: z.enum(['Producent', 'Factory', 'Importer']),
});

export const getCompaniesFilterSchema = z.object({
    search: z.string().optional(),
    category: z.string().optional(),
    subCategory: z.string().optional(),
    companyType: z.array(z.string()).optional(),
    pagination: z.object({page: z.number(), pageSize: z.number()}),
});
