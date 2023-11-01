import ProductTabs from '~components/molecules/ProductTabs';
import ProductsDataTable from '~components/molecules/ProductsDataTable';
import {serverClient} from '~server/trpc/serverClient';

const Products = async () => {
    const initialProducts = await serverClient.getUserCompanyProducts();
    return (
        <div className="">
            <div className="p-4">
                <ProductTabs
                    promotedChildren={
                        <ProductsDataTable
                            initialProducts={initialProducts}
                            isPromoted={true}
                        />
                    }
                >
                    <ProductsDataTable initialProducts={initialProducts} />
                </ProductTabs>
            </div>
        </div>
    );
};

export default Products;
