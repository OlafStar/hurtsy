'use client';
import {useSearchParams} from 'next/navigation';
import {useEffect} from 'react';

import {Tabs, TabsList, TabsTrigger} from '~components/ui/tabs';
import {OffersSearchType} from '~config/offers';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const ChangeOffers = () => {
    const {updateParams} = useAddSearchParams();
    const searchParams = useSearchParams();

    useEffect(() => {
        if (!searchParams.get('os')) {
            updateParams({os: OffersSearchType.Recived});
        }
    }, []);

    return (
        <Tabs
            defaultValue={
                searchParams.get('os') === OffersSearchType.Recived
                    ? OffersSearchType.Recived
                    : OffersSearchType.Send
            }
            className="flex flex-col gap-6"
            onValueChange={(value) => {
                updateParams({os: value});
            }}
        >
            <div className="flex flex-col gap-6">
                <TabsList className="grid w-full grid-cols-2">
                    <TabsTrigger value={OffersSearchType.Recived}>
                        {'Otrzymane'}
                    </TabsTrigger>
                    <TabsTrigger value={OffersSearchType.Send}>
                        {'Wysłane'}
                    </TabsTrigger>
                </TabsList>
            </div>
        </Tabs>
    );
};

export default ChangeOffers;
