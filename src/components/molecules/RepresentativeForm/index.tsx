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

const RepresentativeForm = () => {
    const {toast} = useToast();
    const [mainImage, setMainImage] = useState<File[]>([]);
    const {uploadImageToS3} = useUploadS3();
    const {refetch} = useUserCompanyRepresentatives();

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
        console.log(values);
        try {
            const key = await uploadImageToS3(mainImage[0]);
            const submitValues = {...values, image: key};
            const response = await mutateAsync(submitValues);
            await refetch();
            console.log('Representative created:', response);
            toast({
                title: 'Success',
                description: 'Representative has been created',
            });
            form.reset();
        } catch (error) {
            console.error('Error creating representative:', error);
        }
    }

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div>
                        {mainImage.length === 0 && (
                            <UploadDropzone
                                multiple={false}
                                setAcceptedImages={setMainImage}
                                className="w-[250px] h-[250px]"
                            />
                        )}

                        {mainImage.map((item, index) => (
                            <img
                                key={index}
                                className="w-[250px] h-[250px] object-cover"
                                src={getImgBeforeUpload(item)}
                            />
                        ))}
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
