import React from 'react';
import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import {dashboardNavigation} from '~config/dashboard';

const DashboardNavigation = () => {
    return (
        <aside className="hidden px-6 py-4 bg-white justify-between flex-col md:flex">
            <div className="gap-4 flex-col md:flex">
                {dashboardNavigation.map((item) => (
                    <DashboardPageLink key={item.label} {...item} />
                ))}
            </div>
            <LogOutButton />
        </aside>
    );
};

export default DashboardNavigation;
