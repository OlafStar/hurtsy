'use client';
import {useEffect, useMemo} from 'react';

import {OffersSearchType} from '~config/offers';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const ChangeOffers = () => {
    const {currentSearchParams, updateParams} = useAddSearchParams();

    useEffect(() => {
        if (!currentSearchParams.get('os')) {
            updateParams({os: OffersSearchType.Send});
        }
    }, []);

    const currentTab = useMemo(() => {
        return currentSearchParams.get('os')
    }, [currentSearchParams]);

    return (
        <div className="flex text-sm text-center">
            <div
                onClick={() => updateParams({os: OffersSearchType.Recived})}
                className={`flex-1 py-4 cursor-pointer ${
                    currentTab === OffersSearchType.Recived
                        ? 'bg-white'
                        : 'bg-[#f5f5f5]'
                }`}
            >
                {'Otrzymane'}
            </div>
            <div
                onClick={() => updateParams({os: OffersSearchType.Send})}
                className={`flex-1 py-4 cursor-pointer  ${
                    currentTab === OffersSearchType.Send
                        ? 'bg-white'
                        : 'bg-[#f5f5f5]'
                }`}
            >
                {'Wysłane'}
            </div>
        </div>
    );
};

export default ChangeOffers;
