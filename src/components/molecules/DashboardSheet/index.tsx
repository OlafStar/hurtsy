import {PropsWithChildren} from 'react';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/components/ui/sheet';
import DashboardPageLink from '~components/atoms/DashboardPageLink';
import LogOutButton from '~components/atoms/LogOutButton';
import Logo from '~components/atoms/Logo';
import {dashboardNavigation} from '~config/dashboard';
import {serverClient} from '~server/trpc/serverClient';
import {DashboardRoutes} from '~types/AppRoutes';

const DashboardSheet = async ({children}: PropsWithChildren) => {
    const company = await serverClient.getUserCompany();

    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent side="left" className="h-max-[100vh] overflow-y-scroll">
                <SheetHeader className="text-left h-full gap-8">
                    <SheetTitle>
                        <Logo className="text-4xl" />
                    </SheetTitle>
                    <aside className="h-full flex-1 bg-white justify-between flex-col flex">
                        <div className="flex flex-col gap-10">
                            <div className="gap-4 flex-col flex flex-1">
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
                                    return (
                                        <DashboardPageLink
                                            key={item.label}
                                            {...item}
                                        />
                                    );
                                })}
                            </div>
                        </div>
                        <LogOutButton />
                    </aside>
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default DashboardSheet;
