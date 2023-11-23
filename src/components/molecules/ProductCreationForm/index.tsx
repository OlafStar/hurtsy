'use client';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import React, {useState} from 'react';

import {productFormSchema} from '~validations/product';
import {Button} from '~components/ui/button';
import {Form} from '~/components/ui/form';
import {
    generateDefaultValues,
    productFormDefaultValues,
} from '~config/formDefaultValues';
import {ProductWeb} from '~types/products';
import {useUserCompany} from '~hooks/useUserCompany';
import {useToast} from '~components/ui/use-toast';

import FormFieldArray from '../FormFieldArray';
import {createProduct} from '../../../server/actions/productAction';

import ProductNameField from './ProductNameField';
import ProductCategoriesFields from './ProductCategoriesFields';
import ProductDeliveryField from './ProductDeliveryField';
import ProductPhotosFields from './ProductPhotosField';
import ProductDescriptionField from './ProductDescriptionField';

type ProductCreationFormProps = {isEdit?: boolean; initialData?: ProductWeb};

const ProductCreationForm = ({isEdit, initialData}: ProductCreationFormProps) => {
    const [allImages, setAllImages] = useState<Array<string>>([]);

    const {company} = useUserCompany();

    const {toast} = useToast();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues:
            isEdit && initialData
                ? generateDefaultValues(initialData)
                : productFormDefaultValues,
    });

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        if (company) {
            createProduct(
                company,
                values,
                JSON.stringify([allImages[0]]),
                JSON.stringify(allImages.slice(1)),
                isEdit,
                initialData?.id,
            );
        }
        toast({
            title: 'Success',
            description: `Product ${isEdit ? 'edytowany' : 'został stworzony'}`,
        });
    }

    return (
        <div className="p-4 min-h-full flex flex-col">
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2 pb-[70px]">
                    <div className="text-2xl font-bold">
                        {isEdit ? 'Edytuj produkt' : 'Dodaj produkt'}
                    </div>
                    <div className="text-sm opacity-50">
                        {isEdit
                            ? 'Zaaktualizuj informacje w tym produkcie'
                            : 'Stworz produkt i zacznij zbierać oferty!'}
                    </div>
                </div>
                <div className="flex gap-4 xs:flex-row flex-col">
                    <Button variant="outline" type="button">
                        {'Podgląd'}
                    </Button>
                    <Button form="productForm" type="submit">
                        {isEdit ? 'Edytuj' : 'Dodaj'}
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form
                    id="productForm"
                    name="productForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 max-w-[800px] w-full mx-auto flex flex-col gap-10"
                >
                    <div className="flex flex-col gap-6">
                        <ProductPhotosFields
                            control={form.control}
                            name="mainImage"
                            setAllImages={setAllImages}
                        />
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="text-xl font-bold">
                                    {'Informacje o produkcie'}
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-black opacity-10" />
                        </div>
                        <ProductNameField
                            control={form.control}
                            name="name"
                            defaultValue={initialData?.name || ''}
                        />
                        <ProductCategoriesFields
                            control={form.control}
                            name="category.mainCategory"
                            defaultValue={initialData?.category?.mainCategory}
                        />
                        <ProductDeliveryField
                            control={form.control}
                            name="deliveryPrice"
                            defaultValue={initialData?.deliveryPrice || undefined}
                        />
                    </div>
                    <FormFieldArray
                        control={form.control}
                        name="prices"
                        defaultValue={{
                            price: 0,
                            minQuantity: 0,
                            maxQuantity: 0,
                        }}
                    />
                    <FormFieldArray
                        control={form.control}
                        name="customizations"
                        defaultValue={{
                            name: '',
                            minQuantity: 0,
                        }}
                    />

                    <FormFieldArray
                        control={form.control}
                        name="customProperties"
                        defaultValue={{
                            name: '',
                            value: '',
                        }}
                    />

                    <ProductDescriptionField
                        control={form.control}
                        name="description"
                    />
                </form>
            </Form>
        </div>
    );
};

export default ProductCreationForm;
