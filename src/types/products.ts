import {CompanyTypeWeb} from './company';

export type CategoryWeb = {
    mainCategory: string;
    subCategory: string[];
};

export type PriceWeb = {
    price: number;
    minQuantity: number;
    maxQuantity: number;
};

export type CustomizationWeb = {
    name: string;
    minQuantity: number;
};

export type CustomPropertiesWeb = {
    name: string;
    value: string;
};

export type ProductWeb = {
    id: string;
    name: string;
    description?: string | null;
    mainImage: string;
    images?: string[] | null;
    category: CategoryWeb | null;
    prices: PriceWeb[];
    deliveryPrice?: number | null;
    promotionDate?: string | null;
    customizations?: CustomizationWeb[] | null;
    customProperties: CustomPropertiesWeb[];
    companyId: string;
    representativeId: string;
    company?: CompanyTypeWeb;
};
