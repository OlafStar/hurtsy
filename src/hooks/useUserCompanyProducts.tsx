import {trpc} from '~app/_trpc/client';
import {serverClient} from '~server/trpc/serverClient';
import {ProductWeb} from '~types/products';

export default function useUserCompanyProducts(
    initial?: Awaited<ReturnType<(typeof serverClient)['getUserCompanyProducts']>>,
    initialCounter?: Awaited<
        ReturnType<(typeof serverClient)['getUserProductsCount']>
    >,
) {
    const formattedInitial = initial?.map((product) => ({
        ...product,
        promotedTo: product.promotedTo?.toISOString() ?? null, // Convert Date to string
        createdAt: product.createdAt.toISOString(),
    }));

    const {
        data: products,
        refetch: refetchProducts,
        isLoading,
    } = trpc.getUserCompanyProducts.useQuery(undefined, {
        initialData: formattedInitial,
        refetchOnMount: false,
        refetchOnReconnect: false,
        refetchOnWindowFocus: false,
    });

    const {data: counter, refetch: refetchCounter} =
        trpc.getUserProductsCount.useQuery(undefined, {
            initialData: initialCounter,
            refetchOnMount: false,
            refetchOnReconnect: false,
            refetchOnWindowFocus: false,
        });

    const refetch = async () => {
        await refetchProducts();
        await refetchCounter();
    };

    return {products, counter, refetch, isLoading} as {
        products: ProductWeb[] | undefined;
        counter: typeof counter;
        refetch: typeof refetch;
        isLoading: boolean;
    };
}
