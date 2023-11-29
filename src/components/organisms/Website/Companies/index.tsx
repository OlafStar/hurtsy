import {XIcon} from 'lucide-react';
import React from 'react';

import ClearFilterButton from '~components/atoms/ClearFilterButton';
import FiltersSheet from '~components/atoms/FiltersSheet';
import CompanyCard from '~components/molecules/CompanyCard';
import EmptyState from '~components/molecules/EmptyState';
import Filters from '~components/molecules/Filters';
import Pagination from '~components/molecules/Pagination';
import ProductsCompanySwitch from '~components/molecules/ProductsCompanySwitch';
import PromotedProducts from '~components/molecules/PromotedProducts';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';

type CompaniesPageProps = {
    searchParams?: SearchParamsType;
};

const CompaniesPage = async ({searchParams}: CompaniesPageProps) => {
    const {companies, currentPage, totalPages} = await serverClient.getCompanies({
        search: searchParams?.search_query as string,
        category: searchParams?.category as string,
        subCategory: searchParams?.subCategory as string,
        companyType:
            typeof searchParams?.companyType === 'string'
                ? [searchParams?.companyType]
                : searchParams?.companyType,
        pagination: {
            page: searchParams?.page ? parseInt(searchParams?.page as string) : 1,
            pageSize: searchParams?.pageSize
                ? parseInt(searchParams?.pageSize as string)
                : 10,
        },
    });

    return (
        <div className="flex flex-col gap-8 min-h-[100vh]">
            <div className="flex pt-0 lg:pt-4 container px-4 md:px-8">
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
                    <div className="flex flex-col gap-6 min-h-full">
                        {companies.length > 0 ? (
                            companies.map((item, index) => (
                                <React.Fragment key={index}>
                                    <CompanyCard {...(item as CompanyTypeWeb)} />
                                    {companies.length - 1 > index && (
                                        <div className="w-full h-[1px] bg-black opacity-10" />
                                    )}
                                </React.Fragment>
                            ))
                        ) : (
                            <EmptyState
                                title="Nie możemy znaleźć firm z takimi parametrami"
                                description="Spróbuj ponownie"
                            >
                                <ClearFilterButton
                                    paramsToDelete={'all'}
                                    buttonProps={{variant: 'destructive'}}
                                >
                                    {'Wyczyść filtry'}
                                </ClearFilterButton>
                            </EmptyState>
                        )}
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

export default CompaniesPage;
