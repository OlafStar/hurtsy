'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import * as z from 'zod';

import {Button} from '~/components/ui/button';
import {
    Form,
    FormControl,
    FormDescription,
    FormField,
    FormItem,
    FormLabel,
} from '~/components/ui/form';
import {Switch} from '~/components/ui/switch';
import {toast} from '~/components/ui/use-toast';

const FormSchema = z.object({
    offer_emails: z.boolean().default(false).optional(),
    message_emails: z.boolean().default(false).optional(),
    security_emails: z.boolean(),
});

const NotificationSettings = () => {
    const form = useForm<z.infer<typeof FormSchema>>({
        resolver: zodResolver(FormSchema),
        defaultValues: {
            security_emails: true,
        },
    });

    function onSubmit(data: z.infer<typeof FormSchema>) {
        toast({
            title: 'You submitted the following values:',
            description: (
                <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
                    <code className="text-white">
                        {JSON.stringify(data, null, 2)}
                    </code>
                </pre>
            ),
        });
    }

    return (
        <Form {...form}>
            <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="w-full space-y-6"
            >
                <div>
                    <div className="space-y-4">
                        <FormField
                            control={form.control}
                            name="offer_emails"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {'Nowe oferty'}
                                        </FormLabel>
                                        <FormDescription>
                                            {
                                                'Otrzymuj powiadomienia email kiedy dostaniesz nową ofertę'
                                            }
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="message_emails"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {'Nowe wiadomości'}
                                        </FormLabel>
                                        <FormDescription>
                                            {
                                                'Otrzymuj powiadomienia email kiedy użytkownik wyśle ci wiadomość  w Hurtsy.'
                                            }
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="security_emails"
                            render={({field}) => (
                                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                                    <div className="space-y-0.5">
                                        <FormLabel className="text-base">
                                            {'Bezpieczeństwo'}
                                        </FormLabel>
                                        <FormDescription>
                                            {
                                                'Otrzymuj maile związane z edytowaniem twojego konta'
                                            }
                                        </FormDescription>
                                    </div>
                                    <FormControl>
                                        <Switch
                                            checked={field.value}
                                            onCheckedChange={field.onChange}
                                            disabled
                                            aria-readonly
                                        />
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <Button type="submit">Submit</Button>
            </form>
        </Form>
    );
};

export default NotificationSettings;
