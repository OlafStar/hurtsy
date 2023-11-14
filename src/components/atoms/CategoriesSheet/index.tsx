import Link from 'next/link';
import {PropsWithChildren} from 'react';

import {
    Sheet,
    SheetContent,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from '~/components/ui/sheet';
import {SearchParams} from '~config/searchParams';
import {AppRoutes} from '~types/AppRoutes';
import {Category} from '~types/categories';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

const CategoriesSheet = ({children}: PropsWithChildren) => {
    return (
        <Sheet>
            <SheetTrigger>{children}</SheetTrigger>
            <SheetContent
                side="left"
                className="md:hidden h-max-[100vh] overflow-y-scroll"
            >
                <SheetHeader className="text-left ">
                    <SheetTitle>{'Kategorie'}</SheetTitle>
                    {Object.entries(Category).map(([item, cat]) => (
                        <Link
                            key={item + cat}
                            href={`${AppRoutes.WEB_PRODUCTS}?${SearchParams.Category}=${cat}`}
                        >
                            <div className="text-sm font-medium leading-none p-2 transition-colors hover:bg-accent hover:text-accent-foreground data-[active]:bg-accent/50">
                                {translateEnumValueToPolish(cat)}
                            </div>
                        </Link>
                    ))}
                </SheetHeader>
            </SheetContent>
        </Sheet>
    );
};

export default CategoriesSheet;
