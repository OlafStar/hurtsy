'use client';

import * as React from 'react';
import Link from 'next/link';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuList,
    NavigationMenuTrigger,
} from '~/components/ui/navigation-menu';
import {Category} from '~types/categories';
import {AppRoutes} from '~types/AppRoutes';
import {SearchParams} from '~config/searchParams';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';
import CategoriesSheet from '~components/atoms/CategoriesSheet';

export function NavigationMenuDemo() {
    return (
        <NavigationMenu skipDelayDuration={0}>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <div className='block md:hidden'>
                        <CategoriesSheet>
                            <div className="font-medium text-sm p-2">{'Kategorie'}</div>
                        </CategoriesSheet>
                    </div>
                    <div className='hidden md:block'>
                        <NavigationMenuTrigger>{'Kategorie'}</NavigationMenuTrigger>
                        <NavigationMenuContent className="hidden md:block">
                            <div className="flex flex-col p-4 flex-wrap  w-[416px] h-[400px]">
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
                            </div>
                        </NavigationMenuContent>
                    </div>
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
