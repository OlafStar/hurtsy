import Link from 'next/link';
import {Button} from '~components/ui/button';
import Logo from '~components/atoms/Logo';
import SearchBar from '../SearchBar';

const SiteNavigation = () => {
    return (
        <div className="w-full flex flex-col pt-4 gap-4">
            <div className="flex justify-between items-center">
                <Logo />
                <SearchBar />
                <div className="flex gap-4">
                    <Link href="/login">
                        <Button
                            variant="outline"
                            className="border-[#000000] rounded-full"
                        >
                            {'Zaloguj'}
                        </Button>
                    </Link>
                    <Link href="/register">
                        <Button className="rounded-full">{'Dodaj firme'}</Button>
                    </Link>
                </div>
            </div>
            <div className="w-full bg-black h-[1px] opacity-50" />
            <div className="flex justify-between items-center gap-4">
                <div className='w-[97.25px]'>
                    <div>{'Kategorie'}</div>
                </div>
                <div className="w-full max-w-[700px] flex gap-6">
                    <Link href="/login">{'Najlepsze hurtownie'}</Link>
                    <Link href="/login">{'Najlepsze produkty'}</Link>
                </div>
                <div className="flex gap-6">
                    <Link href="/login">{'Cennik'}</Link>
                    <Link href="/register">{'Kontakt'}</Link>
                    <Link href="/register">{'Pomoc'}</Link>
                </div>
            </div>
        </div>
    );
};

export default SiteNavigation;
