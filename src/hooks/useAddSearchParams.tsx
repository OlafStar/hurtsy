import {usePathname, useRouter, useSearchParams} from 'next/navigation';
import {SearchParams} from '~config/searchParams';

export function useAddSearchParams() {
    const router = useRouter();
    const path = usePathname();
    const currentSearchParams = useSearchParams();

    const updateParams = (
        newParams: Record<string, string | number | boolean | string[]>,
        keysToDelete?: SearchParams[],
    ) => {
        const searchParams = new URLSearchParams(currentSearchParams);

        keysToDelete?.forEach((key) => searchParams.delete(key));

        Object.entries(newParams).forEach(([key, value]) => {
            if (Array.isArray(value)) {
                value.forEach((val, index) => {
                    if (typeof val === 'string') {
                        if (index === 0) {
                            searchParams.set(key, val);
                        } else {
                            searchParams.append(key, val);
                        }
                    }
                });
            } else {
                searchParams.set(key, String(value));
            }
        });

        const newSearch = searchParams.toString();
        router.replace(newSearch ? `${path}?${newSearch}` : path);
    };

    return {currentSearchParams, updateParams};
}
