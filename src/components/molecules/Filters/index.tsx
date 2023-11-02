'use client';

import {CaretSortIcon} from '@radix-ui/react-icons';
import React, {useEffect, useState} from 'react';
import {Category, subCategoryEnums} from '~types/categories';

import {Popover, PopoverContent, PopoverTrigger} from '~components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '~components/ui/command';
import {Button} from '~components/ui/button';
import {cn} from '~utils/shadcn';
import {CheckIcon} from 'lucide-react';
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {useSearchParams} from 'next/navigation';
import {SearchParams} from '~config/searchParams';

const Filters = () => {
    const {currentSearchParams, updateParams} = useAddSearchParams();

    const test = currentSearchParams.get(SearchParams.Category);

    const [selectedCategory, setSelectedCategory] = useState<Category | undefined>(
        undefined,
    );

    useEffect(() => {
        if (selectedCategory) {
            updateParams({category: selectedCategory}, [SearchParams.SubCategory]);
        }
    }, [selectedCategory]);

    return (
        <div className="flex flex-col gap-4">
            <div className="text-xl font-bold">{'Filtry'}</div>
            <div className="text-sm font-bold">{'Kategorie'}</div>
            <div className="flex flex-col gap-4">
                <Popover>
                    <PopoverTrigger asChild>
                        <Button
                            variant="outline"
                            role="combobox"
                            className={cn(
                                'w-[220px] justify-between',
                                !selectedCategory && 'text-muted-foreground',
                            )}
                        >
                            {selectedCategory || test}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[220px] h-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup className="overflow-scroll">
                                {Object.values(Category)
                                    .filter((value) => typeof value === 'string')
                                    .map((cat) => (
                                        <CommandItem
                                            value={cat as string}
                                            key={cat}
                                            onSelect={() => {
                                                setSelectedCategory(cat as Category);
                                            }}
                                        >
                                            <CheckIcon
                                                className={cn(
                                                    'mr-2 h-4 w-4',
                                                    cat === selectedCategory ||
                                                        cat === test
                                                        ? 'opacity-100'
                                                        : 'opacity-0',
                                                )}
                                            />
                                            {cat}
                                        </CommandItem>
                                    ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div>
                    {selectedCategory &&
                        Object.keys(subCategoryEnums[selectedCategory] || {})
                            .filter((key) => isNaN(Number(key)))
                            .map((key, index) => {
                                const subCatValue =
                                    subCategoryEnums[selectedCategory][index];

                                return (
                                    <div
                                        key={index}
                                        className="flex gap-1 items-center cursor-pointer"
                                        onClick={() => {
                                            updateParams({subCategory: subCatValue});
                                        }}
                                    >
                                        {subCatValue}
                                    </div>
                                );
                            })}
                </div>
            </div>
        </div>
    );
};

export default Filters;
