import Link from 'next/link';
import Image from 'next/image';

import {DashboardRoutes} from '~types/AppRoutes';
import {cn} from '~utils/shadcn';

import ClientBackground from './ClientBackground';

type DashboardPageLinkProps = {
    icon?: any;
    href: DashboardRoutes;
    label: string;
    classname?: string;
};

const DashboardPageLink = ({
    icon,
    href,
    label,
    classname,
}: DashboardPageLinkProps) => {
    return (
        <Link href={href} className={`${cn(classname)}`}>
            <ClientBackground href={href}>
                {icon && (
                    <Image
                        src={icon.src}
                        width={icon.width}
                        height={icon.height}
                        alt={label}
                    />
                )}
                <div className="flex items-center flex-grow text-sm">{label}</div>
            </ClientBackground>
        </Link>
    );
};

export default DashboardPageLink;
