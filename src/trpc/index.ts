import {getCurrentUser} from '~lib/session';
import {publicProcedure, privateProcedure, router} from './trpc';
import {TRPCError} from '@trpc/server';
import prismadb from '~lib/prismadb';

export const appRouter = router({
    // authCallback: publicProcedure.query(async () => {
    //     const user = await getCurrentUser();
    //     //@TODO change name to id
    //     if (!user?.name || user?.email) {
    //         throw new TRPCError({code: 'UNAUTHORIZED'});
    //     }
    //     const dbUser = prismadb.user.findFirst({
    //         where: {
    //             email: user.email,
    //         },
    //     });
    //     if (!dbUser) {
    //     }
    //     return {success: true};
    // }),
    getUserCompany: privateProcedure.query(async ({ctx}) => {
        const {user: {id}} = ctx;

        return await prismadb.company.findUnique({
            where: {
                id,
            },
        });
    }),
});

export type AppRouter = typeof appRouter;
