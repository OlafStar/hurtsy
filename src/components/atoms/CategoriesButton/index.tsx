'use client';
import { SearchParams } from '~config/searchParams';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {CategoryWeb} from '~types/products';

const CategoriesButton = ({mainCategory}: CategoryWeb) => {
    const {updateParams} = useAddSearchParams();

    return (
        <div
            key={mainCategory}
            className="text-sm cursor-pointer"
            onClick={() => {
                updateParams({category: mainCategory}, [SearchParams.PagePagination]);
            }}
        >
            {mainCategory}
        </div>
    );
};

export default CategoriesButton;
