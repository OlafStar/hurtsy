export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        availableProducts: 10,
        availablePromotions: 0,
        availableBumps: 2,
        support: {
            fullSupport: true,
            oneOnOneSupport: false,
            productCreationSupport: false,
        },
        price: {
            amount: 0,
            priceIds: {
                test: 'free',
                production: 'free',
            },
        },
    },
    {
        name: 'Starter',
        slug: 'starter',
        availableProducts: 50,
        availablePromotions: 1,
        availableBumps: 10,
        support: {
            fullSupport: true,
            oneOnOneSupport: false,
            productCreationSupport: false,
        },
        price: {
            amount: 49.99,
            priceIds: {
                test: 'price_1OBc39LphFr90yTIGkDEjd6C',
                production: '',
            },
        },
    },
    {
        name: 'Premium',
        slug: 'premium',
        availableProducts: 100,
        availablePromotions: 5,
        availableBumps: 25,
        support: {
            fullSupport: true,
            oneOnOneSupport: true,
            productCreationSupport: false,
        },
        price: {
            amount: 99.99,
            priceIds: {
                test: 'price_1OBc2iLphFr90yTIwhBPAnSs',
                production: '',
            },
        },
    },
    {
        name: 'Pro',
        slug: 'pro',
        availableProducts: 500,
        availablePromotions: 20,
        availableBumps: 100,
        support: {
            fullSupport: true,
            oneOnOneSupport: true,
            productCreationSupport: true,
        },
        price: {
            amount: 199.99,
            priceIds: {
                //@TO-DO change test version to production and use it as env
                test: 'price_1OAhJYLphFr90yTIvvyFv93l',
                production: '',
            },
        },
    },
];
