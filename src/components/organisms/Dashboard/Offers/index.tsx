import {Suspense} from 'react';

import OfferContainer from '~components/molecules/OfferContainer';
import OffersMenu from '~components/molecules/OffersMenu';
import {serverClient} from '~server/trpc/serverClient';

const Offers = async ({id}: {id?: string}) => {
    const offers = await serverClient.getUserOffers();

    const allOffers = [...offers.recivedOffers, ...offers.sendOffers];

    return (
        <div className='flex gap-8 p-4'>
            <OffersMenu {...offers} />
            <Suspense fallback={<div>{'loading'}</div>}>
                <OfferContainer offer={allOffers.find((item) => item.id === id)} />
            </Suspense>
        </div>
    );
};

export default Offers;
