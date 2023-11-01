import ProductPage from '~components/organisms/Website/ProductPage';
import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';

async function Page({params}: {params: {id: string}}) {
    console.log(params.id);
    const product = await serverClient.getProduct(params.id);

    if (product) {
        return <ProductPage {...(product as ProductWeb)} />;
    }
}

export default Page;
