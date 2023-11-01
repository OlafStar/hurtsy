import {trpc} from '~app/_trpc/client';
import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';

export default function useUserCompanyProducts(
    initial?: Awaited<ReturnType<(typeof serverClient)['getUserCompanyProducts']>>,
) {
    const {
        data: products,
        refetch,
        isLoading,
    } = trpc.getUserCompanyProducts.useQuery(undefined, {
        initialData: initial,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    return {products, refetch, isLoading} as {
        products: ProductWeb[] | undefined;
        refetch: typeof refetch;
        isLoading: boolean;
    };
}
