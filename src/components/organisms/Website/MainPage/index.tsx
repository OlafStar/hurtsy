import Image from 'next/image';
import Link from 'next/link';

import FAQ from '~components/molecules/FAQ';
import MainPromotedProducts from '~components/molecules/PromotedProducts/MainPromotedProducts';
import {Button} from '~components/ui/button';
import {SearchParams} from '~config/searchParams';
import {AppRoutes} from '~types/AppRoutes';
import {Category} from '~types/categories';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

const MainPage = () => {
    return (
        <div className="flex flex-col gap-16 w-full">
            <div className="h-full py-8 lg:py-28 grid grid-cols-1 grid-rows-2 w-full flex-1 items-center justify-between lg:grid-cols-2 lg:grid-rows-1 lg:items-start container px-4 md:px-8 gap-8 lg:gap-16">
                <div className="h-full flex flex-col gap-8 lg:gap-8 items-center justify-center text-center relative lg:text-left lg:items-start">
                    <div className="text-3xl lg:text-5xl font-bold max-w-[650px]">
                        {'Rozwiń Swój Biznes Dzięki Odpowiednim Partnerom'}
                    </div>
                    <div className="opacity-50 lg:max-w-[400px]">
                        {
                            'Szukaj i wystawiaj produkty, kontaktuj się z firmami, zbieraj oferty i rozwijaj swój biznes.'
                        }
                    </div>
                    <div className="flex gap-4">
                        <Link href="/login">
                            <Button>{'SPRÓBUJ ZA DARMO'}</Button>
                        </Link>
                        <Link href={AppRoutes.WEB_PRODUCTS}>
                            <Button variant="outline">{'Oferty'}</Button>
                        </Link>
                    </div>
                </div>
                <div className="flex items-center h-full">
                    <Image
                        src={'/hero-image.webp'}
                        alt={'hero-image'}
                        width={400}
                        height={400}
                        className="w-full object-contain max-w-[700px]"
                    />
                </div>
            </div>
            <div className=" container px-4 md:px-8">
                <div className="flex flex-col gap-12 bg-mainBlue overflow-hidden rounded-lg text-center items-center justify-center p-8 bg-[url('/cta.jpg')] relative bg-cover bg-center">
                    {/* Blue overlay */}
                    <div className="absolute inset-0 bg-mainBlue opacity-90"></div>

                    {/* Content */}
                    <div className="relative z-10 text-white text-xl xs:text-3xl max-w-[500px] font-bold uppercase">
                        {
                            'Chcesz zwiększyć dotarcie do klientów i pozyskać nowe oferty?'
                        }
                    </div>
                    <div className="relative z-10">
                        <Button variant="secondary">{'Spróbuj za darmo'}</Button>
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-12 container px-4 md:px-8">
                <div className="text-3xl xs:text-5xl font-bold max-w-[800px]">
                    {'Odkryj oferty dostosowane do Twoich potrzeb biznesowych'}
                </div>
                <div className="overflow-hidden relative">
                    <div className="flex gap-8 overflow-x-scroll hide-scrollbar xs:px-10">
                        {Object.entries(Category).map(([item, cat]) => (
                            <Link
                                key={item + cat}
                                href={`${AppRoutes.WEB_PRODUCTS}?${SearchParams.Category}=${cat}`}
                            >
                                <div className="w-[164px] h-[164px] border-2 border-black border-opacity-10 rounded-full flex justify-center items-center flex-col text-center gap-4 hover:border-mainBlue shadow-sm hover:bg-mainBlue hover:bg-opacity-5 transition-all p-2">
                                    <img
                                        className="h-[24px] w-auto"
                                        src={`/categories/${cat}.svg`}
                                        alt={cat}
                                    />
                                    <div className="text-sm font-medium">
                                        {translateEnumValueToPolish(cat)}
                                    </div>
                                </div>
                            </Link>
                        ))}
                    </div>
                    <div className="absolute left-0 right-0 top-0 bottom-0 pointer-events-none gradient" />
                </div>
                <MainPromotedProducts />
            </div>
            <FAQ />
        </div>
    );
};

export default MainPage;
