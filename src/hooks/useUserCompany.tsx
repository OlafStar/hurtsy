'use client';
import {trpc} from '~app/_trpc/client';

export function useUserCompany() {
    const {data} = trpc.getUserCompany.useQuery();

    return data;
}
