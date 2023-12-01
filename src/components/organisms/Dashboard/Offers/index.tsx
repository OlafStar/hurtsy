import {Loader2} from 'lucide-react';
import {Suspense} from 'react';

import OfferContainer from '~components/molecules/OfferContainer';
import OffersMenu from '~components/molecules/OffersMenu';
import OffersSheet from '~components/molecules/OffersMenu/OffersSheet';
import {OffersSearchType} from '~config/offers';
import {serverClient} from '~server/trpc/serverClient';
import {PropsWithParams} from '~types/generalTypes';

const Offers = async ({searchParams}: PropsWithParams) => {
    const offers = await serverClient.getUserOffers();

    const allOffers = [...offers.recivedOffers, ...offers.sendOffers];

    return (
        <div className="flex min-h-[100vh] flex-col lg:flex-row">
            <OffersMenu
                className="hidden lg:flex"
                {...offers}
                type={searchParams?.os as OffersSearchType}
            />
            <div className="flex lg:hidden border-t-black border-t border-opacity-10 py-2">
                <OffersSheet {...offers} type={searchParams?.os as OffersSearchType}>
                    {'Zobacz oferty'}
                </OffersSheet>
            </div>
            <Suspense
                fallback={
                    <div className="flex-1 flex justify-center items-center">
                        <Loader2 className="mr-4 h-4 w-4 animate-spin bg-mainBlue" />
                    </div>
                }
            >
                <OfferContainer
                    offer={allOffers.find((item) => item.id === searchParams?.oid)}
                    type={searchParams?.os as OffersSearchType}
                />
            </Suspense>
        </div>
    );
};

export default Offers;
