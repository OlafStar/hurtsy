import Loader from '~components/atoms/Loader';
import Filters from '~components/molecules/Filters';
import {SearchParamsType} from '~config/searchParams';

type LoadingProps = {
    searchParams?: SearchParamsType;
};

export default function Loading({searchParams}: LoadingProps) {
    return (
        <div className="flex flex-col gap-8 flex-1">
            <div className="flex pt-8 flex-1">
                <Filters params={searchParams} />
                <div className="flex-1">
                    <Loader className="font-bold -translate-y-16" />
                </div>
            </div>
        </div>
    );
}
