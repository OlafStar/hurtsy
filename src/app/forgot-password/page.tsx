'use client';

import {zodResolver} from '@hookform/resolvers/zod';
import {CaretLeftIcon} from '@radix-ui/react-icons';
import {Loader2} from 'lucide-react';
import Link from 'next/link';
import {useState} from 'react';
import {useForm} from 'react-hook-form';
import {z} from 'zod';

import Logo from '~components/atoms/Logo';
import {Button} from '~components/ui/button';
import {
    Form,
    FormControl,
    FormField,
    FormItem,
    FormMessage,
} from '~components/ui/form';
import {Input} from '~components/ui/input';
import {Label} from '~components/ui/label';
import {useToast} from '~components/ui/use-toast';
import {resetPassword} from '~server/actions/action';
import {forgotPasswordSchema} from '~validations/passwords';

const Page = () => {
    const [isLoading, setIsLoading] = useState(false);

    const form = useForm<z.infer<typeof forgotPasswordSchema>>({
        resolver: zodResolver(forgotPasswordSchema),
    });

    const {toast} = useToast();

    async function onSubmit(values: z.infer<typeof forgotPasswordSchema>) {
        setIsLoading(true);

        try {
            await resetPassword(values.email);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Coś poszło nie tak',
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    }

    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center justify-center">
                    <Logo className="justify-self-center" />
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {'Zresetuj hasło'}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                <Form {...form}>
                    <form
                        id="resetPass"
                        name="resetPass"
                        onSubmit={form.handleSubmit(onSubmit)}
                        className="flex flex-col gap-4"
                    >
                        <FormField
                            control={form.control}
                            name="email"
                            defaultValue=""
                            render={({field}) => (
                                <FormItem>
                                    <Label htmlFor="email" className="text-left">
                                        {'Email'}
                                    </Label>
                                    <FormControl>
                                        <Input className="col-span-3" {...field} />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <Button type="submit" className="flex items-center">
                            {isLoading ? (
                                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                            ) : null}
                            <div>{'Resetuj hasło'}</div>
                        </Button>
                        <Link
                            href="/login"
                            className="text-sm text-neutral-700/80 flex items-center"
                        >
                            <CaretLeftIcon />
                            <span>{'Wróć do logowania'}</span>
                        </Link>
                    </form>
                </Form>
            </div>
        </div>
    );
};

export default Page;
