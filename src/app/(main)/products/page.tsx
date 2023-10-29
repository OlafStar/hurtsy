import ProductsPage from '~components/organisms/Website/Products';
import {SearchParamsType} from '~config/searchParams';

function Page({
    params,
    searchParams,
}: {
    params: {slug: string};
    searchParams?: SearchParamsType;
}) {
    return <ProductsPage searchParams={searchParams} />;
}

export default Page;
