import Representative from "../Representative";

const RepresentativesList = () => {
    return (
        <div className="w-full h-full bg-white rounded-xl p-6 flex flex-col gap-6">
            <div className="text-black text-2xl font-bold leading-normal">
                {'Przedstawiciele'}
            </div>
            <div className="flex flex-col gap-4">
                <Representative />
                <Representative />
                <Representative />
            </div>
        </div>
    );
};

export default RepresentativesList;
