import Link from 'next/link';

import {Button} from '~components/ui/button';
import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes} from '~types/AppRoutes';
import {PriceWeb} from '~types/products';
import {parseNumberToCurrency} from '~utils/parseNumberToCurrency';

const MainPromotedProducts = async () => {
    const {promotedProducts} = await serverClient.getPromotedProducts({});

    if (promotedProducts.length <= 0) {
        return null;
    }

    return (
        <div className="flex flex-col gap-12 container px-4 md:px-8">
            <div className="flex justify-between items-center text-left gap-4">
                <div className="text-2xl xs:text-3xl font-bold">{'Wyróżnione produkty'}</div>
                <Link href={`${AppRoutes.WEB_PRODUCTS}?isPromoted=true`}>
                    <Button className='whitespace-nowrap'>{'Zobacz więcej'}</Button>
                </Link>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {promotedProducts.map((item, index) => {
                    const prices = item.prices as PriceWeb[];
                    return (
                        <Link
                            href={`${AppRoutes.WEB_PRODUCTS}/${item.id}`}
                            key={index}
                        >
                            <div className="flex flex-col items-center lg:flex-row gap-2 border border-black border-opacity-10 shadow-sm rounded-md p-4">
                                <img
                                    src={item.mainImage || ''}
                                    alt={`product-${item.name}`}
                                    className="w-[148px] aspect-square object-contain"
                                />
                                <div className="flex flex-col gap-8 flex-1">
                                    <div className="line-clamp-2">{item.name}</div>
                                    <div className="grid grid-cols-2 grid-rows-2 justify-items-center">
                                        {prices.map((item, index) => (
                                            <div
                                                key={index}
                                                className={`flex flex-col gap-1 ${
                                                    index === 2 && 'col-span-2'
                                                }`}
                                            >
                                                <div className="font-bold text-mainBlue text-lg">
                                                    {parseNumberToCurrency(
                                                        item.price,
                                                    )}
                                                </div>
                                                <div className="text-xs opacity-50">{`${item.minQuantity} - ${item.maxQuantity}szt.`}</div>
                                            </div>
                                        ))}
                                    </div>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
};

export default MainPromotedProducts;
