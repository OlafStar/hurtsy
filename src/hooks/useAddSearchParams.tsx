import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import { SearchParams } from '~config/searchParams';

export function useAddSearchParams() {
    const router = useRouter();
    const path = usePathname();
    const currentSearchParams = useSearchParams();

    const updateParams = (
        newParams: Record<string, string | number | boolean>,
        keysToDelete?: SearchParams[],
    ) => {
        const searchParams = new URLSearchParams(currentSearchParams);

        keysToDelete?.forEach((key) => searchParams.delete(key));

        Object.entries(newParams).forEach(([key, value]) => {
            searchParams.set(key, String(value));
        });

        const newSearch = searchParams.toString();
        console.log(newSearch);
        router.replace(newSearch ? `${path}?${newSearch}` : path);
    };

    return {currentSearchParams, updateParams};
}
