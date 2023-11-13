'use client';

import {FC} from 'react';

import {ProductWeb} from '~types/products';
import useUserCompanyProducts from '~hooks/useUserCompanyProducts';
import {serverClient} from '~server/trpc/serverClient';

import {DataTable} from './data-table';
import {columns} from './sample-data';

export type ProductsDataTableProps = {
    isPromoted?: boolean;
    initialProducts: Awaited<
        ReturnType<(typeof serverClient)['getUserCompanyProducts']>
    >;
    initialCounter: Awaited<
        ReturnType<(typeof serverClient)['getUserProductsCount']>
    >;
};

const ProductsDataTable: FC<ProductsDataTableProps> = ({
    isPromoted,
    initialProducts,
    initialCounter,
}) => {
    const {products} = useUserCompanyProducts(
        initialProducts,
        initialCounter,
        isPromoted,
    );

    return (
        <div>
            {products && (
                <DataTable columns={columns} data={products as ProductWeb[]} />
            )}
        </div>
    );
};

export default ProductsDataTable;
