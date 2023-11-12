import {TRPCError, initTRPC} from '@trpc/server';
import {getCurrentUser} from '~lib/session';
import {getUserSubscriptionPlan} from '~lib/stripe';

const t = initTRPC.create();

const middleware = t.middleware;

const isAuth = middleware(async (opts) => {
    const user = await getCurrentUser();

    if (!user || !user.id) {
        throw new TRPCError({code: 'UNAUTHORIZED'});
    }

    const subscriptionPlan = await getUserSubscriptionPlan();
    
    return opts.next({
        ctx: {
            user,
            subscriptionPlan,
        },
    });
});

export const router = t.router;
export const publicProcedure = t.procedure;
export const privateProcedure = t.procedure.use(isAuth);
