import {Button} from '~components/ui/button';

const CompanyEmptyState = () => {
    return (
        <div className="w-full h-full flex justify-center items-center">
            <div className="max-w-[360px] flex flex-col items-center gap-8">
                <div className="text-2xl font-semibold text-center">
                    {'Stwórz profil firmy i zacznij promować swoje oferty'}
                </div>
                <Button>{'Stwórz'}</Button>
            </div>
        </div>
    );
};

export default CompanyEmptyState;
