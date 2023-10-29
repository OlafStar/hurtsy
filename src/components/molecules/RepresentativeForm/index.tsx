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
import useCompanyRepresentatives from '~hooks/useCompanyRepresentatives';
import {useUserCompany} from '~hooks/useUserCompany';
import {useToast} from '~components/ui/use-toast';

const RepresentativeForm = () => {
    const {company} = useUserCompany();
    const {refetch} = useCompanyRepresentatives(company?.id || '');
    const {toast} = useToast();

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
            const submitValues = {companyId: company?.id || '', ...values};
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
