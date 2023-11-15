'use client';

import {usePathname} from 'next/navigation';

import {Tabs, TabsList, TabsTrigger} from '~components/ui/tabs';
import {SearchParams} from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const ProductsCompanySwitch = () => {
    const path = usePathname();
    const {deleteParam} = useAddSearchParams();
    return (
        <Tabs
            defaultValue={path.slice(1) === 'products' ? 'products' : 'companies'}
            onValueChange={(e) => {
                deleteParam(
                    [SearchParams.PagePagination, SearchParams.PageSize],
                    `/${e}`,
                );
            }}
            className="w-[228px] rounded-full overflow-hidden self-end h-[30px] md:h-auto"
        >
            <TabsList className="grid w-full grid-cols-2 h-full md:h-auto">
                <TabsTrigger
                    className="rounded-full h-full md:h-auto"
                    value={'products'}
                >
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
