import Link from 'next/link';

import {Button} from '~components/ui/button';
import {getCurrentUser} from '~lib/session';

import AccountCompany from './AccountCompany';

const Account = async () => {
    const user = await getCurrentUser();

    return (
        <div className={`flex gap-4 items-center`}>
            {user ? (
                <AccountCompany />
            ) : (
                <>
                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="border-[#000000] rounded-full"
                        >
                            {'Zaloguj'}
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-full">{'Dodaj firme'}</Button>
                    </Link>
                </>
            )}
        </div>
    );
};

export default Account;
