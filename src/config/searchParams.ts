export enum SearchParams {
    SearchQuery = 'search_query',
    IsPromoted = 'isPromoted',
    Category = 'category',
    SubCategory = 'subCategory',
    MinQuantity = 'minQuantity',
    DeliveryPrice = 'deliveryPrice',
    CompanyType = 'companyType',
    Price = 'price',
    CompanyID = 'companyId'
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
