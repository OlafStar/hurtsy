import {usePathname, useRouter, useSearchParams} from 'next/navigation';

export function useAddSearchParams() {
    const router = useRouter();
    const path = usePathname();
    const currentSearchParams = useSearchParams();

    return (newParam: Record<string, string | number | boolean>) => {
        const searchParams = new URLSearchParams(currentSearchParams);
        for (const [key, value] of Object.entries(newParam)) {
            searchParams.set(key, String(value));
        }
        router.push(`${path}?${searchParams.toString()}`);
    };
}
