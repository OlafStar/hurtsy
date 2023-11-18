import Link from 'next/link';

import ProductContact from '~components/atoms/ProductContact';
import {Badge} from '~components/ui/badge';
import {AppRoutes} from '~types/AppRoutes';
import {ProductWeb} from '~types/products';
import {isPromotionActive} from '~utils/checkPromoted';
import {getPriceRange} from '~utils/getPriceRange';

const ProductCard = (props: ProductWeb) => {
    const {name, mainImage, prices, customProperties, id, company, promotedTo} =
        props;
    const {priceRange, lowestMinQuantity} = getPriceRange(prices);

    return (
        <div
            className={`grid grid-cols-1 xs:grid-cols-[max-content_1fr] gap-x-4 relative`}
        >
            <img
                src={mainImage}
                className="w-full xs:w-[161px] aspect-square object-contain"
            />
            <div className="flex flex-col gap-2">
                <Link href={`${AppRoutes.WEB_PRODUCTS}/${id}`} className="flex-1">
                    <div className="flex flex-col md:flex-row gap-3 leading-none">
                        <div className="w-full flex flex-col gap-3">
                            <div className="text-xs block sm:hidden">
                                {isPromotionActive(promotedTo) && (
                                    <Badge>{'Wyróżnione'}</Badge>
                                )}
                            </div>
                            <div className="grid grid-cols-[1fr_max-content] gap-x-2">
                                <div>{name}</div>
                                <div className="text-xs hidden sm:block">
                                    {isPromotionActive(promotedTo) && (
                                        <Badge>{'Wyróżnione'}</Badge>
                                    )}
                                </div>
                            </div>

                            <div className="flex flex-col">
                                <div className="text-xl font-bold">{priceRange}</div>
                                <div className="text-xs opacity-50">{`Min: ${lowestMinQuantity}`}</div>
                            </div>
                            <div
                                style={{
                                    gridTemplateRows: 'repeat(2, auto)',
                                    gridAutoFlow: 'column',
                                    gridAutoColumns: 'max-content',
                                    columnGap: '16px',
                                }}
                                className="flex flex-wrap md:grid"
                            >
                                {customProperties.map((item, index) => (
                                    <div
                                        key={index}
                                        className="flex text-xs gap-1 w-fit"
                                    >
                                        <div className="opacity-50">{`${item.name}:`}</div>
                                        <div>{item.value}</div>
                                    </div>
                                ))}
                            </div>
                            <div className="w-full h-[1px] bg-black opacity-10 hidden md:block" />
                        </div>
                    </div>
                </Link>
                <div className="flex items-center gap-2">
                    <Link
                        href={`${AppRoutes.WEB_COMPANIES}/${company?.id}`}
                        className="text-sm opacity-50"
                    >
                        <div>{`${company?.name}`}</div>
                    </Link>
                    <ProductContact
                        className="w-fit h-[24px] rounded-sm"
                        {...props}
                    />
                </div>
            </div>

            {/* <div className="flex  gap-4 xs:w-[140px] justify-center">
                <div className="flex flex-row xs:flex-col gap-2 items-center justify-end">
                    <img
                        src={company?.image || ''}
                        className="w-16 h-16 rounded-full object-contain"
                    />
                    <div className="text-xs opacity-50 text-center">
                        {company?.name}
                    </div>
                    <ProductContact {...props} />
                </div>
            </div> */}
        </div>
    );
};

export default ProductCard;
