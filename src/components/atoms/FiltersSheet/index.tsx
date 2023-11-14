import {PropsWithChildren} from 'react';

import {Sheet, SheetContent, SheetHeader, SheetTrigger} from '~/components/ui/sheet';
import Filters from '~components/molecules/Filters';
import {PropsWithParams} from '~types/generalTypes';

const FiltersSheet = ({
    children,
    searchParams,
}: PropsWithChildren & PropsWithParams) => {
    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent side="left" className="h-max-[100vh] overflow-y-scroll">
                <SheetHeader className="text-left ">
                    <Filters params={searchParams} />
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default FiltersSheet;
