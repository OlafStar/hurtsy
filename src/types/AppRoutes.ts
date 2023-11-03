export enum DashboardRoutes {
    YOUR_COMPANY = '/dashboard/your-company',
    PRODUCTS = '/dashboard/products',
    OFFERS = '/dashboard/offers',
    REPRESENTATIVES = '/dashboard/representatives',
    PLANS = '/dashboard/plans',
    MESSAGES = '/dashboard/messages',
    SETTINGS = '/dashboard/settings',
}

export enum CompanyRoutes {
    ADD_COMPANY = '/dashboard/your-company/add-company',
    EDIT_COMPANY = '/dashboard/your-company/edit-company',
}

export enum ProductRoutes {
    ADD_PRODUCT = '/dashboard/products/add-product',
    EDIT_PRODUCTS = '/dashboard/products/edit-product',
}

export enum WebsiteRoutes {
    WEB_COMPANIES = '/companies',
    WEB_PRODUCTS = '/products'
}

export const AppRoutes = {
    ...DashboardRoutes,
    ...CompanyRoutes,
    ...ProductRoutes,
    ...WebsiteRoutes,
};
