export enum SearchParams {
    SearchQuery = 'search_query',
    IsPromoted = 'isPromoted',
    Category = 'category',
    SubCategory = 'subCategory',
    MinQuantity = 'minQuantity',
    DeliveryPrice = 'deliveryPrice',
    CompanyType = 'companyType',
    Price = 'price',
    CompanyID = 'companyId',
    PagePagination = 'page',
    PageSize = 'pageSize',
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
