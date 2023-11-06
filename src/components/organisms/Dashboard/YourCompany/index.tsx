import CompanyDashboardProfile from '~components/molecules/CompanyDashboardProfile';
import CompanyEmptyState from '~components/molecules/CompanyEmptyState';
import {serverClient} from '~server/trpc/serverClient';
import {CompanyTypeWeb} from '~types/company';

const YourCompany = async () => {
    const company = await serverClient.getUserCompany();

    return company ? (
        <CompanyDashboardProfile company={company as CompanyTypeWeb} />
    ) : (
        <CompanyEmptyState />
    );
};

export default YourCompany;
