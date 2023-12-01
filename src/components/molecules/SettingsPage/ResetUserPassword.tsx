'use client';
import {Loader2} from 'lucide-react';
import {useState} from 'react';
import {useForm} from 'react-hook-form';

import {Button} from '~components/ui/button';
import {Form} from '~components/ui/form';
import {useToast} from '~components/ui/use-toast';
import {resetCurrentUserPassword} from '~server/actions/action';

const ResetUserPassword = () => {
    const [isResetSend, setIsResetSend] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const form = useForm();

    const {toast} = useToast();

    const onSubmit = async () => {
        setIsLoading(true);
        try {
            await resetCurrentUserPassword();
            toast({
                title: 'Succes',
                description: 'Link resetujący hasło został wysłany',
            });
            setIsResetSend(true);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Wystąpił błąd',
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    };
    return (
        <Form {...form}>
            <form
                id="resetUserPass"
                name="resetUserPass"
                onSubmit={form.handleSubmit(onSubmit)}
            >
                <div className="flex flex-row items-center justify-between rounded-lg border p-4 gap-4">
                    <div className="space-y-0.5">
                        <div className="text-base font-medium">{'Zmień hasło'}</div>
                        <div className='text-sm text-muted-foreground'>
                            {
                                'Kliknij aby wysłać link pozwalający zmienić swoje hasło'
                            }
                        </div>
                    </div>
                    <div>
                        <Button
                            type="submit"
                            className={`flex ${isResetSend && 'bg-green-600'}`}
                            disabled={isResetSend}
                        >
                            {isLoading ? (
                                <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                            ) : null}
                            <div>
                                {isResetSend ? 'Sprawdź email' : 'Resetuj hasło'}
                            </div>
                        </Button>
                    </div>
                </div>
            </form>
        </Form>
    );
};
export default ResetUserPassword;
