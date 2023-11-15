import Link from 'next/link';

import ProductContact from '~components/atoms/ProductContact';
import {AppRoutes} from '~types/AppRoutes';
import {ProductWeb} from '~types/products';

const CompanyProductCard = (props: ProductWeb) => {
    const {mainImage, name, prices, id} = props;
    const allPrices = prices.map((p) => p.price);
    const allMinQuantities = prices.map((p) => p.minQuantity);

    const minPrice = Math.min(...allPrices);
    const maxPrice = Math.max(...allPrices);
    const lowestMinQuantity = Math.min(...allMinQuantities);

    const priceRange = `${minPrice} - ${maxPrice} zł`;

    return (
        <div className="flex flex-col gap-3">
            <Link href={`${AppRoutes.WEB_PRODUCTS}/${id}`}>
                <div className="flex flex-col gap-3">
                    <img
                        src={mainImage || ''}
                        alt={name}
                        className="sm:w-[142px] object-contain aspect-square"
                    />
                    <div className="flex gap-1 flex-col">
                        <div className="overflow-hidden line-clamp-2">{name}</div>
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
            <ProductContact {...props} />
        </div>
    );
};

export default CompanyProductCard;
