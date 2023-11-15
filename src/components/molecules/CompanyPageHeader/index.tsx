import {CompanyTypeWeb} from '~types/company';

import CompanyProductSearchBar from '../CompanyProductSearchBar';

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
        <div className="flex flex-col gap-8 md:gap-0 md:flex-row md:justify-between md:items-center">
            <div className="flex flex-col xs:flex-row gap-4">
                <img
                    src={image || ''}
                    alt={`${name}-logo`}
                    className="xs:w-[148px] aspect-square object-contain"
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
                </div>
            </div>
            <div>
                <CompanyProductSearchBar id={id} className="md:w-[270px] max-w-[1000px] " />
            </div>
        </div>
    );
};

export default CompanyPageHeader;
