'use client';

import * as React from 'react';

import {
    NavigationMenu,
    NavigationMenuContent,
    NavigationMenuItem,
    NavigationMenuLink,
    NavigationMenuList,
    NavigationMenuTrigger,
    navigationMenuTriggerStyle,
} from '~/components/ui/navigation-menu';
import {cn} from '~utils/shadcn';
import {Category} from '~types/categories';
import Link from 'next/link';
import {AppRoutes} from '~types/AppRoutes';
import {SearchParams} from '~config/searchParams';
import { translateEnumValueToPolish } from '~utils/enumValueTranslations';

const components: {title: string; href: string; description: string}[] = [
    {
        title: 'Alert Dialog',
        href: '/docs/primitives/alert-dialog',
        description:
            'A modal dialog that interrupts the user with important content and expects a response.',
    },
    {
        title: 'Hover Card',
        href: '/docs/primitives/hover-card',
        description: 'For sighted users to preview content available behind a link.',
    },
    {
        title: 'Progress',
        href: '/docs/primitives/progress',
        description:
            'Displays an indicator showing the completion progress of a task, typically displayed as a progress bar.',
    },
    {
        title: 'Scroll-area',
        href: '/docs/primitives/scroll-area',
        description: 'Visually or semantically separates content.',
    },
    {
        title: 'Tabs',
        href: '/docs/primitives/tabs',
        description:
            'A set of layered sections of content—known as tab panels—that are displayed one at a time.',
    },
    {
        title: 'Tooltip',
        href: '/docs/primitives/tooltip',
        description:
            'A popup that displays information related to an element when the element receives keyboard focus or the mouse hovers over it.',
    },
];

export function NavigationMenuDemo() {
    return (
        <NavigationMenu>
            <NavigationMenuList>
                <NavigationMenuItem>
                    <NavigationMenuTrigger>Kategorie</NavigationMenuTrigger>
                    <NavigationMenuContent>
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
                </NavigationMenuItem>
            </NavigationMenuList>
        </NavigationMenu>
    );
}
