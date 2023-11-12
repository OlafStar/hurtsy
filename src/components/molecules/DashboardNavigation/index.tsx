'use client';
import React from 'react';

import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import Logo from '~components/atoms/Logo';
import {dashboardNavigation} from '~config/dashboard';
import {useUserCompany} from '~hooks/useUserCompany';
import {DashboardRoutes} from '~types/AppRoutes';

const DashboardNavigation = () => {
    const {company} = useUserCompany();

    return (
        <aside className="hidden px-6 py-4 bg-white border-r border-fafafa justify-between flex-col md:flex">
            <div className="flex flex-col gap-10">
                <Logo className="text-4xl" />
                <div className="gap-4 flex-col md:flex">
                    {dashboardNavigation.map((item) => {
                        if (
                            !company &&
                            item.href != DashboardRoutes.YOUR_COMPANY &&
                            item.href != DashboardRoutes.PLANS
                        ) {
                            return (
                                <DashboardPageLink
                                    key={item.label}
                                    {...item}
                                    href={DashboardRoutes.YOUR_COMPANY}
                                    classname="pointer-events-none opacity-10"
                                />
                            );
                        }
                        return <DashboardPageLink key={item.label} {...item} />;
                    })}
                </div>
            </div>
            <LogOutButton />
        </aside>
    );
};

export default DashboardNavigation;
