import {ProductWeb} from '~types/products';
import {parseNumberToCurrency} from '~utils/parseNumberToCurrency';
import ProductContact from '~components/atoms/ProductContact';

import ProductImageGallery from '../ProductImageGallery';

type ProductPageInfoProp = ProductWeb;

const ProductPageInfo = (props: ProductPageInfoProp) => {
    const {name, mainImage, prices, images, deliveryPrice, customizations} = props;
    return (
        <div className="flex gap-8 flex-col items-center md:flex-row">
            <ProductImageGallery images={[mainImage, ...(images || [])]} />

            <div className="w-full flex flex-col gap-4">
                <div className="text-xl font-bold">{name}</div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="py-2 flex gap-6">
                    {prices.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="font-bold text-mainBlue text-xl">
                                {parseNumberToCurrency(item.price)}
                            </div>
                            <div className="text-xs opacity-50">{`${item.minQuantity} - ${item.maxQuantity}szt.`}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="grid grid-cols-[max-content_1fr] grid-rows-[max-content_1fr] text-xs gap-x-4 gap-y-3">
                    <div className="opacity-50">{`Koszt wysyłki:`}</div>
                    <div>{deliveryPrice ? `${parseNumberToCurrency(deliveryPrice)}` : 'Do negocjacji'}</div>
                    <div className="opacity-50">{'Personalizacja'}</div>
                    <div className="flex flex-col gap-2">
                        {customizations?.map((item, index) => (
                            <div key={index} className="flex gap-1">
                                <div>{`${item.name}:`}</div>
                                <div className="opacity-50">{`(min. ${item.minQuantity} szt)`}</div>
                            </div>
                        ))}
                    </div>
                </div>
                <div className="flex gap-2 items-center">
                    <div className="text-sm">
                        {'Skontaktuj się i zapytaj o ofertę'}
                    </div>
                    <ProductContact {...props} />
                </div>
            </div>
        </div>
    );
};

export default ProductPageInfo;
