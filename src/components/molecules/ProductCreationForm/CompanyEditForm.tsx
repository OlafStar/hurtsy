import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';

import ProductCreationForm from '.';

type ProductEditFormProps = {
    id: string;
};

const ProductEditForm = async ({id}: ProductEditFormProps) => {
    const product = await serverClient.getProductForEdit(id);
    return (
        <div>
            {product ? (
                <ProductCreationForm isEdit initialData={product as ProductWeb} />
            ) : (
                <div>{'Produkt z takim id nie istnieje'}</div>
            )}
        </div>
    );
};

export default ProductEditForm;
