import {Popover, PopoverContent, PopoverTrigger} from '~/components/ui/popover';
import EditRepresentative from '../RepresentativeForm/EditRepresentative';
import {RepresentativeWeb} from '~types/company';
import DeleteRepresentative from '~components/atoms/DeleteRepresentative';

const Representative = (props: RepresentativeWeb) => {
    const {id, name, email, phone} = props;
    return (
        <div className="flex items-center gap-1">
            <div className="w-[64px] h-[64px] rounded-full bg-slate-400" />
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
            <div className="flex flex-col gap-4 ml-12">
                <Popover>
                    <PopoverTrigger>
                        <img src="/pen-to-square-solid.svg" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <EditRepresentative {...props} />
                    </PopoverContent>
                </Popover>
                <Popover>
                    <PopoverTrigger>
                        <img src="/user-minus-solid.svg" />
                    </PopoverTrigger>
                    <PopoverContent>
                        <DeleteRepresentative id={id} />
                    </PopoverContent>
                </Popover>
            </div>
        </div>
    );
};

export default Representative;
