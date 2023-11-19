import Image from 'next/image';

import FAQ from '~components/molecules/FAQ';
import MainPromotedProducts from '~components/molecules/PromotedProducts/MainPromotedProducts';
import SearchBar from '~components/molecules/SearchBar';

const MainPage = () => {
    return (
        <div className="flex flex-col gap-16">
            <div className="min-h-[700px] grid grid-cols-1 lg:grid-cols-2 grid-rows-2 w-full flex-1 items-center justify-between">
                <div className="h-full flex flex-col gap-8 lg:gap-4 justify-center">
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
                <Image
                    src={'/hero-image.webp'}
                    alt={'hero-image'}
                    width={500}
                    height={200}
                    className="lg:row-span-2 justify-self-end"
                />
            </div>
            <MainPromotedProducts />
            <FAQ />
        </div>
    );
};

export default MainPage;
