'use client';

import {PropsWithChildren, useState} from 'react';

import {Button} from '~/components/ui/button';
import {DropdownMenu, DropdownMenuTrigger} from '~/components/ui/dropdown-menu';

import AccountControl from './AccountControl';

const AccountHover = ({children}: PropsWithChildren) => {
    const [open, setOpen] = useState(false);

    return (
        <div className="flex w-full flex-col items-start justify-between rounded-md sm:flex-row sm:items-center">
            <DropdownMenu open={open} onOpenChange={setOpen}>
                <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                        {children}
                    </Button>
                </DropdownMenuTrigger>
                <AccountControl />
            </DropdownMenu>
        </div>
    );
};

export default AccountHover;
