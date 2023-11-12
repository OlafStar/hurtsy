'use client';
import {PropsWithChildren} from 'react';

import {Button} from '~components/ui/button';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const PaginationButton = ({
    children,
    page,
    currentPage,
}: PropsWithChildren & {page: number; currentPage: number}) => {
    const {updateParams} = useAddSearchParams();
    return (
        <Button
            variant={currentPage === page ? 'default' : 'outline'}
            className="w-[32px] h-[32px] p-0 text-xs leading-none"
            onClick={() => updateParams({page})}
        >
            {children}
        </Button>
    );
};

export default PaginationButton;
