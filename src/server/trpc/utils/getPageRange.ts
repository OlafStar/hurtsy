export const getPageRange = (totalPages: number, currentPage: number) => {
    if (totalPages <= 5) {
        return {startPage: 2, endPage: totalPages - 1};
    }

    if (currentPage === 4) {
        return {startPage: currentPage - 1, endPage: currentPage + 2};
    }

    if (currentPage < 4) {
        return {startPage: 2, endPage: 5};
    }

    if (currentPage + 2 >= totalPages) {
        return {startPage: totalPages - 4, endPage: totalPages - 1};
    }

    return {startPage: currentPage - 1, endPage: currentPage + 1};
};
