const product = {
    name: 'Name of product',
    description: "", //Optional
    mainImage: '', //Optional string to image
    images: ['', ''], //Optional string to images of product
    category: {
        mainCategory: 'Electronics',
        subCategory: ['computer, mouse'], //Array of optional subcategories
    },
    prices: [
        //Array of objects of price, minQuantity, maxQuantity
        {
            price: 19.99,
            minQuantity: 1,
            maxQuantity: 10,
        },
        {
            price: 15.99,
            minQuantity: 11,
            maxQuantity: 99,
        },
    ],
    deliveryPrice: 9.99, //Optional value
    customization: [
        {
            name: 'own logo',
            minQuantity: 10,
        },
        {
            name: 'own box',
            minQuantity: 20,
        },
    ],
    customProperties: [
        {
            name: 'name',
            value: 'value',
        },
        {
            name: 'name',
            value: 'value',
        },
        {
            name: 'name',
            value: 'value',
        },
    ],
    companyId: "id of company that list product",
    representativeId: "id of representative assigned for this product"
};
