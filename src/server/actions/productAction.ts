'use server';

import {revalidatePath} from 'next/cache';
import {redirect} from 'next/navigation';
import {z} from 'zod';

import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes, DashboardRoutes} from '~types/AppRoutes';
import {CompanyTypeWeb} from '~types/company';
import {productFormSchema} from '~validations/product';

export const createProduct = async (
    company: CompanyTypeWeb,
    values: z.infer<typeof productFormSchema>,
    mainImage: string,
    images: string,
    isEdit?: boolean,
    id?: string,
) => {
    const parsedImages: Array<string> = JSON.parse(images);

    if (isEdit && id) {
        if ([mainImage, ...parsedImages].length > 0) {
            const submitValues = {
                companyId: company?.id || '',
                ...values,
                mainImage: mainImage,
                images: parsedImages,
                id: id,
                description: values.description,
            };
            await serverClient.editProduct(submitValues);
        } else {
            const submitValues = {
                companyId: company?.id || '',
                ...values,
                id: id,
                description: values.description,
            };
            await serverClient.editProduct(submitValues);
        }
    } else {
        if ([mainImage, ...parsedImages].length > 0) {
            const submitValues = {
                companyId: company?.id || '',
                ...values,
                mainImage: mainImage,
                images: parsedImages,
                description: values.description,
            };

            await serverClient.createProduct(submitValues);
        } else {
            const submitValues = {
                companyId: company?.id || '',
                ...values,
                description: values.description,
            };
            await serverClient.createProduct(submitValues);
        }
    }

    revalidatePath('/');
    revalidatePath(AppRoutes.WEB_PRODUCTS);
    redirect(DashboardRoutes.PRODUCTS);
};
