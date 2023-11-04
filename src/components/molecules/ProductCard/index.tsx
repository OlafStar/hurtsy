import Link from 'next/link';
import {AppRoutes} from '~types/AppRoutes';
import {ProductWeb} from '~types/products';
import {getPriceRange} from '~utils/getPriceRange';

const ProductCard = ({
    name,
    mainImage,
    prices,
    customProperties,
    id,
    company,
}: ProductWeb) => {
    const {priceRange, lowestMinQuantity} = getPriceRange(prices);
    return (
        <Link href={`${AppRoutes.WEB_PRODUCTS}/${id}`}>
            <div className="flex gap-3 leading-none">
                <img
                    src={mainImage}
                    className="w-[161px] aspect-square object-contain"
                />
                <div className="w-full flex flex-col gap-3">
                    <div>{name}</div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{priceRange}</div>
                        <div className="text-xs opacity-50">{`Min: ${lowestMinQuantity}`}</div>
                    </div>
                    <div
                        style={{
                            display: 'grid',
                            gridTemplateRows: 'repeat(2, auto)',
                            gridAutoFlow: 'column',
                            gridAutoColumns: 'max-content',
                            columnGap: '16px',
                        }}
                    >
                        {customProperties.map((item, index) => (
                            <div key={index} className="flex text-xs gap-1 w-fit">
                                <div className="opacity-50">{`${item.name}:`}</div>
                                <div>{item.value}</div>
                            </div>
                        ))}
                    </div>
                    <div className="w-full h-[1px] bg-black opacity-10" />
                    <div className="text-xs opacity-50">{company?.name}</div>
                </div>
            </div>
        </Link>
    );
};

export default ProductCard;
