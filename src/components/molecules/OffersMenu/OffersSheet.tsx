import {PropsWithChildren} from 'react';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/components/ui/sheet';
import {UserOffers} from '~types/offers';
import {OffersSearchType} from '~config/offers';

import OffersMenu from '.';

const OffersSheet = async ({
    children,
    sendOffers,
    recivedOffers,
    type,
}: PropsWithChildren & UserOffers & {type: OffersSearchType}) => {
    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent
                side="left"
                className="h-max-[100vh] overflow-y-scroll"
            >
                <SheetHeader className="text-left h-full gap-8">
                    <SheetTitle>{'Oferty'}</SheetTitle>
                    <OffersMenu {...{sendOffers, recivedOffers, type}} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default OffersSheet;
