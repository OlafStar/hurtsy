import {columns} from './sample-data';
import {DataTable} from './data-table';
import {ProductWeb, sampleProducts} from '~types/products';
import {FC} from 'react';

async function getData(): Promise<ProductWeb[]> {
    return sampleProducts;
}

export type ProductsDataTableProps = {
    isPromoted?: boolean;
};

const ProductsDataTable: FC<ProductsDataTableProps> = async ({isPromoted}) => {
    const data = await getData();

    console.log(isPromoted);

    return (
        <div>
            <div>{isPromoted && 'promoted'}</div>
            <DataTable columns={columns} data={data} />
        </div>
    );
};

export default ProductsDataTable;
