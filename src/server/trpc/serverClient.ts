import {httpBatchLink} from '@trpc/client';

import {appRouter} from './index';

export const serverClient = appRouter.createCaller({
    links: [
        httpBatchLink({
            url: `${process.env.WEB_URL}/api/trpc`,
        }),
    ],
    ssr: true,
    responseMeta() {
        const ONE_DAY_IN_SECONDS = 60 * 60 * 24;
        return {
            headers: {
                'cache-control': `s-maxage=1, stale-while-revalidate=${ONE_DAY_IN_SECONDS}`,
            },
        };
    },
});
