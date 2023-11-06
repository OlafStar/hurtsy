import React from 'react';
import CompanyCard from '~components/molecules/CompanyCard';
import Filters from '~components/molecules/Filters';
import Pagination from '~components/molecules/Pagination';
import ProductCard from '~components/molecules/ProductCard';
import ProductsCompanySwitch from '~components/molecules/ProductsCompanySwitch';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';
import {ProductWeb} from '~types/products';

type CompaniesPageProps = {
    searchParams?: SearchParamsType;
};

const CompaniesPage = async ({searchParams}: CompaniesPageProps) => {
    const {companies, currentPage, isLastPage, totalCompanies, totalPages} =
        await serverClient.getCompanies({
            search: searchParams?.search_query as string,
            category: searchParams?.category as string,
            subCategory: searchParams?.subCategory as string,
            companyType:
                typeof searchParams?.companyType === 'string'
                    ? [searchParams?.companyType]
                    : searchParams?.companyType,
            pagination: {
                page: searchParams?.page
                    ? parseInt(searchParams?.page as string)
                    : 1,
                pageSize: searchParams?.pageSize
                    ? parseInt(searchParams?.pageSize as string)
                    : 10,
            },
        });

    return (
        <div className="flex flex-col gap-8 min-h-[100%]">
            <div className="flex pt-8">
                <Filters params={searchParams} />
                <div className="flex flex-col align-end flex-1 px-4 gap-5">
                    <ProductsCompanySwitch />
                    <div className="flex flex-col gap-6">
                        {companies.map((item, index) => (
                            <React.Fragment key={index}>
                                <CompanyCard {...(item as CompanyTypeWeb)} />
                                {companies.length - 1 > index && (
                                    <div className="w-full h-[1px] bg-black opacity-10" />
                                )}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
                {/* <PromotedProducts /> */}
            </div>
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
