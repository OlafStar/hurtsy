import {ChevronRight} from 'lucide-react';
import React from 'react';
import ProductCompany from '~components/molecules/ProductCompany';
import ProductPageInfo from '~components/molecules/ProductPageInfo';
import {ProductWeb} from '~types/products';

const ProductPage = ({
    name,
    mainImage,
    category,
    prices,
    customProperties,
    deliveryPrice,
    customizations,
    images,
    companyId,
    representativeId,
}: ProductWeb) => {
    return (
        <div className="pt-8">
            <div className="flex flex-col gap-4">
                <div className="flex gap-1">
                    <div className="text-xs">{category?.mainCategory}</div>
                    {category?.subCategory.length && (
                        <ChevronRight className="h-[16px]" />
                    )}
                    {category?.subCategory.map((item, index) => (
                        <React.Fragment key={index}>
                            <div className="text-xs">{item}</div>
                            {!(category?.subCategory.length >= index) && (
                                <ChevronRight className="h-[16px]" />
                            )}
                        </React.Fragment>
                    ))}
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
                            companyId={companyId}
                            representativeId={representativeId}
                        />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ProductPage;
