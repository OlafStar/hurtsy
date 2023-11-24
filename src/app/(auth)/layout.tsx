import {redirect} from 'next/navigation';

import {getCurrentUser} from '~lib/session';
import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes} from '~types/AppRoutes';

interface AuthLayoutProps {
    children: React.ReactNode;
}

export default async function AuthLayout({children}: AuthLayoutProps) {
    const user = await getCurrentUser();
    const company = await serverClient.getUserCompany();

    if (user) {
        if (company) {
            return redirect(AppRoutes.YOUR_COMPANY);
        }
        return redirect(AppRoutes.ADD_COMPANY);
    }
    return <div className="min-h-screen">{children}</div>;
}
