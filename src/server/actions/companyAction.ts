'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';

import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes, DashboardRoutes} from '~types/AppRoutes';
import {companyCreationSchema} from '~validations/company';

export const createCompany = async (
    values: z.infer<typeof companyCreationSchema>,
    mainImage: string | undefined,
    isEdit?: boolean,
) => {
    if (isEdit) {
        await serverClient.editCompany({
            ...values,
            image: mainImage,
            description: values.description,
        });
    } else {
        await serverClient.createCompany({
            ...values,
            image: mainImage,
            description: values.description,
        });
    }

    revalidatePath('/');
    revalidatePath(AppRoutes.YOUR_COMPANY);
    redirect(DashboardRoutes.YOUR_COMPANY);
};
