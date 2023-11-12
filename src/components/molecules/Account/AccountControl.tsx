import {Box, LogOut, PackagePlus, User} from 'lucide-react';
import Link from 'next/link';

import {
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
} from '~/components/ui/dropdown-menu';
import {AppRoutes} from '~types/AppRoutes';
import LogOutButton from '~components/atoms/LogOutButton';

const AccountControl = () => {
    return (
        <DropdownMenuContent align="end" className="w-[200px]">
            <DropdownMenuLabel>{'Akcje'}</DropdownMenuLabel>
            <DropdownMenuGroup>
                <DropdownMenuItem>
                    <Link className="flex" href={AppRoutes.YOUR_COMPANY}>
                        <User className="mr-2 h-4 w-4" />
                        {'Firma'}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuItem>
                    <Link className="flex" href={AppRoutes.PRODUCTS}>
                        <Box className="mr-2 h-4 w-4" />
                        {'Produkty'}
                    </Link>
                </DropdownMenuItem>

                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-mainBlue">
                    <Link className="flex" href={AppRoutes.ADD_PRODUCT}>
                        <PackagePlus className="mr-2 h-4 w-4" />
                        {'Dodaj produkt'}
                    </Link>
                </DropdownMenuItem>
                <DropdownMenuSeparator />
                <DropdownMenuItem className="text-red-600">
                    <LogOutButton className="flex">
                        <LogOut className="mr-2 h-4 w-4" />
                        {"Wyloguj"}
                    </LogOutButton>
                </DropdownMenuItem>
            </DropdownMenuGroup>
        </DropdownMenuContent>
    );
};

export default AccountControl;
