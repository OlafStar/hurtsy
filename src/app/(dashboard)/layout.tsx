import {signOut} from 'next-auth/react';
import {notFound} from 'next/navigation';
import {useEffect} from 'react';
import {getCurrentUser} from '~lib/session';

interface DashboardLayoutLayoutProps {
    children: React.ReactNode;
}

export default async function DashboardLayoutLayout({
    children,
}: DashboardLayoutLayoutProps) {
    const user = await getCurrentUser();

    if (!user) {
        return notFound();
    }
    return (
        <div className="flex min-h-screen flex-col space-y-6">
            <header className="sticky top-0 z-40 border-b bg-background">
                <div className="container flex h-16 items-center justify-between py-4">
                    Test
                </div>
            </header>
            <div className="container grid flex-1 gap-12 md:grid-cols-[200px_1fr]">
                <aside className="hidden w-[200px] flex-col md:flex">Nav</aside>
                <main className="flex w-full flex-1 flex-col overflow-hidden">
                    {children}
                </main>
            </div>
            Footer
        </div>
    );
}
