import SiteNavigation from '~components/molecules/SiteNavigation';

interface DashboardLayoutLayoutProps {
    children: React.ReactNode;
}

export default async function MainLayout({children}: DashboardLayoutLayoutProps) {
    return (
        <main className="flex min-h-screen flex-col container">
            <SiteNavigation />
            {children}
        </main>
    );
}
