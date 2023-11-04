import {RepresentativeWeb} from '~types/company';

const ServerRepresentative = (props: RepresentativeWeb) => {
    const {name, email, phone, image} = props;

    return (
        <div className='flex flex-col gap-3'>
            <div className='font-bold'>{'Przedstawiciel handlowy'}</div>
            <div className="flex items-center gap-1">
                <img
                    src={image as string | ''}
                    className="w-[64px] h-[64px] rounded-full object-contain"
                />
                <div className="flex flex-col gap-1">
                    <div className="text-sm leading-[14px]">{name}</div>
                    <div className="flex gap-1">
                        <div className="text-black text-opacity-50 text-xs font-normal leading-3">
                            {'Email: '}
                        </div>
                        <div className="text-black text-xs font-normal leading-3">
                            {email}
                        </div>
                    </div>
                    <div className="flex gap-2">
                        <div className="text-black text-opacity-50 text-xs font-normal leading-3">
                            {'Numer: '}
                        </div>
                        <div className="text-black text-xs font-normal leading-3">
                            {phone}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServerRepresentative;
