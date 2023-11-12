'use client';

import {signOut} from 'next-auth/react';
import {useRouter} from 'next/navigation';
import {PropsWithChildren} from 'react';

import {cn} from '~utils/shadcn';

const LogOutButton = ({
    children,
    className,
}: PropsWithChildren & {className?: string}) => {
    const router = useRouter();
    return (
        <button
            onClick={() => {
                signOut();
                router.refresh();
            }}
            className={`${
                !children && 'h-10 bg-[#3360FF] rounded-full text-sm text-white'
            } ${className && cn(className)}`}
        >
            {children ? children : 'Wyloguj'}
        </button>
    );
};

export default LogOutButton;
