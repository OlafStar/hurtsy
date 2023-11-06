import {redirect} from 'next/navigation';
import {Suspense} from 'react';
import Loader from '~components/atoms/Loader';
import DashboardNavigation from '~components/molecules/DashboardNavigation';
import {Toaster} from '~components/ui/toaster';
import {getCurrentUser} from '~lib/session';

interface DashboardLayoutLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayoutLayout({
    children,
}: DashboardLayoutLayoutProps) {
    const user = await getCurrentUser();

    if (!user) {
        return redirect('/login');
    }

    return (
        <>
            <div className="flex min-h-screen max-h-screen flex-col space-y-6 overflow-hidden">
                <div className="grid flex-1 md:grid-cols-[auto_1fr] h-full overflow-hidden">
                    <DashboardNavigation />
                    <main className="flex w-full flex-1 flex-col bg-[#ffffff] overflow-y-auto">
                        {children}
                    </main>
                </div>
            </div>
            <Toaster />
        </>
    );
}
