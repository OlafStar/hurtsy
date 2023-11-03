import React from 'react';
import CategoriesButton from '~components/atoms/CategoriesButton';
import CompanyPageHeader from '~components/molecules/CompanyPageHeader';
import CompanyProductCard from '~components/molecules/CompanyProductCard';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';
import {ProductWeb} from '~types/products';

const CompanyPage: React.FC<
    CompanyTypeWeb & {searchParams: SearchParamsType}
> = async (props) => {
    const product = (await serverClient.getProducts({
        companyId: props.id,
        category: props.searchParams.category as string,
    })) as ProductWeb[];
    const categories = await serverClient.getCompanyCategories(props.id);

    return (
        <div className="pt-9 flex flex-col gap-8">
            <CompanyPageHeader {...props} />
            <div>
                <div className="flex flex-col gap-8">
                    {/* <div>
                    Opis
                  </div> */}
                    <div className="flex flex-col gap-8">
                        <div className="font-bold text-2xl">
                            {'Sprawdź produkty'}
                        </div>
                        <div className="flex gap-16">
                            <div className="flex flex-col gap-4">
                                {categories.map((item) => (
                                    <CategoriesButton
                                        key={item.mainCategory}
                                        {...item}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-6 ">
                                {product.map((item, index) => (
                                    <CompanyProductCard key={index} {...item} />
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default CompanyPage;
