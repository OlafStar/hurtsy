export enum SearchParams {
    SearchQuery = 'search_query',
    IsPromoted = 'isPromoted',
    Category = 'category',
    SubCategory = 'subCategory',
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
