import {ProductWeb} from '~types/products';
import ProductImageGallery from '../ProductImageGallery';
import { parseNumberToCurrency } from '~utils/parseNumberToCurrency';

type ProductPageInfoProp = Omit<
    ProductWeb,
    'description' | 'category' | 'id' | 'companyId' | 'representativeId'
>;

const ProductPageInfo = ({
    name,
    mainImage,
    prices,
    customProperties,
    deliveryPrice,
    customizations,
    images
}: ProductPageInfoProp) => {
    return (
        <div className="flex gap-8">
            <ProductImageGallery images={[mainImage, ...(images || [])]} />

            <div className="w-full flex flex-col gap-4">
                <div className="text-xl">{name}</div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="py-2 flex gap-6">
                    {prices.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div className="font-bold text-mainBlue">
                                {parseNumberToCurrency(item.price)}
                            </div>
                            <div className="text-xs opacity-50">{`${item.minQuantity} - ${item.maxQuantity}szt.`}</div>
                        </div>
                    ))}
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="grid grid-cols-[15%_90%] grid-rows-[max-content_1fr] text-xs gap-y-3">
                    <div className="opacity-50">{`Koszt wysyłki:`}</div>
                    <div>{`${deliveryPrice}`}</div>
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
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div
                    style={{
                        display: 'grid',
                        gridTemplateRows: 'repeat(2, auto)',
                        gridAutoFlow: 'column',
                        gridAutoColumns: 'max-content',
                        columnGap: '16px',
                        rowGap: '8px',
                    }}
                >
                    {customProperties.map((item, index) => (
                        <div key={index} className="flex gap-1 text-xs">
                            <div className="opacity-50">{`${item.name}:`}</div>
                            <div>{item.value}</div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ProductPageInfo;
