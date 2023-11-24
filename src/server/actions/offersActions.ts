'use server';

import {revalidatePath} from 'next/cache';

import {serverClient} from '~server/trpc/serverClient';
import {DashboardRoutes} from '~types/AppRoutes';

export const createOffer = async (
    productId: string,
    message: string,
    quantity: number,
) => {
    await serverClient.createOffer({productId, message, quantity});
    revalidatePath(DashboardRoutes.OFFERS);
};
