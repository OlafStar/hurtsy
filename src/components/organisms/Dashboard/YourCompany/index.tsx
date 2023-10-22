'use client';

import CompanyDashboardProfile from '~components/molecules/CompanyDashboardProfile';
import CompanyEmptyState from '~components/molecules/CompanyEmptyState';
import CompanyForm from '~components/molecules/CompanyForm';
import {useUserCompany} from '~hooks/useUserCompany';

const YourCompany = () => {
    const company = useUserCompany();

    return (
        <>
            {company ? (
                <div className="p-4 grid grid-cols-2 gap-4">
                    <CompanyDashboardProfile />
                </div>
            ) : (
                <CompanyEmptyState />
            )}
        </>
    );
};

export default YourCompany;
