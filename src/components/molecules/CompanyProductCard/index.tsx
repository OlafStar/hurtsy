import Link from 'next/link';
import {AppRoutes} from '~types/AppRoutes';
import {ProductWeb} from '~types/products';

const CompanyProductCard = ({mainImage, name, prices, id}: ProductWeb) => {
    const allPrices = prices.map((p) => p.price);
    const allMinQuantities = prices.map((p) => p.minQuantity);

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const lowestMinQuantity = Math.min(...allMinQuantities);

    const priceRange = `${minPrice} - ${maxPrice} zł`;

    return (
        <Link href={`${AppRoutes.WEB_PRODUCTS}/${id}`}>
            <div className="flex flex-col w-[142px] gap-3">
                <img
                    src={mainImage || ''}
                    alt={name}
                    className="w-[142px] object-contain aspect-square"
                />
                <div className="flex gap-1 flex-col">
                    <div className="overflow-hidden whitespace-nowrap text-ellipsis">
                        {name}
                    </div>
                    <div className="flex gap-1 text-sm">
                        <div className="opacity-50">{'Min zamówienie:'}</div>
                        <div>{lowestMinQuantity}</div>
                    </div>
                    <div className="flex flex-col text-sm">
                        <div className="opacity-50">{'Cena:'}</div>
                        <div className="font-bold">{priceRange}</div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CompanyProductCard;
