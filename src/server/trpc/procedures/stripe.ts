import {absoluteUrl} from '~utils/absoluteUrl';
import {privateProcedure} from '../trpc';
import {TRPCError} from '@trpc/server';
import prismadb from '~lib/prismadb';
import {getUserSubscriptionPlan, stripe} from '~lib/stripe';
import {PLANS} from '~config/stripe';
import {z} from 'zod';
import { DashboardRoutes } from '~types/AppRoutes';

export const stripeProcedures = {
    createStripeSession: privateProcedure
        .input(z.string())
        .mutation(async ({input, ctx}) => {
            const validatedInput = z.string().safeParse(input);

            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const {
                user: {id},
            } = ctx;

            const billingUrl = absoluteUrl('/pricing');
            const successUrl = absoluteUrl(DashboardRoutes.PLANS);

            if (!id) throw new TRPCError({code: 'UNAUTHORIZED'});

            const dbUser = await prismadb.user.findFirst({
                where: {
                    id: id,
                },
            });

            if (!dbUser) throw new TRPCError({code: 'UNAUTHORIZED'});

            const subscriptionPlan = await getUserSubscriptionPlan();

            //Current  customer
            if (subscriptionPlan.isSubscribed && dbUser.stripeCustomerId) {
                const stripeSession = await stripe.billingPortal.sessions.create({
                    customer: dbUser.stripeCustomerId,
                    return_url: billingUrl,
                });

                return {url: stripeSession.url};
            }
            //No current customer
            const stripeSession = await stripe.checkout.sessions.create({
                success_url: successUrl,
                cancel_url: billingUrl,
                payment_method_types: ['card', 'paypal'],
                mode: 'subscription',
                billing_address_collection: 'auto',
                line_items: [
                    {
                        //@TO-DO change to production
                        price: PLANS.find((plan) => plan.name === validatedInput.data)?.price
                            .priceIds.test,
                        quantity: 1,
                    },
                ],
                metadata: {
                    userId: id,
                },
            });

            return {url: stripeSession.url};
        }),
};
