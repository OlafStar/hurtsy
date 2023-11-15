import PaginationButton from '~components/atoms/PaginationButton';
import PaginationPageSize from '~components/atoms/PaginationPageSize';
import {getPageRange} from '~server/trpc/utils/getPageRange';

type PaginationProps = {
    currentPage: number;
    totalPages: number;
    pageSize: string;
    hidePageSize?: boolean;
};

const Pagination = ({
    currentPage,
    totalPages,
    pageSize,
    hidePageSize,
}: PaginationProps) => {
    const renderPagination = () => {
        const {startPage, endPage} = getPageRange(totalPages, currentPage);
        const pages = [];

        pages.push(
            <PaginationButton key={'first'} {...{currentPage, page: 1}}>
                {'1'}
            </PaginationButton>,
        );

        if (startPage > 2) {
            pages.push(<span key="start-ellipsis">{"..."}</span>);
        }

        for (let page = startPage; page <= endPage; page++) {
            pages.push(
                <PaginationButton key={page} {...{currentPage, page}}>
                    {page}
                </PaginationButton>,
            );
        }

        if (endPage < totalPages - 1) {
            pages.push(<span key="end-ellipsis">{'...'}</span>);
        }

        if (totalPages > 1) {
            pages.push(
                <PaginationButton key={'last'} {...{currentPage, page: totalPages}}>
                    {totalPages}
                </PaginationButton>,
            );
        }

        return pages;
    };

    return (
        <div className="w-full flex justify-end items-end gap-2">
            {!hidePageSize && <PaginationPageSize size={pageSize} />}
            {renderPagination()}
        </div>
    );
};

export default Pagination;
