import {SearchParamsType} from '~config/searchParams';
import {PropsWithClassName} from '~types/generalTypes';
import {cn} from '~utils/shadcn';

import FilterCategories from './FilterCategories';
import FilterOrder from './FilterOrder';

type FiltersProps = {
    params?: SearchParamsType;
};

const Filters = ({params, className}: FiltersProps & PropsWithClassName) => {
    return (
        <div className="relative">
            <div className={`flex flex-col gap-4 sticky top-4 ${cn(className)}`}>
                <div className="text-xl font-bold">{'Filtry'}</div>
                <FilterCategories params={params} />
                <FilterOrder params={params} />
            </div>
        </div>
    );
};

export default Filters;
