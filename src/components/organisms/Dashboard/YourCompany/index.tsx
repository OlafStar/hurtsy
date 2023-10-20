import CompanyDashboardProfile from '~components/molecules/CompanyDashboardProfile';
import CompanyEmptyState from '~components/molecules/CompanyEmptyState';
import CompanyForm from '~components/molecules/CompanyForm';

const YourCompany = () => {
    return (
        <>
            <div className="p-4 grid grid-cols-2 gap-4">
                <CompanyDashboardProfile />
                <CompanyForm />
            </div>
            {/* <CompanyEmptyState /> */}
        </>
    );
};

export default YourCompany;
