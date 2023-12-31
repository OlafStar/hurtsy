import Link from 'next/link';

import {serverClient} from '~server/trpc/serverClient';
import {Avatar, AvatarFallback, AvatarImage} from '~components/ui/avatar';
import {Button} from '~components/ui/button';
import {AppRoutes} from '~types/AppRoutes';

import AccountHover from './AccountHover';

const AccountCompany = async () => {
    const company = await serverClient.getUserCompany();

    return company ? (
        <AccountHover>
            <div className="whitespace-nowrap">{company.name}</div>
            <Avatar>
                <AvatarImage src={company.image || ''} className="object-contain" />
                <AvatarFallback>
                    <img src="/company-placeholder.png" alt="company" />
                </AvatarFallback>
            </Avatar>
        </AccountHover>
    ) : (
        <>
            <Link href={AppRoutes.ADD_COMPANY}>
                <Button variant="default" className="border-[#000000] rounded-full">
                    {'Dodaj firme'}
                </Button>
            </Link>
        </>
    );
};

export default AccountCompany;
