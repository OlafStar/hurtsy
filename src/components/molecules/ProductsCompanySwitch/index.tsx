'use client';

import {usePathname, useRouter, useSearchParams} from 'next/navigation';

import {Tabs, TabsList, TabsTrigger} from '~components/ui/tabs';

const ProductsCompanySwitch = () => {
    const path = usePathname();
    const searchParams = useSearchParams();
    const router = useRouter();
    return (
        <Tabs
            defaultValue={path.slice(1) === 'products' ? 'products' : 'companies'}
            onValueChange={(e) => {
                router.push(`/${e}?${new URLSearchParams(searchParams)}`);
            }}
            className="w-[228px] rounded-full overflow-hidden self-end"
        >
            <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger className="rounded-full" value={'products'}>
                    {'Produkty'}
                </TabsTrigger>
                <TabsTrigger className="rounded-full" value={'companies'}>
                    {'Hurtownie'}
                </TabsTrigger>
            </TabsList>
        </Tabs>
    );
};

export default ProductsCompanySwitch;
