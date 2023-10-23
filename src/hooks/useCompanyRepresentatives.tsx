import {trpc} from '~app/_trpc/client';

export default function useCompanyRepresentatives(companyId: string) {
    const {data: representatives, refetch, isLoading} = trpc.getCompanyRepresentatives.useQuery({
        companyId: companyId,
    });

    return {representatives, refetch, isLoading}
}
