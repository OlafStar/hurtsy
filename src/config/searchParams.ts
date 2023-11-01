export enum SearchParams {
    SearchQuery = 'search_query',
    IsPromoted = 'isPromoted',
    Category = 'category',
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
