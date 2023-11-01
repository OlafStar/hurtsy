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
    customizations?: CustomizationWeb[] | null;
    customProperties: CustomPropertiesWeb[];
    companyId: string;
    representativeId: string;
};

const mockProduct1: ProductWeb = {
    id: 'disamodoasmoda',
    name: 'Laptop',
    description: 'High-end gaming laptop.',
    mainImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png',
    images: ['image1.jpg', 'image2.jpg'],
    category: {
        mainCategory: 'Electronics',
        subCategory: ['Computers', 'Laptops'],
    },
    prices: [
        {
            price: 1200,
            minQuantity: 1,
            maxQuantity: 10,
        },
        {
            price: 1100,
            minQuantity: 11,
            maxQuantity: 50,
        },
    ],
    deliveryPrice: 50,
    customizations: [
        {
            name: 'RAM',
            minQuantity: 8,
        },
        {
            name: 'Storage',
            minQuantity: 256,
        },
    ],
    customProperties: [
        {
            name: 'Brand',
            value: 'TechBrand',
        },
        {
            name: 'Warranty',
            value: '2 years',
        },
    ],
    companyId: '123',
    representativeId: '456',
};

const mockProduct2: ProductWeb = {
    id: 'dsafsafaoksadasfecaca',
    name: 'Office Chair',
    description: 'Ergonomic office chair.',
    mainImage:
        'https://upload.wikimedia.org/wikipedia/commons/thumb/3/3f/Placeholder_view_vector.svg/310px-Placeholder_view_vector.svg.png',
    images: ['chair1.jpg', 'chair2.jpg'],
    category: {
        mainCategory: 'Furniture',
        subCategory: ['Office', 'Chairs'],
    },
    prices: [
        {
            price: 200,
            minQuantity: 1,
            maxQuantity: 5,
        },
        {
            price: 180,
            minQuantity: 6,
            maxQuantity: 20,
        },
    ],
    deliveryPrice: 30,
    customProperties: [
        {
            name: 'Material',
            value: 'Leather',
        },
        {
            name: 'Color',
            value: 'Black',
        },
    ],
    companyId: '789',
    representativeId: '012',
};

export const sampleProducts = [
    mockProduct1,
    mockProduct2,
    mockProduct1,
    mockProduct2,
    mockProduct1,
    mockProduct2,
    mockProduct1,
    mockProduct2,
    mockProduct1,
    mockProduct2,
];

export async function getData(): Promise<ProductWeb[]> {
    return sampleProducts;
}
