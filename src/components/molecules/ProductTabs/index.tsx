'use client';

import React, {PropsWithChildren, useEffect, useState} from 'react';
import {Tabs} from '@radix-ui/react-tabs';
import ButtonLink from '~components/atoms/ButtonLink';
import {TabsList, TabsTrigger} from '~components/ui/tabs';
import {ProductRoutes} from '~types/AppRoutes';
import {usePathname, useRouter, useSearchParams} from 'next/navigation';

type ProductTabsProps = {promotedChildren: React.ReactNode} & PropsWithChildren;

enum ProductTabsVariants {
    AllProducts = 'allProducts',
    PromotedProducts = 'promotedProducts',
}

const ProductTabs = ({children, promotedChildren}: ProductTabsProps) => {
    const [isPromoted, setIsPromoted] = useState(false);
    const router = useRouter();
    const pathname = usePathname();
    const searchParams = useSearchParams();

    useEffect(() => {
        setIsPromoted(searchParams.get('isPromoted') === 'true');
    }, [searchParams]);

    return (
        <Tabs
            defaultValue={
                searchParams.get('isPromoted') === 'true'
                    ? ProductTabsVariants.PromotedProducts
                    : ProductTabsVariants.AllProducts
            }
            className="flex flex-col gap-6"
            onValueChange={(value) => {
                router.push(
                    `${pathname}?isPromoted=${
                        value === ProductTabsVariants.PromotedProducts
                    }`,
                );
                setIsPromoted(value === ProductTabsVariants.PromotedProducts);
            }}
        >
            <div className="flex flex-col gap-6">
                <div className="flex justify-between">
                    <ButtonLink href={ProductRoutes.ADD_PRODUCT} />
                    <div>{'Dostępne produkty: 2/70'}</div>
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
