import Link from 'next/link';

import Logo from '~components/atoms/Logo';
import {Button} from '~components/ui/button';

const Page = () => {
    return (
        <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
            <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                <div className="flex items-center justify-center">
                    <Logo className="justify-self-center" />
                </div>
                <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                    {'Ustaw nowe hasło'}
                </h2>
            </div>

            <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm flex flex-col gap-4">
                <div>
                    {
                        'Pomyślnie zmieniono hasło. Zaloguj się klikając przycisk poniżej.'
                    }
                </div>
                <Link
                    href="/login"
                    className="text-sm text-neutral-700/80 flex items-center"
                >
                    <Button type="button" className="w-full">
                        {'Zaloguj'}
                    </Button>
                </Link>
            </div>
        </div>
    );
};

export default Page;
