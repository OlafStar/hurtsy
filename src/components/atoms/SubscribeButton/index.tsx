'use client';

import {trpc} from '~app/_trpc/client';
import {Button} from '~components/ui/button';

type SubscribeButtonProps = {
    name: string;
    plan: string;
};

const SubscribeButton = ({name, plan}: SubscribeButtonProps) => {
    const {mutate: createStripeSession} = trpc.createStripeSession.useMutation({
        onSuccess: ({url}) => {
            window.location.href = url ?? '/pricing';
        },
    });

    return (
        <Button
            onClick={() => {
                createStripeSession(plan);
            }}
            variant={name === 'Premium' ? 'default' : 'outline'}
            className={
                name === 'Premium'
                    ? 'bg-mainBlue'
                    : 'border-mainBlue text-mainBlue border-opacity-30'
            }
        >
            {'Wybierz plan'}
        </Button>
    );
};

export default SubscribeButton;
