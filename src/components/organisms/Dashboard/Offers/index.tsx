import {Suspense} from 'react';

import OfferContainer from '~components/molecules/OfferContainer';
import OffersMenu from '~components/molecules/OffersMenu';
import {OffersSearchType} from '~config/offers';
import {serverClient} from '~server/trpc/serverClient';
import {PropsWithParams} from '~types/generalTypes';

const Offers = async ({searchParams}: PropsWithParams) => {
    const offers = await serverClient.getUserOffers();

    const allOffers = [...offers.recivedOffers, ...offers.sendOffers];

    return (
        <div className="flex min-h-[100vh]">
            <OffersMenu {...offers} type={searchParams?.os as OffersSearchType} />
            <Suspense fallback={<div>{'loading'}</div>}>
                <OfferContainer
                    offer={allOffers.find((item) => item.id === searchParams?.oid)}
                    type={searchParams?.os as OffersSearchType}
                />
            </Suspense>
        </div>
    );
};

export default Offers;
