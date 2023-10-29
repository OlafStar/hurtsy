import ProductTabs from '~components/molecules/ProductTabs';
import ProductsDataTable from '~components/molecules/ProductsDataTable';

const Products = () => {
    return (
        <div className="">
            <div className="p-4">
                <ProductTabs
                    promotedChildren={<ProductsDataTable isPromoted={true} />}
                >
                    <ProductsDataTable />
                </ProductTabs>
            </div>
        </div>
    );
};

export default Products;
