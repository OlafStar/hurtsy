import {CompanyTypeWeb} from '~types/company';
import {ProductWeb} from '~types/products';

export const productFormDefaultValues = {
    name: '',
    description: '',
    mainImage: '',
    images: [],
    category: {
        mainCategory: undefined,
        subCategory: [],
    },
    prices: [
        {
            price: 0,
            minQuantity: 0,
            maxQuantity: 0,
        },
    ],
    deliveryPrice: undefined,
    customizations: [
        {
            name: '',
            minQuantity: 0,
        },
    ],
    customProperties: [
        {
            name: '',
            value: '',
        },
    ],
};

export const generateDefaultValues = (initialData: ProductWeb) => {
    return {
        name: initialData.name,
        description: initialData.description ?? '',
        mainImage: initialData.mainImage,
        images: initialData.images ?? [],
        category: initialData.category ?? {
            mainCategory: undefined,
            subCategory: [],
        },
        prices:
            initialData.prices.length > 0
                ? initialData.prices
                : [
                      {
                          price: 0,
                          minQuantity: 0,
                          maxQuantity: 0,
                      },
                  ],
        deliveryPrice: initialData.deliveryPrice ?? undefined,
        customizations: initialData.customizations ?? [
            {
                name: '',
                minQuantity: 0,
            },
        ],
        customProperties:
            initialData.customProperties.length > 0
                ? initialData.customProperties
                : [
                      {
                          name: '',
                          value: '',
                      },
                  ],
        id: initialData.id,
        companyId: initialData.companyId,
    };
};

export const companyDefaults = {
    companyName: undefined,
    city: undefined,
    phoneNumber: undefined,
    address: undefined,
    postalCode: undefined,
    established: 2023,
    website: undefined,
};

export const generateCompanyDefaults = (initialData: CompanyTypeWeb) => {
    return {
        companyName: initialData.name,
        image: initialData.image || undefined,
        address: initialData.street,
        type: initialData.type,
        city: initialData.city,
        phoneNumber: initialData.phone,
        postalCode: initialData.postCode,
        country: initialData.country,
        established: initialData.establishment,
        website: initialData.website || undefined,
    };
};
