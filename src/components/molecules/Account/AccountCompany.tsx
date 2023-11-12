import Link from 'next/link';
import {User} from 'lucide-react';

import {serverClient} from '~server/trpc/serverClient';
import {Avatar, AvatarFallback, AvatarImage} from '~components/ui/avatar';
import {Button} from '~components/ui/button';
import {AppRoutes} from '~types/AppRoutes';

import AccountHover from './AccountHover';


const AccountCompany = async () => {
    const company = await serverClient.getUserCompany();

    return company ? (
        <AccountHover>
            <Avatar>
                <AvatarImage src={company.image || ''} className="object-contain" />
                <AvatarFallback>
                    <User />
                </AvatarFallback>
            </Avatar>
            <div>{company.name}</div>
        </AccountHover>
    ) : (
        <>
            <Link href={AppRoutes.ADD_COMPANY}>
                <Button
                    variant="secondary"
                    className="border-[#000000] rounded-full"
                >
                    {'Dodaj firme'}
                </Button>
            </Link>
        </>
    );
};

export default AccountCompany;
