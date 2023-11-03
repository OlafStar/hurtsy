import {SearchParamsType} from '~config/searchParams';
import FilterCategories from './FilterCategories';
import FilterOrder from './FilterOrder';

type FiltersProps = {
    params?: SearchParamsType;
};

const Filters = ({params}: FiltersProps) => {
    return (
        <div className="relative">
            <div className="flex flex-col gap-4 sticky top-4">
                <div className="text-xl font-bold">{'Filtry'}</div>
                <FilterCategories params={params} />
                <FilterOrder params={params} />
            </div>
        </div>
    );
};

export default Filters;
