import {Offer, Message} from '@prisma/client';

import {ProductWeb} from './products';
import {CompanyTypeWeb} from './company';

export type OfferWithRelations = Offer & {
    product: ProductWeb;
    receiver: CompanyTypeWeb;
    sender: CompanyTypeWeb;
    messages: Message;
};

export type UserOffers = {
    sendOffers: OfferWithRelations[];
    recivedOffers: OfferWithRelations[];
};
