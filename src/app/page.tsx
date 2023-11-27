import Footer from '~components/molecules/Footer';
import SiteNavigation from '~components/molecules/SiteNavigation';
import MainPage from '~components/organisms/Website/MainPage';

export default function Home() {
    return (
        <main className="flex min-h-screen flex-col items-center container px-4 md:px-8 lg:text-start text-center">
            <SiteNavigation />
            <MainPage />
            <div className="w-full">
                <Footer />
            </div>
        </main>
    );
}
