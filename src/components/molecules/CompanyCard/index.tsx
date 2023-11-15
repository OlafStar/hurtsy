import Link from 'next/link';

import {AppRoutes} from '~types/AppRoutes';
import {CompanyTypeWeb} from '~types/company';

const CompanyCard = ({
    name,
    image,
    city,
    street,
    postCode,
    id,
    products,
    type,
}: CompanyTypeWeb) => {
    return (
        <div className="flex flex-col gap-4 sm:gap-0 sm:flex-row justify-between">
            <Link href={`${AppRoutes.WEB_COMPANIES}/${id}`} className="flex-1">
                <div>
                    <div className="flex flex-col xs:flex-row gap-3">
                        <div className="h-full flex xs:block justify-center items-center">
                            <img
                                className="h-full aspect-square max-h-[328px]  xs:max-h-[128px] object-contain"
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
                                    <div className=" opacity-50">{'Typ: '}</div>
                                    <div>{`${type}`}</div>
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
            <div className="flex gap-4 flex-grow-0">
                {products?.map((item, index) => (
                    <Link
                        href={`${AppRoutes.WEB_PRODUCTS}/${item.id}`}
                        key={index}
                        className="flex-1 flex flex-col gap-2 justify-between xl:justify-center items-center sm:max-w-[84px]"
                    >
                        <img
                            className="w-[64px] h-[64px] object-contain"
                            src={item.mainImage || ''}
                            alt={item.name}
                        />
                        <div className="text-xs line-clamp-2">{item.name}</div>
                    </Link>
                ))}
            </div>
        </div>
    );
};

export default CompanyCard;
