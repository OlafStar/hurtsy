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
    image?: string | null;
    website?: string | null;
    phone: string;
    country: string;
    establishment: number;
};

export type RepresentativeWeb = {
    companyId: string;
    id: string;
    name: string;
    email: string;
    phone: string;
};
