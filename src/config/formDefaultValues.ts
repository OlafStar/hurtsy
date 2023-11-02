import {ProductWeb} from '~types/products';

export const productFormDefaultValues = {
    name: '',
    description: '',
    mainImage: '',
    images: [],
    category: {
        mainCategory: '',
        subCategory: [],
    },
    prices: [
        {
            price: 0,
            minQuantity: 0,
            maxQuantity: 0,
        },
    ],
    deliveryPrice: 0,
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
            mainCategory: '',
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
        deliveryPrice: initialData.deliveryPrice ?? 0,
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
        representativeId: initialData.representativeId,
    };
};
