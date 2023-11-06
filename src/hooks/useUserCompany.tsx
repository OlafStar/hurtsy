import {trpc} from '~app/_trpc/client';

export function useUserCompany() {
    const {data: company, isLoading} = trpc.getUserCompany.useQuery();

    return {company, isLoading};
}
