import Loader from '~components/atoms/Loader';

export default function Loading() {
    return (
        <div className="flex flex-1">
            <div className="flex-1">
                <Loader />
            </div>
        </div>
    );
}
