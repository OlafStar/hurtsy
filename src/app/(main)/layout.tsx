import SiteNavigation from '~components/molecules/SiteNavigation';
import {Toaster} from '~components/ui/toaster';

interface DashboardLayoutLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({children}: DashboardLayoutLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col container px-4 md:px-8 ">
            <SiteNavigation />
            {children}
            <Toaster />
        </main>
    );
}
