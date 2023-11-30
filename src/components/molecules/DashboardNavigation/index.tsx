import React from 'react';

import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import Logo from '~components/atoms/Logo';
import {dashboardNavigation} from '~config/dashboard';
import {serverClient} from '~server/trpc/serverClient';
import {DashboardRoutes} from '~types/AppRoutes';

import DashboardSheet from '../DashboardSheet';

const DashboardNavigation = async () => {
    const company = await serverClient.getUserCompany();

    return (
        <>
            <aside className="hidden px-6 py-4 bg-white border-r border-fafafa justify-between flex-col lg:flex">
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
            <nav className="flex items-center justify-between lg:hidden py-2">
                <Logo />
                <DashboardSheet>
                    <div>{'Open'}</div>
                </DashboardSheet>
            </nav>
        </>
    );
};

export default DashboardNavigation;
