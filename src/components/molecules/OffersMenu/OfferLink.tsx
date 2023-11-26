'use client';

import {PropsWithChildren} from 'react';

import {useAddSearchParams} from '~hooks/useAddSearchParams';

const OfferLink = ({children, id}: PropsWithChildren & {id: string}) => {
    const {updateParams} = useAddSearchParams();
    return (
        <div onClick={() => updateParams({oid: id})} className="flex flex-col gap-2">
            {children}
        </div>
    );
};

export default OfferLink;
