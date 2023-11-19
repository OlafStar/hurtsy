import {CompanyType} from '@prisma/client';

import {ProductWeb} from './products';

export type CompanyTypeWeb = {
    id: string;
    userId: string;
    name: string;
    description?: string;
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
    products?: ProductWeb[];
};

export type RepresentativeWeb = {
    companyId: string;
    id: string;
    name: string;
    email: string;
    phone: string;
    image: string | undefined | null;
};
