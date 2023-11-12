'use client';

import {useRouter} from 'next/navigation';

import {Button} from '~components/ui/button';

type ButtonLinkProps = {
    href: string;
};

const ButtonLink = ({href}: ButtonLinkProps) => {
    const router = useRouter();
    return (
        <Button
            onClick={() => {
                router.push(href);
            }}
        >
            {'Dodaj produkt'}
        </Button>
    );
};

export default ButtonLink;
