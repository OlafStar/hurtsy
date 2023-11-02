import Link from 'next/link';
import React from 'react';
import {AppRoutes} from '~types/AppRoutes';
import {CompanyTypeWeb} from '~types/company';

type CompanyDashboardProfileProps = {
    company: CompanyTypeWeb;
};

const CompanyDashboardProfile = ({company}: CompanyDashboardProfileProps) => {
    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="p-6 bg-white rounded-xl">
                <div className="flex justify-between">
                    <img
                        src={company.image || ''}
                        alt={'company-logo'}
                        className="w-40 h-40 bg-cyan-200 mb-4 object-contain"
                    />
                    <div className="space-y-1">
                        <Link href={AppRoutes.EDIT_COMPANY}>Edytuj</Link>
                    </div>
                </div>
                <h2 className="text-3xl font-semibold mb-8">{company.name}</h2>
                <ul className="space-y-6 text-gray-800">
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">City</strong>
                        <span>{company.city}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Phone Number
                        </strong>
                        <span>{company.phone}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Website</strong>
                        <a
                            href={company.website || ''}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {company.website}
                        </a>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Address</strong>
                        <span>{company.street}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Postal Code
                        </strong>
                        <span>{company.postCode}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Country</strong>
                        <span>{company.country}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Established
                        </strong>
                        <span>{company.establishment}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CompanyDashboardProfile;
