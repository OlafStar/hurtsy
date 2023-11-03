import {Product} from '@prisma/client';
import {PriceWeb} from '~types/products';

export const filterProducts = (
    data: Product[],
    filters: {
        price: number | undefined;
        minQuantity: number | undefined;
    },
) => {
    const filteredProducts = data.filter((product) => {
        const prices = product.prices as PriceWeb[];

        return prices.some((priceInfo) => {
            if (filters.price && filters.minQuantity) {
                return (
                    priceInfo.price <= filters.price &&
                    priceInfo.minQuantity >= filters.minQuantity
                );
            }
            if (filters.price) {
                return priceInfo.price <= filters.price;
            }
            if (filters.minQuantity) {
                return priceInfo.minQuantity >= filters.minQuantity;
            }
            return true;
        });
    });

    return filters.price || filters.minQuantity ? filteredProducts : data;
};
