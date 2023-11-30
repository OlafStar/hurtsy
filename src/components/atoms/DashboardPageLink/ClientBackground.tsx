'use client';

import {usePathname} from 'next/navigation';

import {DashboardRoutes} from '~types/AppRoutes';
import { trimPathname } from '~utils/trimPathname';

type ClientBackgroundProps = {
    children: React.ReactNode;
    href: DashboardRoutes;
};

const ClientBackground = ({children, href}: ClientBackgroundProps) => {
    const pathname = usePathname();
    const trimmedPathname = trimPathname(pathname, DashboardRoutes);
    const isActive = href == trimmedPathname;
    const activeClass = isActive
        ? 'bg-[rgba(217,217,217,0.2)] rounded-full font-bold'
        : '';

    return (
        <div
            className={`w-full lg:w-48 h-10 px-4 flex gap-4 items-center justify-start ${activeClass}`}
        >
            {children}
        </div>
    );
};

export default ClientBackground;
