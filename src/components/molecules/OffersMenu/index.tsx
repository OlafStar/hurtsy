import Link from 'next/link';

import {AppRoutes} from '~types/AppRoutes';
import {UserOffers} from '~types/offers';

const OffersMenu = ({sendOffers}: UserOffers) => {
    return (
        <div className='flex flex-col'>
            {sendOffers.map((item, index) => (
                <Link href={`${AppRoutes.OFFERS}/${item.id}`} key={index}>
                    {item.id}
                </Link>
            ))}
        </div>
    );
};

export default OffersMenu;
