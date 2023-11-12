'use client';
import {
    Select,
    SelectContent,
    SelectGroup,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~/components/ui/select';
import {useAddSearchParams} from '~hooks/useAddSearchParams';

const PaginationPageSize = ({size}: {size: string}) => {
    const {updateParams} = useAddSearchParams();

    console.log(size);
    return (
        <Select
            defaultValue={size}
            onValueChange={(value) => {
                updateParams({pageSize: value});
            }}
        >
            <SelectTrigger className="w-[42px] h-[32px] p-0 text-xs leading-none border border-black border-opacity-10">
                <SelectValue placeholder={`${size}`} />
            </SelectTrigger>
            <SelectContent side="top">
                <SelectGroup>
                    <SelectItem value="10">{"10"}</SelectItem>
                    <SelectItem value="30">{"30"}</SelectItem>
                    <SelectItem value="50">{"50"}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};

export default PaginationPageSize;
