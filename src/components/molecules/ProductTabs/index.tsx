'use client';

import React, {PropsWithChildren, useState} from 'react';
import {Tabs} from '@radix-ui/react-tabs';
import {useSearchParams} from 'next/navigation';

import ButtonLink from '~components/atoms/ButtonLink';
import {TabsList, TabsTrigger} from '~components/ui/tabs';
import {ProductRoutes} from '~types/AppRoutes';
import useUserCompanyProducts from '~hooks/useUserCompanyProducts';

type ProductTabsProps = {promotedChildren: React.ReactNode} & PropsWithChildren;

enum ProductTabsVariants {
    AllProducts = 'allProducts',
    PromotedProducts = 'promotedProducts',
}

const ProductTabs = ({children, promotedChildren}: ProductTabsProps) => {
    const [isPromoted, setIsPromoted] = useState(false);
    const searchParams = useSearchParams();
    const {counter} = useUserCompanyProducts();

    return (
        <Tabs
            defaultValue={
                searchParams.get('isPromoted') === 'true'
                    ? ProductTabsVariants.PromotedProducts
                    : ProductTabsVariants.AllProducts
            }
            className="flex flex-col gap-6"
            onValueChange={(value) => {
                setIsPromoted(value === ProductTabsVariants.PromotedProducts);
            }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                    <ButtonLink href={ProductRoutes.ADD_PRODUCT} />
                    {counter && (
                        <div>{`Dostępne produkty: ${counter?.current}/${counter?.max}`}</div>
                    )}
                </div>
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={ProductTabsVariants.AllProducts}>
                        {'Wszystkie produkty'}
                    </TabsTrigger>
                    <TabsTrigger value={ProductTabsVariants.PromotedProducts}>
                        {'Promowane'}
                    </TabsTrigger>
                </TabsList>
            </div>
            {isPromoted ? promotedChildren : children}
        </Tabs>
    );
};

export default ProductTabs;
