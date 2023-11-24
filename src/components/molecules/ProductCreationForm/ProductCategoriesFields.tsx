import {FieldPath, FieldValues, useFormContext} from 'react-hook-form';
import {useState} from 'react';
import {CaretSortIcon} from '@radix-ui/react-icons';
import {CheckIcon} from 'lucide-react';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~components/ui/form';
import {Popover, PopoverContent, PopoverTrigger} from '~components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '~components/ui/command';
import {Button} from '~components/ui/button';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';
import {Category, subCategoryEnums} from '~types/categories';
import {cn} from '~utils/shadcn';
import {Checkbox} from '~components/ui/checkbox';

import {FormFieldProps} from '../../../types/formFieldTypes';

const ProductCategoriesFields = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
}: FormFieldProps<TFieldValues, TName>) => {
    const [selectedMainCategory, setSelectedMainCategory] = useState(
        defaultValue ? (defaultValue as Category) : undefined,
    );

    const {setValue} = useFormContext();

    return (
        <>
            <FormField
                control={control}
                name={name}
                render={({field}) => (
                    <FormItem className="flex flex-col">
                        <FormLabel>{'Main Category'}</FormLabel>
                        <Popover>
                            <PopoverTrigger asChild>
                                <FormControl>
                                    <Button
                                        variant="outline"
                                        role="combobox"
                                        className={cn(
                                            'justify-between',
                                            !field.value && 'text-muted-foreground',
                                        )}
                                    >
                                        {field.value
                                            ? translateEnumValueToPolish(field.value)
                                            : 'Select category'}
                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                    </Button>
                                </FormControl>
                            </PopoverTrigger>

                            <PopoverContent className="p-0">
                                <Command>
                                    <CommandInput placeholder="Search category..." />
                                    <CommandEmpty>
                                        {'No category found.'}
                                    </CommandEmpty>
                                    <CommandGroup>
                                        {Object.values(Category)
                                            .filter(
                                                (value) => typeof value === 'string',
                                            )
                                            .map((cat) => (
                                                <CommandItem
                                                    value={cat as string}
                                                    key={cat}
                                                    onSelect={() => {
                                                        setValue(
                                                            'category.mainCategory',
                                                            cat,
                                                        );
                                                        setSelectedMainCategory(cat);
                                                        setValue(
                                                            'category.subCategory',
                                                            [],
                                                        );
                                                    }}
                                                >
                                                    <CheckIcon
                                                        className={cn(
                                                            'mr-2 h-4 w-4',
                                                            cat === field.value
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

                        <FormMessage />
                    </FormItem>
                )}
            />
            {selectedMainCategory && (
                <div className="flex justify-around gap-4 flex-wrap min-h-[16px]">
                    {Object.entries(
                        subCategoryEnums[
                            selectedMainCategory.charAt(0).toUpperCase() +
                                selectedMainCategory.slice(1)
                        ] || {},
                    ).map(([_, value], index) => {
                        return (
                            <FormField
                                key={index}
                                control={control}
                                //@ts-expect-error
                                name="category.subCategory"
                                render={({field}) => {
                                    return (
                                        <FormItem
                                            key={index}
                                            className="flex flex-row items-start space-x-3 space-y-0"
                                        >
                                            <FormControl>
                                                <Checkbox
                                                    checked={field.value?.includes(
                                                        value,
                                                    )}
                                                    onCheckedChange={(checked) => {
                                                        return checked
                                                            ? field.onChange([
                                                                  ...field.value,
                                                                  value,
                                                              ])
                                                            : field.onChange(
                                                                  field.value?.filter(
                                                                      (
                                                                          catValue: string,
                                                                      ) =>
                                                                          catValue !==
                                                                          value,
                                                                  ),
                                                              );
                                                    }}
                                                />
                                            </FormControl>
                                            <FormLabel className="font-normal whitespace-nowrap">
                                                {translateEnumValueToPolish(value)}
                                            </FormLabel>
                                        </FormItem>
                                    );
                                }}
                            />
                        );
                    })}
                </div>
            )}
        </>
    );
};

export default ProductCategoriesFields;
