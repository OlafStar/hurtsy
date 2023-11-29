import Loader from '~components/atoms/Loader';

export default function Loading() {
    return (
        <div className="flex flex-col gap-8 flex-1 min-h-[100vh]">
            <div className="flex pt-8 flex-1">
                <div className="flex-1">
                    <Loader className="font-bold -translate-y-16" />
                </div>
            </div>
        </div>
    );
}
