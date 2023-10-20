import React from 'react';

const CompanyDashboardProfile = () => {
    const companyProfile = {
        companyName: 'Tech Solutions Ltd.',
        city: 'Warsaw',
        phoneNumber: '123456789',
        website: 'https://techsolutions.com',
        address: '123 Tech Street, Suite 456',
        postalCode: '00-123',
        country: 'Poland',
        established: 2000,
        description:
            'Tech Solutions Ltd. provides innovative technology solutions to clients worldwide. With over two decades of experience, we pride ourselves on delivering the best in tech services.',
    };

    return (
        <div className="w-full max-w-xl mx-auto">
            <div className="p-6 bg-white rounded-xl">
                <div className="flex justify-between">
                    <div className="w-40 h-40 bg-cyan-200 mb-4" />
                    <div className="space-y-1">
                        <div>Edytuj</div>
                        <div>Edytuj</div>
                        <div>Edytuj</div>
                    </div>
                </div>
                <h2 className="text-3xl font-semibold mb-8">
                    {companyProfile.companyName}
                </h2>
                <ul className="space-y-6 text-gray-800">
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">City</strong>
                        <span>{companyProfile.city}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Phone Number
                        </strong>
                        <span>{companyProfile.phoneNumber}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Website</strong>
                        <a
                            href={companyProfile.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-blue-500 hover:underline"
                        >
                            {companyProfile.website}
                        </a>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Address</strong>
                        <span>{companyProfile.address}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Postal Code
                        </strong>
                        <span>{companyProfile.postalCode}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">Country</strong>
                        <span>{companyProfile.country}</span>
                    </li>
                    <li className="flex justify-between items-center">
                        <strong className="text-lg font-semibold">
                            Established
                        </strong>
                        <span>{companyProfile.established}</span>
                    </li>
                </ul>
            </div>
        </div>
    );
};

export default CompanyDashboardProfile;
