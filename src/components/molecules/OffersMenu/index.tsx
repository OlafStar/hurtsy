import React from 'react';

import {UserOffers} from '~types/offers';
import {OffersSearchType} from '~config/offers';
import {PropsWithClassName} from '~types/generalTypes';
import {cn} from '~utils/shadcn';

import OfferLink from './OfferLink';
import ChangeOffers from './ChangeOffers';

const OffersMenu = ({
    sendOffers,
    recivedOffers,
    type,
    className,
}: UserOffers & {type: OffersSearchType} & PropsWithClassName) => {
    return (
        <div className={`flex flex-col w-full lg:w-[300px] gap-8 ${cn(className)}`}>
            <ChangeOffers />

            {type === OffersSearchType.Recived && recivedOffers.length === 0 ? (
                <div className="flex-1 flex justify-center items-center text-center opacity-50">
                    <div className="max-w-[150px]">
                        {'Jeszcze nie otrzymałeś żadnej oferty'}
                    </div>
                </div>
            ) : type === OffersSearchType.Send && sendOffers.length === 0 ? (
                <div className="flex-1 flex justify-center items-center text-center opacity-50">
                    <div className="max-w-[150px]">
                        {'Jeszcze nie otrzymałeś żadnej oferty'}
                    </div>
                </div>
            ) : (
                <div className="flex flex-col gap-4 ">
                    {type === OffersSearchType.Recived &&
                        recivedOffers.map((item, index) => (
                            <React.Fragment key={index}>
                                <OfferLink id={item.id}>
                                    <div className="flex gap-4">
                                        <img
                                            className="w-[48px] aspect-square object-contain"
                                            src={item.product.mainImage}
                                            alt={item.product.name}
                                        />
                                        <div className="line-clamp-2 text-sm">
                                            {item.product.name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-50">
                                            {'Wysłano do:'}
                                        </div>
                                        <div className="text-sm">
                                            {item.sender.name}
                                        </div>
                                    </div>
                                </OfferLink>
                                {index < recivedOffers.length - 1 && (
                                    <div className="w-full h-[1px] bg-black opacity-10" />
                                )}
                            </React.Fragment>
                        ))}
                    {type === OffersSearchType.Send &&
                        sendOffers.map((item, index) => (
                            <React.Fragment key={index}>
                                <OfferLink id={item.id}>
                                    <div className="flex gap-4">
                                        <img
                                            className="w-[48px] aspect-square object-contain"
                                            src={item.product.mainImage}
                                            alt={item.product.name}
                                        />
                                        <div className="line-clamp-2 text-sm">
                                            {item.product.name}
                                        </div>
                                    </div>
                                    <div>
                                        <div className="text-xs opacity-50">
                                            {'Wysłano do:'}
                                        </div>
                                        <div className="text-sm">
                                            {item.receiver.name}
                                        </div>
                                    </div>
                                </OfferLink>
                                {index < sendOffers.length - 1 && (
                                    <div className="w-full h-[1px] bg-black opacity-10" />
                                )}
                            </React.Fragment>
                        ))}
                </div>
            )}
        </div>
    );
};

export default OffersMenu;
