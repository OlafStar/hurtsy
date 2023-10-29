export enum SearchParams {
    SearchQuery = 'search_query',
    IsPromoted = 'isPromoted',
}

export type SearchParamsType = {
    [key in SearchParams]: string | string[] | undefined;
};
