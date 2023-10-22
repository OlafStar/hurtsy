import {useEffect} from 'react';
import {trpc} from '~app/_trpc/client';
import {useCompanyContext} from '~context/CompanyContext';

export function useUserCompany() {
    const {company, setCompany} = useCompanyContext();
    const {data, isLoading} = trpc.getUserCompany.useQuery();

    useEffect(() => {
        if (data && !company) {
            setCompany(data);
        }
    }, [data, company, setCompany]);

    return {company, isLoading};
}
