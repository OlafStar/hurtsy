'use client';

import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import {Input} from '~/components/ui/input';
import {representativeFormSchema} from '~validations/company';
import {trpc} from '~app/_trpc/client';
import {useToast} from '~components/ui/use-toast';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';
import UploadDropzone from '../UploadDropzone';
import {useState} from 'react';
import {useUploadS3} from '~hooks/useUploadS3';
import useUserCompanyRepresentatives from '~hooks/useUserCompanyRepresentatives';
import AddImage from '~components/atoms/AddImage';
import {useRouter} from 'next/navigation';

const RepresentativeForm = () => {
    const {toast} = useToast();
    const [mainImage, setMainImage] = useState<Array<File | string>>([]);
    const {uploadImageToS3} = useUploadS3();
    const {refetch} = useUserCompanyRepresentatives();
    const router = useRouter();

    const form = useForm<z.infer<typeof representativeFormSchema>>({
        resolver: zodResolver(representativeFormSchema),
        defaultValues: {
            name: '',
            phoneNumber: '',
            email: '',
        },
    });

    const {mutateAsync} = trpc.createRepresentatives.useMutation();

    async function onSubmit(values: z.infer<typeof representativeFormSchema>) {
        try {
            if (typeof mainImage[0] !== 'string') {
                const key = await uploadImageToS3(mainImage[0]);
                const submitValues = {...values, image: key};
                await mutateAsync(submitValues);
            } else {
                const submitValues = {...values, image: mainImage[0]};
                await mutateAsync(submitValues);
            }
            await refetch();
            toast({
                title: 'Success',
                description: 'Pomyślnie stworzono przedstawiciela',
            });
            form.reset();
            setMainImage([]);
            router.refresh();
        } catch (error) {
            toast({
                title: 'Error',
                description: `Wystąpił błąd z tworzeniem przedstawiciela`,
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        {mainImage.length > 0 ? (
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
                        name="name"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Imie i nazwisko</FormLabel>
                                <FormControl>
                                    <Input
                                        placeholder="Imie i nazwisko"
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                    <FormField
                        control={form.control}
                        name="email"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Email</FormLabel>
                                <FormControl>
                                    <Input placeholder="Email" {...field} />
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
                                <FormLabel>Numer telefonu</FormLabel>
                                <FormControl>
                                    <Input placeholder="Numer telefonu" {...field} />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />

                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default RepresentativeForm;
