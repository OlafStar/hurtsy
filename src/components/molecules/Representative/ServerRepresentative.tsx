import {RepresentativeWeb} from '~types/company';

const ServerRepresentative = (props: RepresentativeWeb) => {
    const {name, email, phone, image} = props;

    return (
        <div className="flex flex-col gap-3 ">
            <div className="flex  items-center gap-1 px-4 justify-between h-[72px]">
                <div className="text-sm leading-[14px]">{name}</div>

                <img
                    src={image as string | ''}
                    className="w-[64px] h-[64px] rounded-full object-contain"
                />
            </div>
            <div className="grid grid-cols-2 text-sm h-[40px] border-t border-black border-opacity-10">
                <div className=" flex justify-center items-center">{email}</div>
                <div className=" flex justify-center items-center">{phone}</div>
            </div>
        </div>
    );
};

export default ServerRepresentative;
