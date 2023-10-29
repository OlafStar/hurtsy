import React from 'react';
import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import Logo from '~components/atoms/Logo';
import {dashboardNavigation} from '~config/dashboard';

const DashboardNavigation = () => {
    return (
        <aside className="hidden px-6 py-4 bg-white border-r border-fafafa justify-between flex-col md:flex">
            <div className='flex flex-col gap-10'>
                <Logo className='text-4xl'/>
                <div className="gap-4 flex-col md:flex">
                    {dashboardNavigation.map((item) => (
                        <DashboardPageLink key={item.label} {...item} />
                    ))}
                </div>
            </div>
            <LogOutButton />
        </aside>
    );
};

export default DashboardNavigation;
