import {redirect} from 'next/navigation';

import Logo from '~components/atoms/Logo';
import {Button} from '~components/ui/button';
import {getCurrentUser} from '~lib/session';
import {resendActiveToken} from '~server/actions/action';

export default async function Page() {
    const user = await getCurrentUser();

    if (user?.active) {
        redirect('/dashboard');
    }

    return (
        <div className="min-h-screen flex flex-col items-center justify-center gap-4 p-4">
            <Logo />
            <div className="text-3xl font-bold text-center">
                {'Aktywuj swoje konto!'}
            </div>
            <div className="max-w-[500px] text-center">
                {
                    'Mail aktywacyjny został wysłany. Jeśli nie widzisz maila sprawdź spam lub kliknij poniżej aby wysłać go jeszcze raz'
                }
            </div>
            <form action={resendActiveToken}>
                <Button type="submit">{'Wyślij'}</Button>
            </form>
        </div>
    );
}
