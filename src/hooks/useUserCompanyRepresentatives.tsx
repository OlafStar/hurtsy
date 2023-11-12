import {trpc} from '~app/_trpc/client';
import {serverClient} from '~server/trpc/serverClient';

export default function useUserCompanyRepresentatives(
    initial?: Awaited<
        ReturnType<(typeof serverClient)['getUserCompanyRepresentatives']>
    >,
    initialCounter?: Awaited<
        ReturnType<(typeof serverClient)['getUserRepresentativesCount']>
    >,
) {
    const {
        data: representatives,
        isFetching,
        isLoading,
        refetch: refetchRepresentatives,
    } = trpc.getUserCompanyRepresentatives.useQuery(undefined, {
        initialData: initial,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const {data: counter, refetch: refetchCounter} =
        trpc.getUserRepresentativesCount.useQuery(undefined, {
            initialData: initialCounter,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        });

    const refetch = async () => {
        await refetchRepresentatives();
        await refetchCounter()
    };

    return {representatives, counter, refetch, isFetching, isLoading};
}
