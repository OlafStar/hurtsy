import {DashboardRoutes} from '~types/AppRoutes';

export const dashboardNavigation = Object.entries(DashboardRoutes).map(
    ([key, value]) => ({
        icon: null,
        label:
            key.replace(/_/g, ' ').charAt(0).toUpperCase() +
            key.replace(/_/g, ' ').slice(1).toLowerCase(),
        href: value,
    }),
);
