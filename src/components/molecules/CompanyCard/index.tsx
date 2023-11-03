import Link from 'next/link';
import {AppRoutes} from '~types/AppRoutes';
import {CompanyTypeWeb} from '~types/company';

const CompanyCard = ({name, image, city, street, postCode, id}: CompanyTypeWeb) => {
    return (
        <Link href={`${AppRoutes.WEB_COMPANIES}/${id}`}>
            <div>
                <div className="flex gap-3">
                    <div className="h-full">
                        <img
                            className="h-full aspect-square max-h-[100px] object-contain"
                            src={image || ''}
                            alt={`${name}-logo`}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <div>{name}</div>
                        <div className="flex-col flex gap-2">
                            <div className="flex gap-1">
                                <div className="text-xs opacity-50">
                                    {'Główne produkty: '}
                                </div>
                                <div></div>
                            </div>
                            <div className="flex gap-1 text-xs">
                                <div className=" opacity-50">{'Adres: '}</div>
                                <div>{`${street}, ${postCode} ${city}`}</div>
                            </div>
                            <div className="flex gap-1 text-xs">
                                <div className=" opacity-50">
                                    {'Skontaktuj się z dotawcą!'}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Link>
    );
};

export default CompanyCard;
