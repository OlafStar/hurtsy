import FAQ from '~components/molecules/FAQ';
import MainPromotedProducts from '~components/molecules/PromotedProducts/MainPromotedProducts';
import SearchBar from '~components/molecules/SearchBar';

const MainPage = () => {
    return (
        <div className="flex flex-col gap-16 w-full">
            <div className="min-h-[700px] grid grid-cols-1 grid-rows-2 w-full flex-1 items-center justify-between">
                <div className="h-full flex flex-col gap-8 lg:gap-8 items-center justify-center text-center relative">
                    <div className="text-3xl md:text-5xl font-bold max-w-[650px]">
                        {'Rozwiń Swój Biznes Dzięki Odpowiednim Partnerom'}
                    </div>
                    <div className="opacity-50 lg:max-w-[400px]">
                        {
                            'Szukaj i wystawiaj produkty, kontaktuj się z firmami, zbieraj oferty i rozwijaj swój biznes.'
                        }
                    </div>
                    <SearchBar />
                </div>
            </div>
            <MainPromotedProducts />
            <FAQ />
        </div>
    );
};

export default MainPage;
