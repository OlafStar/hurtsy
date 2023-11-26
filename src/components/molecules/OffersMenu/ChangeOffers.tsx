'use client';
import {useEffect} from 'react';

import {OffersSearchType} from '~config/offers';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const ChangeOffers = () => {
    const {currentSearchParams, updateParams} = useAddSearchParams();

    useEffect(() => {
        if (!currentSearchParams.get('os')) {
            updateParams({os: OffersSearchType.Send});
        }
    }, []);

    return (
        <div className="flex text-sm text-center">
            <div
                onClick={() => updateParams({os: OffersSearchType.Recived})}
                className="flex-1 py-4"
            >
                {'Otrzymane'}
            </div>
            <div
                onClick={() => updateParams({os: OffersSearchType.Send})}
                className="flex-1 py-4"
            >
                {'Wysłane'}
            </div>
        </div>
    );
};

export default ChangeOffers;
