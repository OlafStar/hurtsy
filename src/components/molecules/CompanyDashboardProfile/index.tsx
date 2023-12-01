import Link from 'next/link';
import React from 'react';

import {Button} from '~components/ui/button';
import {getCurrentUser} from '~lib/session';
import {AppRoutes} from '~types/AppRoutes';
import {CompanyTypeWeb} from '~types/company';

type CompanyDashboardProfileProps = {
    company: CompanyTypeWeb;
};

const CompanyDashboardProfile = async ({company}: CompanyDashboardProfileProps) => {
    const user = await getCurrentUser();
    return (
        <div className="py-4 lg:p-4 flex flex-col gap-6 max-w-[800px]">
            <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                <div className="flex flex-col gap-1">
                    <div className="text-xl font-bold">{'Profil firmy'}</div>
                    <div className="text-sm opacity-50">
                        {
                            'Informacje które zobaczą inni widząc twoje produkty lub profil.'
                        }
                    </div>
                </div>
                <div className="flex gap-4">
                    <Link href={`${AppRoutes.WEB_COMPANIES}/${company.id}`}>
                        <Button variant="outline" className="whitespace-nowrap">
                            {'Zobacz profil'}
                        </Button>
                    </Link>
                    <Link href={AppRoutes.EDIT_COMPANY}>
                        <Button className="bg-mainBlue">{'Edytuj'}</Button>
                    </Link>
                </div>
            </div>
            <div className="w-full h-[1px] bg-black opacity-10" />

            <div className="flex flex-col gap-6">
                <div className="grid sm:grid-cols-2 items-center">
                    <img
                        src={company.image || ''}
                        alt={'company-logo'}
                        className="w-64 h-64 object-contain rounded-sm"
                    />
                </div>
                <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                    <div>
                        <div className="font-medium text-sm">{'Nazwa firmy'}</div>
                    </div>
                    <div className="">{company.name}</div>
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                    <div>
                        <div className="font-medium text-sm">
                            {'Typ działalności'}
                        </div>
                    </div>
                    <div className="">{company.type}</div>
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                    <div>
                        <div className="font-medium text-sm">{'Adres'}</div>
                        <div className="text-xs opacity-50">
                            {'Miejsce w którym działa twoja firma'}
                        </div>
                    </div>
                    <div className="">{`${company.street}, ${company.postCode} ${company.city}`}</div>
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="flex flex-col gap-2">
                    <div className="flex justify-between sm:items-center flex-col sm:flex-row gap-4">
                        <div>
                            <div className="font-medium text-sm">
                                {'Dane kontaktowe'}
                            </div>
                            <div className="text-xs opacity-50">
                                {'Sposób kontaktu z twoją firmą'}
                            </div>
                        </div>
                        <div className="grid grid-cols-[65px_max-content] grid-rows-2 col-gap-4 items-center">
                            <div className="text-xs font-medium">{'Email:'}</div>
                            <div className="">{user?.email}</div>
                            <div className="text-xs font-medium">{'Telefon:'}</div>
                            <div className="">{company.phone}</div>
                        </div>
                    </div>
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
                <div className="flex justify-between items-center">
                    <div>
                        <div className="font-medium text-sm">{'Rok załoeżenia'}</div>
                    </div>
                    <div className="">{company.establishment}</div>
                </div>
            </div>
        </div>
    );
};

export default CompanyDashboardProfile;
