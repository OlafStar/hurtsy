import Link from 'next/link';

import {OffersSearchType} from '~config/offers';
import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes} from '~types/AppRoutes';
import {OfferWithRelations} from '~types/offers';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';
import {getPriceRange} from '~utils/getPriceRange';

const OfferHeader = async ({
    offer,
    type,
}: {
    offer?: OfferWithRelations;
    type: OffersSearchType;
}) => {
    console.log(type);
    if (!offer || !type) return null;

    const userCompany = await serverClient.getUserCompany();

    const {priceRange, lowestMinQuantity} = getPriceRange(offer.product.prices);

    const personToDisplay =
        userCompany?.id === offer.sender.id ? offer.receiver : offer.sender;

    return (
        <div className="flex justify-between gap-4 bg-white p-4 rounded-xl">
            <Link
                href={`${AppRoutes.WEB_PRODUCTS}/${offer.product.id}`}
                className="flex gap-4"
            >
                <img
                    className="w-[96px] aspect-square object-contain"
                    src={offer.product.mainImage}
                    alt={offer.product.name}
                />
                <div className="flex flex-col gap-2">
                    <div>{offer.product.name}</div>
                    <div>
                        {translateEnumValueToPolish(
                            offer.product.category?.mainCategory || '',
                        )}
                    </div>
                    <div className="flex flex-col">
                        <div className="text-xl font-bold">{priceRange}</div>
                        <div className="text-xs opacity-50">{`Min: ${lowestMinQuantity}`}</div>
                    </div>
                </div>
            </Link>
            <Link
                href={`${AppRoutes.WEB_COMPANIES}/${personToDisplay.id}`}
                className="flex gap-4 items-center"
            >
                <div>{personToDisplay.name}</div>
                <img
                    className="w-[64px] aspect-square object-contain"
                    src={personToDisplay.image || ''}
                    alt={personToDisplay.name}
                />
            </Link>
        </div>
    );
};

export default OfferHeader;
