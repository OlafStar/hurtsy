'use client';

import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useState} from 'react';
import {CompanyType} from '@prisma/client';

import {CompanyTypeWeb} from '~types/company';
import {DashboardRoutes} from '~types/AppRoutes';
import {trpc} from '~app/_trpc/client';
import {companyCreationSchema} from '~validations/company';
import {Input} from '~/components/ui/input';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import {Button} from '~/components/ui/button';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';
import {useUploadS3} from '~hooks/useUploadS3';
import {useToast} from '~components/ui/use-toast';
import {Dialog, DialogContent} from '~components/ui/dialog';
import {Progress} from '~components/ui/progress';
import useUserCompanyRepresentatives from '~hooks/useUserCompanyRepresentatives';
import AddImage from '~components/atoms/AddImage';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import Tiptap from '~components/atoms/TipTap';
import {Countries} from '~config/countries';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

type CompanyFormProps = {
    isEdit?: boolean;
    initialData?: CompanyTypeWeb;
};

const CompanyForm = ({isEdit, initialData}: CompanyFormProps) => {
    const [mainImage, setMainImage] = useState<Array<File | string>>(
        isEdit && initialData?.image ? [initialData.image] : [],
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [descriptionImages, setDescriptionImages] = useState<Array<File>>([]);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);
    const [year, setYear] = useState<number>(
        initialData?.establishment ? initialData.establishment : 0,
    );
    const [phone, setPhone] = useState<string>(
        initialData?.phone ? initialData.phone : '',
    );

    const {refetch: refetchRepresentative} = useUserCompanyRepresentatives();
    const {uploadImageToS3, uploadImagesToS3} = useUploadS3();
    const router = useRouter();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof companyCreationSchema>>({
        resolver: zodResolver(companyCreationSchema),
        defaultValues: initialData
            ? {
                  companyName: initialData.name,
                  image: initialData.image || '',
                  address: initialData.street,
                  type: initialData.type,
                  city: initialData.city,
                  phoneNumber: initialData.phone,
                  postalCode: initialData.postCode,
                  country: initialData.country,
                  established: initialData.establishment,
                  website: initialData.website || '',
              }
            : {
                  companyName: '',
                  city: '',
                  phoneNumber: '',
                  address: '',
                  postalCode: '',
                  established: 2023,
                  website: undefined,
              },
    });

    const {mutateAsync} = trpc.createCompany.useMutation();
    const {mutateAsync: editCompany} = trpc.editCompany.useMutation();

    const startSimulatedProgress = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + 5;
            });
        }, 500);

        return interval;
    };

    const handleYear = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
            setYear(+e.target.value);
            form.setValue('established', +e.target.value);
        }
    };

    const handlePhone = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.value === '' || /^[0-9]+$/.test(e.target.value)) {
            setPhone(e.target.value);
            form.setValue('phoneNumber', e.target.value);
        }
    };

    async function onSubmit(values: z.infer<typeof companyCreationSchema>) {
        try {
            setIsOpen(true);
            setIsUploading(true);
            const progressInterval = startSimulatedProgress();

            let updatedDesc: string | undefined = undefined;
            if (descriptionImages.length > 0 && values.description) {
                const keys = await uploadImagesToS3(descriptionImages);
                const blobUrlRegex =
                    /<img [^>]*src=["'](blob:http:\/\/localhost:3000\/[^"']*)["']/g;
                let localUrls = [];
                let match;

                // Use a loop to extract all matches
                while ((match = blobUrlRegex.exec(values.description)) !== null) {
                    // The actual blob URL is captured in the full match
                    localUrls.push(match[1]);
                }

                console.log(localUrls);

                console.log(keys);
                console.log(localUrls);
                console.log(values.description);

                let updatedDescription = values.description;

                localUrls.forEach((localUrl, index) => {
                    const key = keys[index];
                    updatedDescription = updatedDescription.replace(
                        new RegExp(localUrl, 'g'),
                        key,
                    );
                });
                console.log(updatedDescription);
                updatedDesc = updatedDescription;
            }

            if (isEdit) {
                if (mainImage.length > 0 && typeof mainImage[0] !== 'string') {
                    const key = await uploadImageToS3(mainImage[0]);
                    await editCompany({...values, image: key});
                } else if (
                    mainImage.length > 0 &&
                    typeof mainImage[0] === 'string'
                ) {
                    await editCompany({
                        ...values,
                        image: mainImage[0],
                        description: updatedDesc ? updatedDesc : values.description,
                        established: year,
                        phoneNumber: phone,
                    });
                } else {
                    await editCompany({
                        ...values,
                        description: updatedDesc ? updatedDesc : values.description,
                        established: year,
                        phoneNumber: phone,
                    });
                }
                await refetchRepresentative();
            } else {
                if (mainImage.length > 0 && typeof mainImage[0] !== 'string') {
                    const key = await uploadImageToS3(mainImage[0]);
                    await mutateAsync({
                        ...values,
                        image: key,
                        description: updatedDesc ? updatedDesc : values.description,
                        established: year,
                    });
                } else {
                    await mutateAsync({
                        ...values,
                        description: updatedDesc ? updatedDesc : values.description,
                        established: year,
                    });
                }
            }

            form.reset();
            clearInterval(progressInterval);
            setUploadProgress(100);

            setIsUploading(false);
            setIsOpen(false);
            toast({
                title: 'Success',
                description: `Product has been ${isEdit ? 'edited' : 'created'}`,
            });
            router.refresh();
            router.push(DashboardRoutes.YOUR_COMPANY);
        } catch (error) {
            console.error('Error creating company:', error);
        }
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
                    <Button form="companyForm" variant="outline" type="button">
                        {'Podgląd'}
                    </Button>
                    <Button form="companyForm" type="submit">
                        {isEdit ? 'Edytuj' : 'Dodaj'}
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form
                    id="companyForm"
                    name="companyForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="flex-1"
                >
                    <div className="grid lg:grid-cols-2 gap-x-4">
                        <div className="flex flex-col gap-5">
                            <div className="flex flex-col xs:flex-row w-full gap-4">
                                <div>
                                    {isEdit &&
                                    initialData?.image &&
                                    mainImage.length > 0 ? (
                                        <img
                                            className="w-[148px] h-[148px] object-contain"
                                            src={
                                                typeof mainImage[0] !== 'string'
                                                    ? getImgBeforeUpload(
                                                          mainImage[0],
                                                      )
                                                    : mainImage[0]
                                            }
                                            onClick={() => setMainImage([])}
                                        />
                                    ) : mainImage[0] ? (
                                        <img
                                            className="w-[148px] h-[148px] object-contain"
                                            src={
                                                typeof mainImage[0] !== 'string'
                                                    ? getImgBeforeUpload(
                                                          mainImage[0],
                                                      )
                                                    : mainImage[0]
                                            }
                                            onClick={() => setMainImage([])}
                                        />
                                    ) : (
                                        <AddImage
                                            className={`w-full xs:w-[148px] xs:h-[148px] ${
                                                form.formState.errors.image
                                                    ? ''
                                                    : 'border border-red-300'
                                            }`}
                                            multiple={true}
                                            onAcceptedImage={setMainImage}
                                        />
                                    )}
                                </div>
                                <div className="flex-1 flex flex-col gap-3">
                                    <FormField
                                        control={form.control}
                                        name="companyName"
                                        render={({field}) => (
                                            <FormItem className="flex-1 space-y-3">
                                                <FormLabel>
                                                    {'Nazwa firmy'}
                                                </FormLabel>
                                                <FormControl>
                                                    <Input
                                                        placeholder="Nazwa firmy"
                                                        {...field}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />

                                    <FormField
                                        control={form.control}
                                        name="type"
                                        render={({field}) => (
                                            <FormItem>
                                                <FormLabel>{'Typ firmy'}</FormLabel>
                                                <FormControl>
                                                    <Select
                                                        defaultValue={
                                                            isEdit && initialData
                                                                ? (initialData.type as string)
                                                                : undefined
                                                        }
                                                        onValueChange={
                                                            field.onChange
                                                        }
                                                        {...field}
                                                    >
                                                        <SelectTrigger className="space-y-3 shadow-sm border border-input">
                                                            <SelectValue placeholder="" />
                                                        </SelectTrigger>
                                                        <SelectContent>
                                                            {Object.entries(
                                                                CompanyType,
                                                            ).map(
                                                                (
                                                                    [_, value],
                                                                    index,
                                                                ) => {
                                                                    return (
                                                                        <SelectItem
                                                                            key={
                                                                                index
                                                                            }
                                                                            value={
                                                                                value
                                                                            }
                                                                        >
                                                                            {value}
                                                                        </SelectItem>
                                                                    );
                                                                },
                                                            )}
                                                        </SelectContent>
                                                    </Select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                            <div className="grid grid-cols-2 xs:flex gap-3">
                                <FormField
                                    control={form.control}
                                    name="address"
                                    render={({field}) => (
                                        <FormItem className="space-y-3 flex-1 col-span-2 row-span-2">
                                            <FormLabel>{'Adres'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Ulica i numer, miasto"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="postalCode"
                                    render={({field}) => (
                                        <FormItem className="space-y-3 flex-1">
                                            <FormLabel>{'Kod pocztowy'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="00-000"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="city"
                                    render={({field}) => (
                                        <FormItem className="space-y-3 flex-1">
                                            <FormLabel>{'Miasto'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    placeholder="Miasto"
                                                    {...field}
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <div className="flex gap-3 w-full">
                                <FormField
                                    control={form.control}
                                    name="country"
                                    render={({field}) => (
                                        <FormItem className="space-y-3 flex-1">
                                            <FormLabel>{'Kraj'}</FormLabel>
                                            <FormControl>
                                                <Select
                                                    defaultValue={
                                                        isEdit && initialData
                                                            ? (initialData.country as string)
                                                            : undefined
                                                    }
                                                    {...field}
                                                    onValueChange={field.onChange}
                                                >
                                                    <SelectTrigger className="space-y-3 shadow-sm border border-input">
                                                        <SelectValue placeholder="" />
                                                    </SelectTrigger>
                                                    <SelectContent>
                                                        {Object.entries(
                                                            Countries,
                                                        ).map(
                                                            ([_, value], index) => {
                                                                return (
                                                                    <SelectItem
                                                                        key={index}
                                                                        value={value}
                                                                    >
                                                                        {translateEnumValueToPolish(
                                                                            value,
                                                                        )}
                                                                    </SelectItem>
                                                                );
                                                            },
                                                        )}
                                                    </SelectContent>
                                                </Select>
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="established"
                                    render={({field}) => (
                                        <FormItem className="space-y-3 max-w-[100px]">
                                            <FormLabel>{'Rok założenia'}</FormLabel>
                                            <FormControl>
                                                <Input
                                                    {...field}
                                                    onChange={(event) =>
                                                        handleYear(event)
                                                    }
                                                />
                                            </FormControl>
                                        </FormItem>
                                    )}
                                />
                            </div>
                            <FormField
                                control={form.control}
                                name="phoneNumber"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>{'Numer telefonu'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="123456789"
                                                {...field}
                                                onChange={(event) =>
                                                    handlePhone(event)
                                                }
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                            <FormField
                                control={form.control}
                                name="website"
                                render={({field}) => (
                                    <FormItem className="flex-1 space-y-3">
                                        <FormLabel>{'Strona internetowa'}</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Strona internetowa"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                        </div>

                        <div className="h-full flex-1 pt-5 lg:pt-0">
                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem className="h-full">
                                        <FormLabel>{'Opis firmy'}</FormLabel>
                                        <FormControl>
                                            <div className="h-full pb-8">
                                                <Tiptap
                                                    content={
                                                        isEdit &&
                                                        initialData?.description
                                                            ? initialData.description
                                                            : ''
                                                    }
                                                    onChange={field.onChange}
                                                    {...{
                                                        descriptionImages,
                                                        setDescriptionImages,
                                                    }}
                                                />
                                            </div>
                                        </FormControl>
                                    </FormItem>
                                )}
                            />
                        </div>
                    </div>
                </form>
            </Form>
            <Dialog
                open={isOpen}
                onOpenChange={(v) => {
                    if (!v) {
                        setIsOpen(v);
                    }
                }}
            >
                <DialogContent hideClose>
                    {isUploading && (
                        <Progress
                            value={uploadProgress}
                            className="h-1 w-full bg-zinc-200"
                        />
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
};

export default CompanyForm;
