import CompaniesPage from '~components/organisms/Website/Companies';
import {SearchParamsType} from '~config/searchParams';

function Page({
    searchParams,
}: {
    params: {slug: string};
    searchParams?: SearchParamsType;
}) {
    return <CompaniesPage searchParams={searchParams} />;
}

export default Page;
