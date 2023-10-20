import Link from 'next/link';
import {DashboardRoutes} from '~types/AppRoutes';
import ClientBackground from './ClientBackground';
import Image from 'next/image';

type DashboardPageLinkProps = {
    icon?: any;
    href: DashboardRoutes;
    label: string;
};

const DashboardPageLink = ({icon, href, label}: DashboardPageLinkProps) => {
    return (
        <Link href={href}>
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
