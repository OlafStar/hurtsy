import {redirect} from 'next/navigation';
import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import {dashboardNavigation} from '~config/dashboard';
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
        <div className="flex min-h-screen flex-col space-y-6">
            <div className="container grid flex-1 md:grid-cols-[auto_1fr]">
                <aside className="hidden px-6 bg-white justify-between flex-col md:flex">
                    <div className="gap-4 flex-col md:flex">
                        {dashboardNavigation.map((item) => (
                            <DashboardPageLink key={item.label} {...item} />
                        ))}
                    </div>
                    <LogOutButton />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
