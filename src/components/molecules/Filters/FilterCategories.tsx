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
import {SearchParams, SearchParamsType} from '~config/searchParams';

type FilterCategoriesProps = {
    params?: SearchParamsType;
};

const FilterCategories = ({params}: FilterCategoriesProps) => {
    const {updateParams} = useAddSearchParams();

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        params?.category ? (params?.category as string) : undefined,
    );

    useEffect(() => {
        if (selectedCategory) {
            updateParams({category: selectedCategory}, [SearchParams.SubCategory]);
        }
    }, [selectedCategory]);
    return (
        <>
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
                            {selectedCategory || params?.category
                                ? params?.category
                                : 'Znajdz kategorie'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[220px] h-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>No category found.</CommandEmpty>
                            <CommandGroup className="overflow-scroll">
                                {Object.entries(Category).map(([key, cat]) => (
                                    <CommandItem
                                        value={cat as string}
                                        key={cat}
                                        onSelect={() => {
                                            setSelectedCategory(cat as string);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                cat === selectedCategory ||
                                                    cat === params?.category
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
                <div className="flex-col flex gap-2">
                    {selectedCategory &&
                        Object.entries(
                            subCategoryEnums[
                                selectedCategory.charAt(0).toUpperCase() +
                                    selectedCategory.slice(1)
                            ] || {},
                        ).map(([key, value], index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex text-xs items-center cursor-pointer ${
                                        params?.subCategory === value && 'font-bold'
                                    }`}
                                    onClick={() => {
                                        updateParams({subCategory: value});
                                    }}
                                >
                                    {value}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default FilterCategories;
