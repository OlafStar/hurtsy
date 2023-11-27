import {RedirectType, redirect} from 'next/navigation';

import CompanyForm from '~components/molecules/CompanyForm';
import CompanyEditForm from '~components/molecules/CompanyForm/CompanyEditForm';
import ProductCreationForm from '~components/molecules/ProductCreationForm';
import ProductEditForm from '~components/molecules/ProductCreationForm/CompanyEditForm';
import Offers from '~components/organisms/Dashboard/Offers';
import Plans from '~components/organisms/Dashboard/Plans';
import Products from '~components/organisms/Dashboard/Products';
import Settings from '~components/organisms/Dashboard/Settings';
import YourCompany from '~components/organisms/Dashboard/YourCompany';
import {SearchParamsType} from '~config/searchParams';
// import {dashboardNavigation} from '~config/dashboard';
import {serverClient} from '~server/trpc/serverClient';
import {AppRoutes} from '~types/AppRoutes';

// export async function generateStaticParams() {
//     return dashboardNavigation.map((item) => ({
//         slug: item.href,
//     }));
// }

const Page = async ({
    params: {slug},
    searchParams,
}: {
    params: {slug: string[]};
    searchParams?: SearchParamsType;
}) => {
    const completeSlug = `/dashboard/${slug.join('/')}`;
    const company = await serverClient.getUserCompany();

    if (
        !company &&
        completeSlug != AppRoutes.ADD_COMPANY &&
        completeSlug != AppRoutes.PLANS
    ) {
        redirect(AppRoutes.ADD_COMPANY, RedirectType.push);
    }

    switch (completeSlug) {
        case AppRoutes.YOUR_COMPANY:
            return <YourCompany />;
        case AppRoutes.ADD_COMPANY:
            return <CompanyForm />;
        case AppRoutes.EDIT_COMPANY:
            return <CompanyEditForm />;
        case AppRoutes.PRODUCTS:
            return <Products />;
        case AppRoutes.ADD_PRODUCT:
            return <ProductCreationForm />;
        case `${AppRoutes.EDIT_PRODUCTS}/${slug[2]}`:
            return <ProductEditForm id={slug[2]} />;
        case AppRoutes.OFFERS:
            return <Offers searchParams={searchParams} />;
        case AppRoutes.PLANS:
            return <Plans />;
        case AppRoutes.SETTINGS:
            return <Settings />;
        default:
            return <div>{'Invalid slug!'}</div>;
    }
};

export default Page;
