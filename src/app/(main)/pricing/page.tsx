import PricingPage from '~components/organisms/Website/PricingPage';
import {SearchParamsType} from '~config/searchParams';

function Page({
    params,
    searchParams,
}: {
    params: {slug: string};
    searchParams?: SearchParamsType;
}) {
    return <PricingPage searchParams={searchParams} />;
}

export default Page;