import {DashboardRoutes} from '~types/AppRoutes';
import YourCompanyIcon from '~assets/icons/your-company.svg';
import SettingsIcon from '~assets/icons/settings.svg';
import PlansIcon from '~assets/icons/plans.svg';
import ProductIcon from '~assets/icons/products.svg';
import OffersIcon from '~assets/icons/offers.svg';
import MessagesIcon from '~assets/icons/message.svg';
import RepresentativesIcon from '~assets/icons/representatives.svg';

const routeToIconMap = {
    [DashboardRoutes.YOUR_COMPANY]: YourCompanyIcon,
    [DashboardRoutes.PRODUCTS]: ProductIcon,
    [DashboardRoutes.OFFERS]: OffersIcon,
    [DashboardRoutes.REPRESENTATIVES]: RepresentativesIcon,
    [DashboardRoutes.PLANS]: PlansIcon,
    [DashboardRoutes.MESSAGES]: MessagesIcon,
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
