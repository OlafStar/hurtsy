'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import {Button} from '~components/ui/button';
import {Form, FormControl, FormField, FormItem} from '~components/ui/form';
import {Textarea} from '~components/ui/textarea';
import {useToast} from '~components/ui/use-toast';
import {sendMessage} from '~server/actions/offersActions';
import {messageForm} from '~validations/offers';

const OfferSendMessage = ({offerId}: {offerId: string}) => {
    const {toast} = useToast();

    const form = useForm<z.infer<typeof messageForm>>({
        resolver: zodResolver(messageForm),
    });

    async function onSubmit(values: z.infer<typeof messageForm>) {
        try {
            console.log(values);
            await sendMessage(values.message, offerId);
            form.setValue('message', '');
        } catch (error) {
            toast({
                title: 'Error',
                description: `Wystąpił błąd z wysyłaniem wiadomości`,
                variant: 'destructive',
            });
        }
    }

    return (
        <Form {...form}>
            <form
                id="productForm"
                name="productForm"
                onSubmit={form.handleSubmit(onSubmit)}
                className="relative"
            >
                <FormField
                    control={form.control}
                    name="message"
                    defaultValue={undefined}
                    render={({field}) => (
                        <FormItem>
                            <FormControl>
                                <Textarea
                                    placeholder="Wyślij wiadomość."
                                    {...field}
                                    className="pr-24"
                                />
                            </FormControl>
                        </FormItem>
                    )}
                />
                <Button
                    type="submit"
                    className="absolute top-[50%] translate-y-[-50%] right-2"
                >
                    {'Wyślij'}
                </Button>
            </form>
        </Form>
    );
};

export default OfferSendMessage;
