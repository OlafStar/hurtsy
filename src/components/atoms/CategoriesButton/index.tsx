'use client';
import {XIcon} from 'lucide-react';

import {SearchParams} from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {CategoryWeb} from '~types/products';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

import ClearFilterButton from '../ClearFilterButton';

const CategoriesButton = ({mainCategory}: CategoryWeb) => {
    const {currentSearchParams, updateParams} = useAddSearchParams();

    const searchParams = new URLSearchParams(currentSearchParams);

    return (
        <div
            key={mainCategory}
            className={`flex gap-1 items-center text-sm cursor-pointer ${
                searchParams.get(SearchParams.Category) === mainCategory &&
                'font-bold'
            }`}
        >
            <div
                onClick={() => {
                    updateParams({category: mainCategory}, [
                        SearchParams.PagePagination,
                    ]);
                }}
            >
                {translateEnumValueToPolish(mainCategory)}
            </div>
            {searchParams.get(SearchParams.Category) === mainCategory && (
                <ClearFilterButton
                    paramsToDelete={'all'}
                    buttonProps={{variant: 'link'}}
                    className="w-fit p-0"
                >
                    <XIcon className="w-4 h-4" />
                </ClearFilterButton>
            )}
        </div>
    );
};

export default CategoriesButton;
