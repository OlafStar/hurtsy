'use client';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {CategoryWeb} from '~types/products';

const CategoriesButton = ({mainCategory}: CategoryWeb) => {
    const {updateParams} = useAddSearchParams();

    return (
        <div
            key={mainCategory}
            className="text-sm cursor-pointer"
            onClick={() => {
                updateParams({category: mainCategory});
            }}
        >
            {mainCategory}
        </div>
    );
};

export default CategoriesButton;
