'use server';

import {getTRPCErrorFromUnknown} from '@trpc/server';
import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';

import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes, DashboardRoutes} from '~types/AppRoutes';
import {companyCreationSchema} from '~validations/company';

export const createCompany = async (
    values: z.infer<typeof companyCreationSchema>,
    mainImage: string,
    isEdit?: boolean,
) => {
    try {
        if (isEdit) {
            if (mainImage.length > 0) {
                await serverClient.editCompany({
                    ...values,
                    image: mainImage,
                    description: values.description,
                });
            } else {
                await serverClient.editCompany({
                    ...values,
                    description: values.description,
                });
            }
        } else {
            if (mainImage.length > 0) {
                await serverClient.createCompany({
                    ...values,
                    image: mainImage,
                    description: values.description,
                });
            } else {
                await serverClient.createCompany({
                    ...values,
                    description: values.description,
                });
            }
        }

        revalidatePath('/');
        revalidatePath(AppRoutes.YOUR_COMPANY);
        redirect(DashboardRoutes.YOUR_COMPANY);
    } catch (error) {
        const trpcError = getTRPCErrorFromUnknown(error);
        throw new Error(trpcError.message);
    }
};
