export type Pagination<T> = {
    items: T[];
    pageInfo: PageInfo;
};
export type SearchOption = {
    pageNo: number;
    pageSize: number;
    query?: string;
    orderBy?: string;
    align?: 'desc' | 'asc';
};
export type PageInfo = {
    currentPage: number;
    itemsPerPage: number;
    itemsCount: number;
    totalItems: number;
    totalPages: number;
};
export declare const generatePageInfo: (pageNo: number, pageSize: number, itemLength: number, count: number) => PageInfo;
