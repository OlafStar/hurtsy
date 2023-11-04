'use client';

import {PrefetchKind} from 'next/dist/client/components/router-reducer/router-reducer-types';
import {usePathname, useRouter} from 'next/navigation';
import React, {useEffect, PropsWithChildren, useState} from 'react';
import {Button, ButtonProps} from '~components/ui/button';
import {SearchParams} from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {cn} from '~utils/shadcn';

type ClearFilterButtonProps = PropsWithChildren & {
    buttonProps?: ButtonProps;
    paramsToDelete: Array<SearchParams> | 'all';
    className?: string;
};

const ClearFilterButton: React.FC<ClearFilterButtonProps> = ({
    children,
    paramsToDelete,
    buttonProps,
    className,
}) => {
    const [showButton, setShowButton] = useState(false);
    const {currentSearchParams, deleteParam} = useAddSearchParams();
    const router = useRouter();
    const pathname = usePathname();

    useEffect(() => {
        if (paramsToDelete === 'all') {
            const hasOtherParams = Array.from(currentSearchParams.keys()).some(
                (param) =>
                    param !== SearchParams.SearchQuery &&
                    param !== SearchParams.PageSize &&
                    param !== SearchParams.PagePagination,
            );
            setShowButton(hasOtherParams);
        } else {
            const isAnyParamPresent = paramsToDelete.some((param) =>
                currentSearchParams.has(param),
            );
            setShowButton(isAnyParamPresent);
        }
    }, [paramsToDelete, currentSearchParams]);

    const handleClearFilters = () => {
        if (paramsToDelete === 'all') {
            const allParams = Object.values(SearchParams).filter(
                (param) =>
                    param !== SearchParams.SearchQuery &&
                    param !== SearchParams.PageSize &&
                    param !== SearchParams.PagePagination,
            );
            deleteParam(allParams);
        } else {
            console.log(paramsToDelete);
            deleteParam(paramsToDelete);
        }
    };

    if (!showButton) {
        return null;
    }

    return (
        <Button
            className={`p-0 m-0 h-fit text-sm text-red-400 ${cn(className)}`}
            onClick={handleClearFilters}
            variant="ghost"
            {...buttonProps}
        >
            {children}
        </Button>
    );
};

export default ClearFilterButton;
