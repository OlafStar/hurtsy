import {PriceWeb} from '~types/products';

export const getPriceRange = (prices: PriceWeb[]) => {
    const allPrices = prices.map((p) => p.price);
    const allMinQuantities = prices.map((p) => p.minQuantity);

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const lowestMinQuantity = Math.min(...allMinQuantities);

    const priceRange = `${minPrice} - ${maxPrice} zł`;

    return {lowestMinQuantity, priceRange};
};
