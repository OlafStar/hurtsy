import React from 'react';
import Filters from '~components/molecules/Filters';
import ProductCard from '~components/molecules/ProductCard';
import ProductsCompanySwitch from '~components/molecules/ProductsCompanySwitch';
import PromotedProducts from '~components/molecules/PromotedProducts';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb, getData} from '~types/products';

type ProductsPageProps = {
    searchParams?: SearchParamsType;
};

const ProductsPage = async ({searchParams}: ProductsPageProps) => {
    const data = await serverClient.getProducts({
        search: searchParams?.search_query as string,
        category: searchParams?.category as string,
        subCategory: searchParams?.subCategory as string,
    });

    console.log(searchParams);
    return (
        <div className="flex pt-8">
            <Filters />
            <div className="flex flex-col align-end flex-1 px-4 gap-5">
                <ProductsCompanySwitch />
                <div className="flex flex-col gap-6">
                    {data.map((item, index) => (
                        <React.Fragment key={index}>
                            <ProductCard {...(item as ProductWeb)} />
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

export default ProductsPage;
