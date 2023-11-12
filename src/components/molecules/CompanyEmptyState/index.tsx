import Link from 'next/link';

import {Button} from '~components/ui/button';
import {CompanyRoutes} from '~types/AppRoutes';

const CompanyEmptyState = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-[360px] flex flex-col items-center gap-8">
                <div className="text-2xl font-semibold text-center">
                    {'Stwórz profil firmy i zacznij promować swoje oferty'}
                </div>
                <Link href={CompanyRoutes.ADD_COMPANY}>
                    <Button>{'Stwórz'}</Button>
                </Link>
            </div>
        </div>
    );
};

export default CompanyEmptyState;
