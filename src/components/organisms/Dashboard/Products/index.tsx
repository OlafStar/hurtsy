'use client';
import {useRouter} from 'next/navigation';
import {Button} from '~components/ui/button';
import { ProductRoutes } from '~types/AppRoutes';

const Products = () => {
    const router = useRouter();
    return (
        <div>
            <Button
                onClick={() => {
                    router.push(ProductRoutes.ADD_PRODUCT);
                }}
            >
                {'Dodaj produkt'}
            </Button>
        </div>
    );
};

export default Products;
