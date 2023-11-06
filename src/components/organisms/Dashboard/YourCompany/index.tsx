'use client';

import CompanyDashboardProfile from '~components/molecules/CompanyDashboardProfile';
import CompanyEmptyState from '~components/molecules/CompanyEmptyState';
import {useUserCompany} from '~hooks/useUserCompany';

const YourCompany = () => {
    const {company, isLoading} = useUserCompany();

    return (
        <>
            {!isLoading ? (
                company ? (
                    <div className="p-4 grid grid-cols-2 gap-4">
                        <CompanyDashboardProfile company={company} />
                    </div>
                ) : (
                    <CompanyEmptyState />
                )
            ) : null}
        </>
    );
};

export default YourCompany;
