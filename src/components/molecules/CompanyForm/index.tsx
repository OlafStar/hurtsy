'use client';

import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {Button} from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~/components/ui/form';
import {Input} from '~/components/ui/input';
import {companyCreationSchema} from '~validations/company';
import {trpc} from '~app/_trpc/client';

const CompanyForm = () => {
    const form = useForm<z.infer<typeof companyCreationSchema>>({
        resolver: zodResolver(companyCreationSchema),
        defaultValues: {
            companyName: '',
            city: '',
            phoneNumber: '',
        },
    });

    const createCompanyMutation = trpc.createCompany.useMutation();

    async function onSubmit(values: z.infer<typeof companyCreationSchema>) {
        try {
            const response = await createCompanyMutation.mutateAsync(values);

            console.log('Company created:', response);
            form.reset();
        } catch (error) {
            console.error('Error creating company:', error);
        }
    }

    return (
        <div>
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <FormField
                        control={form.control}
                        name="companyName"
                        render={({field}) => (
                            <FormItem>
                                <FormLabel>Nazwa firmy</FormLabel>
                                <FormControl>
                                    <Input placeholder="Nazwa firmy" {...field} />
                                </FormControl>
                                <FormDescription>
                                    This is your public display name.
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
                                <FormLabel>Miasto</FormLabel>
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
                                <FormLabel>Numer telefonu</FormLabel>
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
                                <FormLabel>Strona internetowa</FormLabel>
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
                                <FormLabel>Adres</FormLabel>
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
                                <FormLabel>Kod pocztowy</FormLabel>
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
                                <FormLabel>Kraj</FormLabel>
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
                                <FormLabel>Rok założenia</FormLabel>
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
                                <FormLabel>Typ firmy</FormLabel>
                                <FormControl>
                                    <select {...field}>
                                        <option value="Producent">Producent</option>
                                        <option value="Factory">Factory</option>
                                        <option value="Importer">Importer</option>
                                    </select>
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

export default CompanyForm;
