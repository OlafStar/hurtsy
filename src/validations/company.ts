import {z} from 'zod';

const stringField = (minLength: number, maxLength: number) =>
    z.string().min(minLength).max(maxLength);
const phoneField = z.string().length(9);

export const companyCreationSchema = z.object({
    companyName: stringField(2, 50),
    city: stringField(2, 50),
    phoneNumber: phoneField,
    website: z.string().url('Invalid website URL format').optional(),
    address: z.string().max(255),
    postalCode: stringField(4, 10),
    country: stringField(2, 50),
    established: z.number().int().min(1900).max(new Date().getFullYear()),
    type: z.enum(['Producent', 'Factory', 'Importer']),
});

export const representativeFormSchema = z.object({
    name: stringField(2, 50),
    email: stringField(2, 50),
    phoneNumber: phoneField,
});

export const getCompanyRepresentativesInput = z.object({
    companyId: z.string(),
});

export const representativeEditSchema = z.object({
    id: z.string(),
    ...representativeFormSchema.shape,
});
