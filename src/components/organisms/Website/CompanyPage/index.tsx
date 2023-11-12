import React, {Suspense} from 'react';

import CategoriesButton from '~components/atoms/CategoriesButton';
import Loader from '~components/atoms/Loader';
import CompanyPageHeader from '~components/molecules/CompanyPageHeader';
import CompanyProductCard from '~components/molecules/CompanyProductCard';
import Pagination from '~components/molecules/Pagination';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';
import {ProductWeb} from '~types/products';

const CompanyPage: React.FC<
    CompanyTypeWeb & {searchParams?: SearchParamsType}
> = async (props) => {
    const {products, currentPage, totalProduct, totalPages} =
        await serverClient.getProducts({
            companyId: props.id,
            category: props.searchParams?.category as string | undefined,
            pagination: {
                page: props.searchParams?.page
                    ? parseInt(props.searchParams?.page as string)
                    : 1,
                pageSize: 10,
            },
        });

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
                        <div className="flex justify-between">
                            <div className="font-bold text-2xl">
                                {'Sprawdź produkty'}
                            </div>
                            <div>
                                <Pagination
                                    {...{
                                        currentPage,
                                        totalPages,
                                        total: totalProduct,
                                        pageSize: '10',
                                    }}
                                    hidePageSize
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-[max-content_1fr] gap-x-8">
                            <div className="flex flex-col gap-4 min-w-[184px]">
                                {categories.map((item) => (
                                    <CategoriesButton
                                        key={item.mainCategory}
                                        {...item}
                                    />
                                ))}
                            </div>
                            <Suspense fallback={<Loader />}>
                                <div className="flex flex-wrap gap-6 justify-around">
                                    {products.map((item, index) => (
                                        <CompanyProductCard
                                            key={index}
                                            {...(item as ProductWeb)}
                                        />
                                    ))}
                                </div>
                            </Suspense>
                        </div>
                    </div>
                </div>
                <div></div>
            </div>
        </div>
    );
};

export default CompanyPage;
