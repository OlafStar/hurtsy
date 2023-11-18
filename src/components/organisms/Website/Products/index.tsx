import {XIcon} from 'lucide-react';
import React from 'react';

import ClearFilterButton from '~components/atoms/ClearFilterButton';
import FiltersSheet from '~components/atoms/FiltersSheet';
import Filters from '~components/molecules/Filters';
import Pagination from '~components/molecules/Pagination';
import ProductCard from '~components/molecules/ProductCard';
import ProductsCompanySwitch from '~components/molecules/ProductsCompanySwitch';
import PromotedProducts from '~components/molecules/PromotedProducts';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';
import {filterProducts} from '~utils/filterProduct';

type ProductsPageProps = {
    searchParams?: SearchParamsType;
};

const ProductsPage = async ({searchParams}: ProductsPageProps) => {
    const {products, currentPage, totalPages} = await serverClient.getProducts({
        search: searchParams?.search_query as string,
        category: searchParams?.category as string,
        subCategory: searchParams?.subCategory as string,
        deliveryPrice: searchParams?.deliveryPrice
            ? parseFloat(searchParams?.deliveryPrice as string)
            : undefined,
        companyType:
            typeof searchParams?.companyType === 'string'
                ? [searchParams?.companyType]
                : searchParams?.companyType,
        companyId: searchParams?.companyId as string,
        isPromoted: searchParams?.isPromoted as string,
        pagination: {
            page: searchParams?.page ? parseInt(searchParams?.page as string) : 1,
            pageSize: searchParams?.pageSize
                ? parseInt(searchParams?.pageSize as string)
                : 10,
        },
    });

    const filters = {
        price: searchParams?.price
            ? parseFloat(searchParams?.price as string)
            : undefined,
        minQuantity: searchParams?.price
            ? parseInt(searchParams?.minQuantity as string)
            : undefined,
    };
    return (
        <div className="flex flex-col gap-8 min-h-[100%]">
            <div className="flex pt-0 lg:pt-4">
                <Filters params={searchParams} className="hidden lg:flex" />
                <div className="flex flex-col flex-1 lg:px-4 gap-2 sm:gap-5">
                    <div className="flex justify-between lg:justify-end">
                        <div className="lg:hidden flex items-center gap-4">
                            <FiltersSheet searchParams={searchParams}>
                                <div className="text-sm font-medium">{'Filtry'}</div>
                            </FiltersSheet>
                            <ClearFilterButton paramsToDelete={'all'}>
                                <XIcon className="h-4 w-4" />
                            </ClearFilterButton>
                        </div>
                        <ProductsCompanySwitch />
                    </div>
                    <div className="flex flex-col gap-6">
                        {filterProducts(products, filters).map((item, index) => (
                            <React.Fragment key={index}>
                                <ProductCard {...(item as ProductWeb)} />
                                {products.length - 1 > index && (
                                    <div className="w-full h-[1px] bg-black opacity-10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                <PromotedProducts
                    searchParams={searchParams}
                    className="hidden xl:flex"
                />
            </div>
            <PromotedProducts
                searchParams={searchParams}
                className="static xl:hidden"
            />
            {totalPages > 1 && (
                <Pagination
                    {...{
                        currentPage,
                        totalPages,
                        pageSize: searchParams?.pageSize
                            ? (searchParams?.pageSize as string)
                            : '10',
                    }}
                />
            )}
        </div>
    );
};

export default ProductsPage;
