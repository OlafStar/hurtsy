'use client';
import {CaretSortIcon} from '@radix-ui/react-icons';
import React, {useState} from 'react';
import {CheckIcon, XIcon} from 'lucide-react';

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
import {useAddSearchParams} from '~hooks/useAddSearchParams';
import {SearchParams, SearchParamsType} from '~config/searchParams';
import ClearFilterButton from '~components/atoms/ClearFilterButton';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

type FilterCategoriesProps = {
    params?: SearchParamsType;
};

const FilterCategories = ({params}: FilterCategoriesProps) => {
    const {updateParams} = useAddSearchParams();

    const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
        params?.category ? (params?.category as string) : undefined,
    );

    return (
        <>
            <div className="flex justify-between text-sm font-bold">
                <div>{'Kategorie'}</div>
                <ClearFilterButton
                    paramsToDelete={[
                        SearchParams.Category,
                        SearchParams.SubCategory,
                    ]}
                >
                    {'Wyczyść'}
                </ClearFilterButton>
            </div>
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
                            {params?.category
                                ? translateEnumValueToPolish(
                                      (params?.category as string) ||
                                          (selectedCategory as string),
                                  )
                                : 'Znajdz kategorie'}
                            <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                        </Button>
                    </PopoverTrigger>

                    <PopoverContent className="w-[220px] h-[300px] p-0">
                        <Command>
                            <CommandInput placeholder="Search category..." />
                            <CommandEmpty>{'No category found.'}</CommandEmpty>
                            <CommandGroup className="overflow-scroll">
                                {Object.entries(Category).map(([_, cat]) => (
                                    <CommandItem
                                        value={cat as string}
                                        key={cat}
                                        onSelect={() => {
                                            updateParams({category: cat}, [
                                                SearchParams.SubCategory,
                                            ]);
                                            setSelectedCategory(cat);
                                        }}
                                    >
                                        <CheckIcon
                                            className={cn(
                                                'mr-2 h-4 w-4',
                                                cat === params?.category
                                                    ? 'opacity-100'
                                                    : 'opacity-0',
                                            )}
                                        />
                                        {translateEnumValueToPolish(cat)}
                                    </CommandItem>
                                ))}
                            </CommandGroup>
                        </Command>
                    </PopoverContent>
                </Popover>
                <div className="flex-col flex gap-2">
                    {selectedCategory &&
                        params?.category &&
                        Object.entries(
                            subCategoryEnums[
                                selectedCategory.charAt(0).toUpperCase() +
                                    selectedCategory.slice(1)
                            ] || {},
                        ).map(([_, value], index) => {
                            return (
                                <div
                                    key={index}
                                    className={`flex text-xs items-center cursor-pointer justify-between ${
                                        params?.subCategory === value && 'font-bold'
                                    }`}
                                >
                                    <div
                                        onClick={() => {
                                            updateParams({subCategory: value});
                                        }}
                                    >
                                        {translateEnumValueToPolish(value)}
                                    </div>
                                    {value === params?.subCategory && (
                                        <ClearFilterButton
                                            paramsToDelete={[
                                                SearchParams.SubCategory,
                                            ]}
                                        >
                                            <XIcon className="w-4 h-4" />
                                        </ClearFilterButton>
                                    )}
                                </div>
                            );
                        })}
                </div>
            </div>
        </>
    );
};

export default FilterCategories;
