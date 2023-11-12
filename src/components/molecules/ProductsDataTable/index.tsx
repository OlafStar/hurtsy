'use client';

import {columns} from './sample-data';
import {DataTable} from './data-table';
import {FC} from 'react';
import {ProductWeb} from '~types/products';
import useUserCompanyProducts from '~hooks/useUserCompanyProducts';
import {serverClient} from '~server/trpc/serverClient';

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
    initialCounter
}) => {
    const {products} = useUserCompanyProducts(initialProducts, initialCounter);


    return (
        <div>
            <div>{isPromoted && 'promoted'}</div>
            {products && (
                <DataTable columns={columns} data={products as ProductWeb[]} />
            )}
        </div>
    );
};

export default ProductsDataTable;
