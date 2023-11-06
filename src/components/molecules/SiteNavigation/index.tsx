import Link from 'next/link';
import Logo from '~components/atoms/Logo';
import SearchBar from '../SearchBar';
import Account from '../Account';
import {NavigationMenuDemo} from './NavigationMenu';

const SiteNavigation = () => {
    return (
        <div className="w-full flex flex-col pt-4">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center px-4">
                    <Logo />
                    <SearchBar />
                    <Account />
                </div>
                <div className="w-full bg-black h-[1px] opacity-50" />
            </div>
            <div>
                <NavigationMenuDemo />
            </div>
        </div>
    );
};

export default SiteNavigation;
