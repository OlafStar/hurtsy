import ProductTabs from '~components/molecules/ProductTabs';
import ProductsDataTable from '~components/molecules/ProductsDataTable';
import {serverClient} from '~server/trpc/serverClient';

const Products = async () => {
    const initialProducts = await serverClient.getUserCompanyProducts();
    const initialCounter = await serverClient.getUserProductsCount();
    return (
        <div className="">
            <div className="py-4 lg:p-4">
                <ProductTabs
                    promotedChildren={
                        <ProductsDataTable
                            initialProducts={initialProducts}
                            initialCounter={initialCounter}
                            isPromoted={true}
                        />
                    }
                >
                    <ProductsDataTable
                        initialProducts={initialProducts}
                        initialCounter={initialCounter}
                    />
                </ProductTabs>
            </div>
        </div>
    );
};

export default Products;
