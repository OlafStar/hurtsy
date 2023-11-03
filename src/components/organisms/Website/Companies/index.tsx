import React from 'react';
import CompanyCard from '~components/molecules/CompanyCard';
import Filters from '~components/molecules/Filters';
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
    const data = await serverClient.getCompanies({
        search: searchParams?.search_query as string,
        category: searchParams?.category as string,
        subCategory: searchParams?.subCategory as string,
        companyType:
            typeof searchParams?.companyType === 'string'
                ? [searchParams?.companyType]
                : searchParams?.companyType,
    });

    console.log(data);

    return (
        <div className="flex pt-8">
            <Filters params={searchParams} />
            <div className="flex flex-col align-end flex-1 px-4 gap-5">
                <ProductsCompanySwitch />
                <div className="flex flex-col gap-6">
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <CompanyCard {...(item as CompanyTypeWeb)} />
                            {data.length - 1 > index && (
                                <div className="w-full h-[1px] bg-black opacity-10" />
                            )}
                        </React.Fragment>
                    ))}
                </div>
            </div>
            {/* <PromotedProducts /> */}
        </div>
    );
};

export default CompaniesPage;
