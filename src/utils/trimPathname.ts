import {DashboardRoutes} from '~types/AppRoutes';

export const trimPathname = (
    pathname: string,
    dashboardRoutes: typeof DashboardRoutes,
): string => {
    const routesValues = Object.values(dashboardRoutes) as string[];

    for (const route of routesValues) {
        if (pathname.includes(route)) {
            return route;
        }
    }
    return pathname;
};
