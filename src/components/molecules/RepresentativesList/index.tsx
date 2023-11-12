'use client';

import Representative from '../Representative';
import useUserCompanyRepresentatives from '~hooks/useUserCompanyRepresentatives';
import {serverClient} from '~server/trpc/serverClient';

export type RepresentativesListProps = {
    initialRepresentatives: Awaited<
        ReturnType<(typeof serverClient)['getUserCompanyRepresentatives']>
    >;
    initialCounter: Awaited<
        ReturnType<(typeof serverClient)['getUserRepresentativesCount']>
    >;
};

const RepresentativesList = ({
    initialRepresentatives,
    initialCounter,
}: RepresentativesListProps) => {
    const {representatives, counter} = useUserCompanyRepresentatives(
        initialRepresentatives,
        initialCounter,
    );

    return (
        <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col gap-6">
            <div className="text-black text-2xl font-bold leading-normal">
                {'Przedstawiciele'}
            </div>
            <div className="text-xs">{`${counter?.current}/${counter?.max}`}</div>

            <div className="flex flex-col gap-4">
                {representatives?.map((item) => (
                    <Representative key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default RepresentativesList;
