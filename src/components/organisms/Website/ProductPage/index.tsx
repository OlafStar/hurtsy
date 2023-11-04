import {ChevronRight, LineChart} from 'lucide-react';
import React from 'react';
import ProductCompany from '~components/molecules/ProductCompany';
import ProductPageInfo from '~components/molecules/ProductPageInfo';
import {CompanyTypeWeb} from '~types/company';
import {ProductWeb} from '~types/products';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

const ProductPage = ({
    name,
    mainImage,
    category,
    prices,
    customProperties,
    deliveryPrice,
    customizations,
    images,
    representativeId,
    company,
    description,
}: ProductWeb) => {
    return (
        <div className="pt-8">
            <div className="flex flex-col gap-8 ">
                <div className="flex gap-1 ">
                    <div className="text-xs">
                        {translateEnumValueToPolish(
                            category?.mainCategory as string,
                        )}
                    </div>
                    {category?.subCategory.length && (
                        <ChevronRight className="h-[16px]" />
                    )}
                    <div className="flex gap-4">
                        {category?.subCategory.map((item, index) => (
                            <React.Fragment key={index}>
                                <div className="text-xs">
                                    {translateEnumValueToPolish(item)}
                                </div>
                                {!(category?.subCategory.length <= index + 1) && (
                                    <div className="w-[1px] h-[16px] bg-black" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <div className="flex gap-8">
                    <div className="flex-1">
                        <ProductPageInfo
                            {...{
                                name,
                                mainImage,
                                prices,
                                customProperties,
                                deliveryPrice,
                                customizations,
                                images,
                            }}
                        />
                    </div>
                    <div className="flex-1 max-w-[270px]">
                        <ProductCompany
                            company={company as CompanyTypeWeb}
                            representativeId={representativeId}
                        />
                    </div>
                </div>
                {description && (
                    <div className="flex flex-col gap-6">
                        <div className="font-bold text-2xl">{'Opis'}</div>
                        <div
                            className="max-w-[887px]"
                            dangerouslySetInnerHTML={{
                                __html: description ? description : '',
                            }}
                        />
                    </div>
                )}
            </div>
        </div>
    );
};

export default ProductPage;
