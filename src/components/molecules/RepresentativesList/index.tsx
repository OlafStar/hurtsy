'use client';

import Representative from '../Representative';
import {useUserCompany} from '~hooks/useUserCompany';
import useCompanyRepresentatives from '~hooks/useCompanyRepresentatives';

const RepresentativesList = () => {
    const {company} = useUserCompany();

    const {representatives} = useCompanyRepresentatives(company?.id || '');
    return (
        <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col gap-6">
            <div className="text-black text-2xl font-bold leading-normal">
                {'Przedstawiciele'}
            </div>
            <div className="flex flex-col gap-4">
                {representatives?.map((item) => (
                    <Representative key={item.id} {...item} />
                ))}
            </div>
        </div>
    );
};

export default RepresentativesList;
