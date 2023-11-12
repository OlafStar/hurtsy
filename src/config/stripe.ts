export const PLANS = [
    {
        name: 'Free',
        slug: 'free',
        availableProducts: 10,
        availablePromotions: 0,
        availableBumps: 2,
        availableRepresentatives: 1,
        support: {
            fullSupport: true,
            oneOnOneSupport: false,
            productCreationSupport: false,
        },
        price: {
            amount: 0,
            priceIds: {
                test: '',
                production: '',
            },
        },
    },
    {
        name: 'Starter',
        slug: 'starter',
        availableProducts: 50,
        availablePromotions: 1,
        availableBumps: 10,
        availableRepresentatives: 2,
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
        availableRepresentatives: 4,
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
        availableRepresentatives: 10,
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