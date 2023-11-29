import Logo from '~components/atoms/Logo';

import SearchBar from '../SearchBar';
import Account from '../Account';

import {NavigationMenuDemo} from './NavigationMenu';

const SiteNavigation = () => {
    return (
        <div className="w-full flex flex-col pt-4 container px-4 md:px-8">
            <div className="flex flex-col gap-4">
                <div className="flex justify-between items-center md:px-4 md:gap-4">
                    <Logo />
                    <SearchBar className="hidden md:flex" />
                    <Account />
                </div>
                <SearchBar className="flex md:hidden" />
                <div className="w-full bg-black h-[1px] opacity-50" />
            </div>
            <div>
                <NavigationMenuDemo />
            </div>
        </div>
    );
};

export default SiteNavigation;
