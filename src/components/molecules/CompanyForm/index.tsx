'use client';

import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import {useState} from 'react';

import {CompanyTypeWeb} from '~types/company';
import {DashboardRoutes} from '~types/AppRoutes';
import {trpc} from '~app/_trpc/client';
import {companyCreationSchema} from '~validations/company';
import {Input} from '~/components/ui/input';
import {
    Form,
    FormControl,
    FormDescription,
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

type CompanyFormProps = {
    isEdit?: boolean;
    initialData?: CompanyTypeWeb;
};

const CompanyForm = ({isEdit, initialData}: CompanyFormProps) => {
    const [mainImage, setMainImage] = useState<Array<File | string>>(
        isEdit && initialData?.image ? [initialData.image] : [],
    );
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const {refetch: refetchRepresentative} = useUserCompanyRepresentatives();
    const {uploadImageToS3} = useUploadS3();
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

    async function onSubmit(values: z.infer<typeof companyCreationSchema>) {
        try {
            setIsOpen(true);
            setIsUploading(true);
            const progressInterval = startSimulatedProgress();

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
                    });
                } else {
                    await editCompany({...values});
                }
                await refetchRepresentative();
            } else {
                if (mainImage.length > 0 && typeof mainImage[0] !== 'string') {
                    const key = await uploadImageToS3(mainImage[0]);
                    await mutateAsync({...values, image: key});
                } else {
                    await mutateAsync({...values});
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
        <div className="p-4">
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
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        {isEdit && initialData?.image && mainImage.length > 0 ? (
                            typeof mainImage[0] !== 'string' ? (
                                <img
                                    className="w-[250px] h-[250px] object-cover"
                                    src={getImgBeforeUpload(mainImage[0])}
                                    onClick={() => setMainImage([])}
                                />
                            ) : (
                                <img
                                    className="w-[250px] h-[250px] object-cover"
                                    src={mainImage[0]}
                                    onClick={() => setMainImage([])}
                                />
                            )
                        ) : (
                            <AddImage
                                multiple={false}
                                onAcceptedImage={setMainImage}
                            />
                        )}
                    </div>

                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{'Nazwa firmy'}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nazwa firmy" {...field} />
                                </FormControl>
                                <FormDescription>
                                    {'This is your public display name.'}
                                </FormDescription>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="city"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{'Miasto'}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Miasto" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="phoneNumber"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Numer telefonu"}</FormLabel>
                                <FormControl>
                                    <Input placeholder="123456789" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="website"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Strona internetowa"}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="https://example.com"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="address"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Adres"}</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Ulica i numer, miasto"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="postalCode"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Kod pocztowy"}</FormLabel>
                                <FormControl>
                                    <Input placeholder="00-000" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="country"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Kraj"}</FormLabel>
                                <FormControl>
                                    <Input placeholder="Polska" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="established"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Rok założenia"}</FormLabel>
                                <FormControl>
                                    <Input
                                        type="number"
                                        min={1800}
                                        {...field}
                                        onChange={(event) =>
                                            field.onChange(+event.target.value)
                                        }
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <FormField
                        control={form.control}
                        name="type"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>{"Typ firmy"}</FormLabel>
                                <FormControl>
                                    <select {...field}>
                                        <option value="Producent">{"Producent"}</option>
                                        <option value="Factory">{"Factory"}</option>
                                        <option value="Importer">{"Importer"}</option>
                                    </select>
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">{"Submit"}</Button>
                </form>
            </Form>
        </div>
    );
};

export default CompanyForm;
