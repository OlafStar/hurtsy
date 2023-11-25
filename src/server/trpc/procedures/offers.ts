import {TRPCError} from '@trpc/server';

import prismadb from '~lib/prismadb';
import {createOfferSchema} from '~validations/offers';
import {UserOffers} from '~types/offers';

import {privateProcedure} from '../trpc';
import {getUserCompany} from '../utils/getUserCompany';

export const offersProcedures = {
    createOffer: privateProcedure
        .input(createOfferSchema)
        .mutation(async ({ctx, input}) => {
            const user = ctx.user;

            if (!user || !user.id) {
                throw new Error('Unauthorize');
            }

            const validatedInput = createOfferSchema.safeParse(input);

            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const userCompany = await getUserCompany(ctx);

            if (!userCompany) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'User company not found',
                });
            }

            const product = await prismadb.product.findFirst({
                where: {id: validatedInput.data.productId},
                include: {company: true},
            });

            if (!product) {
                throw new TRPCError({
                    code: 'NOT_FOUND',
                    message: 'Product not found',
                });
            }

            await prismadb.offer.create({
                data: {
                    senderId: userCompany.id,
                    productId: product.id,
                    receiverId: product.companyId,
                    message: validatedInput.data.message,
                    quantity: validatedInput.data.quantity,
                },
            });
        }),

    getUserOffers: privateProcedure.query(async ({ctx}) => {
        const company = await getUserCompany(ctx);

        if (!company) {
            throw new TRPCError({
                code: 'NOT_FOUND',
                message: 'User company not found',
            });
        }

        const sendOffers = await prismadb.offer.findMany({
            where: {
                senderId: company.id,
            },
            include: {
                sender: true,
                receiver: true,
                product: true,
            },
        });

        const recivedOffers = await prismadb.offer.findMany({
            where: {
                receiverId: company.id,
            },
            include: {
                sender: true,
                receiver: true,
                product: true,
            },
        });

        return {sendOffers, recivedOffers} as UserOffers;
    }),
};
