import Link from 'next/link';
import {redirect} from 'next/navigation';
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
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] bg-white flex-col md:flex">
                    {dashboardNavigation.map((item) => (
                        <Link key={item.label} href={item.href}>
                            {item.icon && <img />}
                            <div>{item.label}</div>
                        </Link>
                    ))}
                    <LogOutButton />
                </aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
        </div>
    );
}
