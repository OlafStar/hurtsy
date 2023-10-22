import CompanyForm from '~components/molecules/CompanyForm';
import Messages from '~components/organisms/Dashboard/Messages';
import Offers from '~components/organisms/Dashboard/Offers';
import Plans from '~components/organisms/Dashboard/Plans';
import Products from '~components/organisms/Dashboard/Products';
import Representatives from '~components/organisms/Dashboard/Representatives';
import Settings from '~components/organisms/Dashboard/Settings';
import YourCompany from '~components/organisms/Dashboard/YourCompany';
import {dashboardNavigation} from '~config/dashboard';
import {AppRoutes} from '~types/AppRoutes';

// export async function generateStaticParams() {
//     return dashboardNavigation.map((item) => ({
//         slug: item.href,
//     }));
// }

const Page = ({params: {slug}}: {params: {slug: string[]}}) => {
    const completeSlug = `/dashboard/${slug.join('/')}`;

    switch (completeSlug) {
        case AppRoutes.YOUR_COMPANY:
            return <YourCompany />;
        case AppRoutes.ADD_COMPANY:
            return <CompanyForm />;
        case AppRoutes.PRODUCTS:
            return <Products />;
        case AppRoutes.OFFERS:
            return <Offers />;
        case AppRoutes.REPRESENTATIVES:
            return <Representatives />;
        case AppRoutes.PLANS:
            return <Plans />;
        case AppRoutes.MESSAGES:
            return <Messages />;
        case AppRoutes.SETTINGS:
            return <Settings />;
        default:
            return <div>Invalid slug!</div>;
    }
};

export default Page;
