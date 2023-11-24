import {TRPCError} from '@trpc/server';

import prismadb from '~lib/prismadb';
import {createOfferSchema} from '~validations/offers';

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
};
