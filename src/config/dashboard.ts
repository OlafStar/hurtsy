import {DashboardRoutes} from '~types/AppRoutes';
import YourCompanyIcon from '~assets/icons/your-company.svg';
import SettingsIcon from '~assets/icons/settings.svg';
import PlansIcon from '~assets/icons/plans.svg';
import ProductIcon from '~assets/icons/products.svg';
import OffersIcon from '~assets/icons/offers.svg';

const routeToIconMap = {
    [DashboardRoutes.YOUR_COMPANY]: YourCompanyIcon,
    [DashboardRoutes.PRODUCTS]: ProductIcon,
    [DashboardRoutes.OFFERS]: OffersIcon,
    [DashboardRoutes.PLANS]: PlansIcon,
    [DashboardRoutes.SETTINGS]: SettingsIcon,
};

export const dashboardNavigation = Object.entries(DashboardRoutes).map(
    ([key, value]) => ({
        icon: routeToIconMap[value],
        label:
            key.replace(/_/g, ' ').charAt(0).toUpperCase() +
            key.replace(/_/g, ' ').slice(1).toLowerCase(),
        href: value,
    }),
);
