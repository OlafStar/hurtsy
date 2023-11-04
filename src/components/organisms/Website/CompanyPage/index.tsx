import React from 'react';
import CategoriesButton from '~components/atoms/CategoriesButton';
import ClearFilterButton from '~components/atoms/ClearFilterButton';
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
    const {products, currentPage, isLastPage, totalProduct, totalPages} =
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
                        <div className="flex gap-16">
                            <div className="flex flex-col gap-4">
                                <ClearFilterButton
                                    paramsToDelete={'all'}
                                    buttonProps={{variant: 'link'}}
                                    className="w-fit p-0 self-end"
                                >
                                    {'Usuń filtry'}
                                </ClearFilterButton>
                                {categories.map((item) => (
                                    <CategoriesButton
                                        key={item.mainCategory}
                                        {...item}
                                    />
                                ))}
                            </div>
                            <div className="flex flex-wrap gap-6 ">
                                {products.map((item, index) => (
                                    <CompanyProductCard
                                        key={index}
                                        {...(item as ProductWeb)}
                                    />
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
