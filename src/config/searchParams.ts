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
    OfferSearch = 'os',
    OfferId = 'oid'
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
