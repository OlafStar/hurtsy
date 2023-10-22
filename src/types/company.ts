import {CompanyType} from '@prisma/client';

export type CompanyTypeWeb = {
    id: string;
    userId: string;
    name: string;
    type: CompanyType;
    mainProducts?: any;
    city: string;
    street: string;
    postCode: string;
    website?: string | null;
    phone: string;
    country: string;
    establishment: number;
};
