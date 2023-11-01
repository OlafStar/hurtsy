import {trpc} from '~app/_trpc/client';
import {serverClient} from '~server/trpc/serverClient';

export default function useUserCompanyRepresentatives(
    initial?: Awaited<
        ReturnType<(typeof serverClient)['getUserCompanyRepresentatives']>
    >,
) {
    const {
        data: representatives,
        isFetching,
        isLoading,
        refetch,
    } = trpc.getUserCompanyRepresentatives.useQuery(undefined, {
        initialData: initial,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return {representatives, refetch, isFetching, isLoading};
}
