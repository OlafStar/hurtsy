import CompanyPage from '~components/organisms/Website/CompanyPage';
import {SearchParamsType} from '~config/searchParams';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';

async function Page({
    params,
    searchParams,
}: {
    params: {id: string};
    searchParams?: SearchParamsType;
}) {
    const company = await serverClient.getCompany(params.id);

    if (company) {
        return <CompanyPage searchParams={searchParams} {...(company as CompanyTypeWeb)} />;
    }
}

export default Page;
