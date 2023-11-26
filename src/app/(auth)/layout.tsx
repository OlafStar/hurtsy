import {redirect} from 'next/navigation';

import {getCurrentUser} from '~lib/session';
import {AppRoutes} from '~types/AppRoutes';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({children}: AuthLayoutProps) {
    const user = await getCurrentUser();

    if (user) {
        return redirect(AppRoutes.ADD_COMPANY);
    }
    return <div className="min-h-screen">{children}</div>;
}
