import {OfferWithRelations} from '~types/offers';
import {OffersSearchType} from '~config/offers';
import {serverClient} from '~server/trpc/serverClient';

import OfferHeader from './OfferHeader';
import OfferSendMessage from './OfferSendMessage';

const OfferContainer = async ({
    offer,
    type,
}: {
    offer?: OfferWithRelations;
    type: OffersSearchType;
}) => {
    if (!offer) {
        return (
            <div className="flex-1 flex justify-center items-center">
                <div>{'Wybierz wiadomość'}</div>
            </div>
        );
    }

    if (!offer.product || !offer.receiver || !offer.sender) {
        return <div>{'Przykro nam. Coś nie tak z tą wiadomością'}</div>;
    }

    const userCompany = await serverClient.getUserCompany();

    const isReciver = userCompany?.id === offer.receiverId;

    const messages = await serverClient.getOfferMessages(offer.id);

    return (
        <div className="flex flex-col gap-2 flex-1 bg-[#f5f5f5] p-2">
            <OfferHeader offer={offer} type={type} />
            <div className="flex h-full bg-white p-4 rounded-xl w-full">
                <div className="flex-1 flex flex-col gap-4">
                    <div className={`${!isReciver && 'justify-end'} flex`}>
                        <div
                            className={`${
                                !isReciver
                                    ? 'bg-mainBlue text-white'
                                    : 'bg-[#fafafa]'
                            } w-fit p-3 rounded-xl`}
                        >
                            {offer.message}
                        </div>
                    </div>
                    {messages.map((item, index) => (
                        <div
                            key={index}
                            className={`${
                                item.senderCompanyId === userCompany?.id &&
                                'justify-end'
                            } flex`}
                        >
                            <div
                                className={`${
                                    item.senderCompanyId === userCompany?.id
                                        ? 'bg-mainBlue text-white'
                                        : 'bg-[#fafafa]'
                                } w-fit p-3 rounded-xl`}
                            >
                                {item.content}
                            </div>
                        </div>
                    ))}
                </div>
            </div>
            <div>
                <OfferSendMessage offerId={offer.id} />
            </div>
        </div>
    );
};

export default OfferContainer;
