const Representative = () => {
    return (
        <div className="flex items-center gap-1">
            <div className="w-[64px] h-[64px] rounded-full bg-slate-400" />
            <div className="flex flex-col gap-1">
                <div className="text-sm leading-[14px]">{'Olaf Nieliwodzki'}</div>
                <div className="flex gap-1">
                    <div className="text-black text-opacity-50 text-xs font-normal leading-3">
                        {'Email: '}
                    </div>
                    <div className="text-black text-xs font-normal leading-3">
                        {'olafnieliwodzki@wp.pl'}
                    </div>
                </div>
                <div className="flex gap-2">
                    <div className="text-black text-opacity-50 text-xs font-normal leading-3">
                        {'Numer: '}
                    </div>
                    <div className="text-black text-xs font-normal leading-3">
                        {'504523362'}
                    </div>
                </div>
            </div>
            <div className="flex flex-col gap-4 ml-12">
                <img src="/pen-to-square-solid.svg" />
                <img src="/user-minus-solid.svg" />
            </div>
        </div>
    );
};

export default Representative;
