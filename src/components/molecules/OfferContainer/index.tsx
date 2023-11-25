import {OfferWithRelations} from '~types/offers';
import {ProductWeb} from '~types/products';

import ProductPageInfo from '../ProductPageInfo';

const OfferContainer = ({offer}: {offer?: OfferWithRelations}) => {
    if (!offer) {
        return <div>{'Wybierz wiadomość'}</div>;
    }

    if (!offer.product || !offer.receiver || !offer.sender) {
        return <div>{'Przykro nam. Coś nie tak z tą wiadomością'}</div>;
    }

    return (
        <div className="flex flex-col gap-8">
            <div>
                <img
                    className="w-[96px] aspect-square object-contain"
                    src={offer.product.mainImage}
                    alt={offer.product.name}
                />
            </div>
            <div>{offer.message}</div>
        </div>
    );
};

export default OfferContainer;
