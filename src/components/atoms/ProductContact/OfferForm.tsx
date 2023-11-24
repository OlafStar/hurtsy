'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {useEffect} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';
import {getTRPCErrorFromUnknown} from '@trpc/server';

import {Input} from '~/components/ui/input';
import {Label} from '~/components/ui/label';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '~components/ui/form';
import {Textarea} from '~components/ui/textarea';
import {useToast} from '~components/ui/use-toast';
import {createOffer} from '~server/actions/offersActions';
import {ProductWeb} from '~types/products';
import {offerFormSchema} from '~validations/offers';

import NumberInput from '../NumberInput';

const OfferForm = ({
    email,
    id,
    name,
    mainImage,
    formId,
    formName,
}: ProductWeb & {email?: string; formId: string; formName: string}) => {
    const form = useForm<z.infer<typeof offerFormSchema>>({
        resolver: zodResolver(offerFormSchema),
    });

    const {toast} = useToast();

    useEffect(() => {
        if (email) {
            form.setValue('email', email);
        }
    }, [email]);

    async function onSubmit(values: z.infer<typeof offerFormSchema>) {
        try {
            await createOffer(id, values.message, values.quantity);

            toast({
                title: 'Success',
                description: `Oferta została wysłana`,
            });
        } catch (error) {
            const trpcError = getTRPCErrorFromUnknown(error);
            toast({
                title: 'Error',
                description: trpcError.message,
                variant: 'destructive',
            });
        }
    }
    return (
        <Form {...form}>
            <form
                id={formId}
                name={formName}
                onSubmit={form.handleSubmit(onSubmit)}
                className="flex flex-col gap-4"
            >
                <div className="flex gap-4 items-center">
                    <img
                        src={mainImage}
                        className="w-12 aspect-square object-contain"
                    />
                    <div className="text-xs">{name}</div>
                </div>
                <div className="flex gap-2">
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="email"
                            defaultValue={email || ''}
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="email" className="text-left">
                                        {'Email'}
                                    </Label>
                                    <FormControl>
                                        <Input
                                            className="col-span-3 h-6 text-xs"
                                            defaultValue={email}
                                            disabled={email ? true : false}
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                    <div className="flex-1">
                        <FormField
                            control={form.control}
                            name="quantity"
                            defaultValue={undefined}
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="quantity" className="text-left">
                                        {'Liczba produktów'}
                                    </Label>
                                    <FormControl>
                                        <NumberInput
                                            className="col-span-3 h-6 text-xs"
                                            {...field}
                                            field="quantity"
                                            type="int"
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                    </div>
                </div>
                <div>
                    <FormField
                        control={form.control}
                        name="message"
                        defaultValue={undefined}
                        render={({field}) => (
                            <FormItem>
                                <Label htmlFor="message" className="text-left">
                                    {'Wiadomość'}
                                </Label>
                                <FormControl>
                                    <Textarea
                                        placeholder="Wprowadź tutaj wszystkie informacje na temat produktu oraz swoją wiadomość."
                                        {...field}
                                    />
                                </FormControl>
                                <FormMessage />
                            </FormItem>
                        )}
                    />
                </div>
            </form>
        </Form>
    );
};

export default OfferForm;
