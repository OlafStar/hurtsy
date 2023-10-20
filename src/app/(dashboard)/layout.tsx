import {redirect} from 'next/navigation';
import DashboardNavigation from '~components/molecules/DashboardNavigation';
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
            <div className="grid flex-1 md:grid-cols-[auto_1fr]">
                <DashboardNavigation />
                <main className="flex w-full flex-1 flex-col overflow-hidden bg-[#fafafa]">
                    {children}
                </main>
            </div>
        </div>
    );
}
