import {serverClient} from '~server/trpc/serverClient';
import CompanyForm from '.';

const CompanyEditForm = async () => {
    const company = await serverClient.getUserCompany();
    return <div>{company && <CompanyForm isEdit initialData={company} />}</div>;
};

export default CompanyEditForm;
