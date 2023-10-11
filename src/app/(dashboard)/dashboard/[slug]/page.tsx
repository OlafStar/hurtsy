import Messages from '~components/organisms/Dashboard/Messages';
import Offers from '~components/organisms/Dashboard/Offers';
import Plans from '~components/organisms/Dashboard/Plans';
import Products from '~components/organisms/Dashboard/Products';
import Representatives from '~components/organisms/Dashboard/Representatives';
import Settings from '~components/organisms/Dashboard/Settings';
import YourCompany from '~components/organisms/Dashboard/YourCompany';
import {dashboardNavigation} from '~config/dashboard';
import {DashboardRoutes} from '~types/AppRoutes';

export async function generateStaticParams() {
    return dashboardNavigation.map((item) => ({
        slug: item.href,
    }));
}

const Page = ({params: {slug}}: {params: {slug: DashboardRoutes}}) => {
    const completeSlug = `/dashboard/${slug}` as DashboardRoutes;
    if (!Object.values(DashboardRoutes).includes(completeSlug)) {
        return <div>Invalid slug!</div>;
    }

    switch (completeSlug) {
        case DashboardRoutes.YOUR_COMPANY:
            return <YourCompany />;
        case DashboardRoutes.PRODUCTS:
            return <Products />;
        case DashboardRoutes.OFFERS:
            return <Offers />;
        case DashboardRoutes.REPRESENTATIVES:
            return <Representatives />;
        case DashboardRoutes.PLANS:
            return <Plans />;
        case DashboardRoutes.MESSAGES:
            return <Messages />;
        case DashboardRoutes.SETTINGS:
            return <Settings />;
        default:
            return <div>Invalid slug!</div>;
    }
};

export default Page;
