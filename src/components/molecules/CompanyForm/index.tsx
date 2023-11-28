'use client';

import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useState} from 'react';
import {Loader2} from 'lucide-react';

import {CompanyTypeWeb} from '~types/company';
import {companyCreationSchema} from '~validations/company';
import {Form} from '~/components/ui/form';
import {Button} from '~/components/ui/button';
import {useToast} from '~components/ui/use-toast';
import {createCompany} from '~server/actions/companyAction';
import {companyDefaults, generateCompanyDefaults} from '~config/formDefaultValues';

import DescriptionField from '../DescriptionField';

import CompanyPhotoFields from './CompanyPhotoField';
import CompanyTypeField from './CompanyTypeField';
import CompanyReusableField from './CompanyReusableField';
import CountryField from './CountryField';
import ReusableNumberField from './ReusableNumberField';

type CompanyFormProps = {
    isEdit?: boolean;
    initialData?: CompanyTypeWeb;
};

const CompanyForm = ({isEdit, initialData}: CompanyFormProps) => {
    const [isLoading, setIsLoading] = useState(false);
    const [mainImage, setMainImage] = useState<string>('');

    const {toast} = useToast();

    const form = useForm<z.infer<typeof companyCreationSchema>>({
        resolver: zodResolver(companyCreationSchema),
        defaultValues: initialData
            ? generateCompanyDefaults(initialData)
            : companyDefaults,
    });

    async function onSubmit(values: z.infer<typeof companyCreationSchema>) {
        setIsLoading(true);
        try {
            await createCompany(values, mainImage, isEdit);
            toast({
                title: 'Success',
                description: `Firma została ${isEdit ? 'edytowana' : 'utworzona'}`,
            });
        } catch (error) {
            toast({
                title: 'Error',
                description: `Wystąpił błąd z ${
                    isEdit ? 'edytowaniem' : 'tworzeniem'
                }`,
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="p-4 min-h-full flex flex-col">
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2 pb-[70px]">
                    <div className="text-2xl font-bold">
                        {isEdit ? 'Edytuj firme' : 'Dodaj firme'}
                    </div>
                    <div className="text-sm opacity-50">
                        {isEdit
                            ? 'Zaktualizuj profil swojej firmy, aby dostosować informacje i poprawić swoją ofertę na rynku.'
                            : 'Stwórz profil firmy i zacznij wystawiać lub wysyłać oferty'}
                    </div>
                </div>
                <div className="flex gap-4 xs:flex-row flex-col">
                    <Button
                        form="companyForm"
                        type="submit"
                        className="flex items-center"
                    >
                        {isLoading ? (
                            <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                        ) : null}
                        <div>{isEdit ? 'Edytuj' : 'Dodaj'}</div>
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form
                    id="companyForm"
                    name="companyForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 max-w-[800px] w-full mx-auto flex flex-col gap-10"
                >
                    <div className="flex flex-col gap-5">
                        <div className="flex flex-col xs:flex-row w-full gap-4">
                            <CompanyPhotoFields
                                control={form.control}
                                name="image"
                                setImage={setMainImage}
                            />
                            <div className="flex-1 flex flex-col gap-3">
                                <CompanyReusableField
                                    control={form.control}
                                    name="companyName"
                                    defaultValue={initialData?.name || ''}
                                    label="Nazwa firmy"
                                    placeholder="Nazwa firmy"
                                />
                                <CompanyTypeField
                                    control={form.control}
                                    name="type"
                                    defaultValue={initialData?.type || undefined}
                                />
                            </div>
                        </div>
                        <div className="grid grid-cols-2 xs:flex gap-3">
                            <CompanyReusableField
                                control={form.control}
                                name="address"
                                defaultValue={initialData?.street || ''}
                                label="Adres"
                                placeholder="Ulica i numer"
                            />
                            <ReusableNumberField
                                control={form.control}
                                name="postalCode"
                                defaultValue={initialData?.postCode || ''}
                                label="Kod pocztowy"
                                placeholder="00-000"
                                numberType="string"
                                customReg={RegExp(/^\d*\-?\d{0,3}$/)}
                                formatFunction={(value) => {
                                    const pattern = /(\d{2})(\d{3})/;
                                    const replacement = '$1-$2';
                                    return value.replace(pattern, replacement);
                                }}
                            />
                            <CompanyReusableField
                                control={form.control}
                                name="city"
                                defaultValue={initialData?.city || ''}
                                label="Miasto"
                                placeholder="Miasto"
                            />
                        </div>
                        <div className="flex gap-3 w-full flex-col xs:flex-row">
                            <CountryField
                                control={form.control}
                                name="country"
                                defaultValue={initialData?.country || ''}
                            />
                            <ReusableNumberField
                                control={form.control}
                                name="established"
                                defaultValue={initialData?.establishment}
                                label="Rok założenia"
                                placeholder="Rok założenia"
                                numberType="int"
                            />
                            <ReusableNumberField
                                control={form.control}
                                name="phoneNumber"
                                defaultValue={initialData?.phone}
                                label="Numer telefonu"
                                placeholder="123123123"
                                numberType="string"
                            />
                        </div>
                        <CompanyReusableField
                            control={form.control}
                            name="website"
                            defaultValue={initialData?.website || undefined}
                            label="Strona internetowa"
                            placeholder="Strona internetowa"
                        />
                        <div className="h-full flex-1 pt-5 lg:pt-0">
                            <DescriptionField
                                control={form.control}
                                name="description"
                                defaultValue={initialData?.description || undefined}
                                label="Opis"
                            />
                        </div>
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default CompanyForm;
