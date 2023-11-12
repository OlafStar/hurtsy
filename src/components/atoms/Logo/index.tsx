/* eslint-disable camelcase */
import {Baloo_Thambi_2} from 'next/font/google';
import Link from 'next/link';

import {PropsWithClassName} from '~types/generalTypes';
import {cn} from '~utils/shadcn';

const balo = Baloo_Thambi_2({subsets: ['latin']});

const Logo = ({className}: PropsWithClassName) => {
    return (
        <Link href="/">
            <div
                className={`${balo.className} ${cn(
                    className,
                )} font-bold text-logo text-mainBlue`}
            >
                {'Hurtsy'}
            </div>
        </Link>
    );
};

export default Logo;
