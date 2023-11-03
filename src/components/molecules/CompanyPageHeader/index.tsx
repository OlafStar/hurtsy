import {Button} from '~components/ui/button';
import CompanyProductSearchBar from '../CompanyProductSearchBar';
import {CompanyTypeWeb} from '~types/company';

const CompanyPageHeader = ({
    image,
    name,
    type,
    street,
    postCode,
    city,
    id,
}: CompanyTypeWeb) => {
    return (
        <div className="flex justify-between items-center">
            <div className="flex gap-4">
                <img
                    src={image || ''}
                    alt={`${name}-logo`}
                    className="w-[148px] aspect-square object-contain"
                />
                <div className="flex flex-col gap-3 justify-between">
                    <div className="text-xl leading-none">{name}</div>
                    <div className="flex flex-col gap-2">
                        <div className="flex gap-1 text-xs leading-none">
                            <div className="opacity-50">{'Typ:'}</div>
                            <div>{type}</div>
                        </div>
                        <div className="flex gap-1 text-xs leading-none">
                            <div className="opacity-50">{'Główne produkty:'}</div>
                            {/* <div>{type}</div> */}
                        </div>
                        <div className="flex gap-1 text-xs leading-none">
                            <div className=" opacity-50">{'Adres: '}</div>
                            <div>{`${street}, ${postCode} ${city}`}</div>
                        </div>
                    </div>
                    <Button className="bg-mainBlue font-bold">{'Kontakt'}</Button>
                </div>
            </div>
            <div>
                <CompanyProductSearchBar id={id} />
            </div>
        </div>
    );
};

export default CompanyPageHeader;
