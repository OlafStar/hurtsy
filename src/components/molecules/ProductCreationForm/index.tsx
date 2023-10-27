'use client';
import {useFieldArray, useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
} from '~/components/ui/form';
import {productFormSchema} from '~validations/product';
import {trpc} from '~app/_trpc/client';
import {useRouter} from 'next/navigation';
import {Button} from '~components/ui/button';
import {Input} from '~components/ui/input';
import React, {useState} from 'react';
import {Category, subCategoryEnums} from '~types/categories';
import {CaretSortIcon, CheckIcon} from '@radix-ui/react-icons';

import {Popover, PopoverContent, PopoverTrigger} from '~components/ui/popover';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
} from '~components/ui/command';
import {cn} from '~utils/shadcn';
import {Checkbox} from '~components/ui/checkbox';
import {productFormDefaultValues} from '~config/formDefaultValues';

const ProductCreationForm = () => {
    const [selectedMainCategory, setSelectedMainCategory] = useState('');

    const router = useRouter();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: productFormDefaultValues,
    });

    const {
        fields: priceFields,
        append: appendPrice,
        remove: removePrice,
    } = useFieldArray({
        control: form.control,
        name: 'prices',
    });

    const {
        fields: customizationFields,
        append: appendCustomization,
        remove: removeCustomization,
    } = useFieldArray({
        control: form.control,
        name: 'customizations',
    });

    const {
        fields: customPropertiesFields,
        append: appendCustomProperty,
        remove: removeCustomProperty,
    } = useFieldArray({
        control: form.control,
        name: 'customProperties',
    });

    const {mutateAsync} = trpc.createProduct.useMutation(); // You'll need to define this

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        // try {
        //     const response = await mutateAsync(values);

        //     console.log('Product created:', response);
        //     form.reset();
        //     router.push(DashboardRoutes.PRODUCTS); // Assuming you have a PRODUCTS route
        // } catch (error) {
        //     console.error('Error creating product:', error);
        // }
        console.log(values);
    }

    return (
        <div className="p-4">
            <Form {...form}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-2">
                    <div className="grid grid-cols-2 gap-4">
                        <div className="flex flex-col gap-8">
                            <FormField
                                control={form.control}
                                name="name"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Nazwa produktu</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Nazwa produktu"
                                                {...field}
                                            />
                                        </FormControl>
                                        <FormDescription>
                                            Description for product name.
                                        </FormDescription>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="description"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Product Description</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Product description"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="mainImage"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Main Image URL</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="URL for main product image"
                                                {...field}
                                            />
                                        </FormControl>
                                    </FormItem>
                                )}
                            />

                            <FormField
                                control={form.control}
                                name="category.mainCategory"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Main Category</FormLabel>
                                        <Popover>
                                            <PopoverTrigger asChild>
                                                <FormControl>
                                                    <Button
                                                        variant="outline"
                                                        role="combobox"
                                                        className={cn(
                                                            'w-[300px] justify-between',
                                                            !field.value &&
                                                                'text-muted-foreground',
                                                        )}
                                                    >
                                                        {field.value ||
                                                            'Select category'}
                                                        <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                                                    </Button>
                                                </FormControl>
                                            </PopoverTrigger>

                                            <PopoverContent className="w-[300px] p-0">
                                                <Command>
                                                    <CommandInput placeholder="Search category..." />
                                                    <CommandEmpty>
                                                        No category found.
                                                    </CommandEmpty>
                                                    <CommandGroup>
                                                        {Object.values(Category)
                                                            .filter(
                                                                (value) =>
                                                                    typeof value ===
                                                                    'string',
                                                            )
                                                            .map((cat) => (
                                                                <CommandItem
                                                                    value={
                                                                        cat as string
                                                                    }
                                                                    key={cat}
                                                                    onSelect={() => {
                                                                        form.setValue(
                                                                            'category.mainCategory',
                                                                            cat as string,
                                                                        );
                                                                        setSelectedMainCategory(
                                                                            cat as string,
                                                                        );
                                                                    }}
                                                                >
                                                                    <CheckIcon
                                                                        className={cn(
                                                                            'mr-2 h-4 w-4',
                                                                            cat ===
                                                                                field.value
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

                                        <FormMessage />
                                    </FormItem>
                                )}
                            />
                            <div>
                                {Object.keys(
                                    subCategoryEnums[selectedMainCategory] || {},
                                )
                                    .filter((key) => isNaN(Number(key)))
                                    .map((key, index) => {
                                        console.log(key);
                                        const subCatValue =
                                            subCategoryEnums[selectedMainCategory][
                                                index
                                            ];

                                        return (
                                            <FormField
                                                key={index}
                                                control={form.control}
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
                                                                        subCatValue,
                                                                    )}
                                                                    onCheckedChange={(
                                                                        checked,
                                                                    ) => {
                                                                        return checked
                                                                            ? field.onChange(
                                                                                  [
                                                                                      ...field.value,
                                                                                      subCatValue,
                                                                                  ],
                                                                              )
                                                                            : field.onChange(
                                                                                  field.value?.filter(
                                                                                      (
                                                                                          value,
                                                                                      ) =>
                                                                                          value !==
                                                                                          subCatValue,
                                                                                  ),
                                                                              );
                                                                    }}
                                                                />
                                                            </FormControl>
                                                            <FormLabel className="font-normal">
                                                                {subCatValue}
                                                            </FormLabel>
                                                        </FormItem>
                                                    );
                                                }}
                                            />
                                        );
                                    })}
                            </div>
                        </div>
                        <div className="flex flex-col gap-8">
                            <div className="flex gap-4 flex-col">
                                {priceFields.map((field, index) => (
                                    <div
                                        className="flex gap-4"
                                        key={`${field.id}-${index}`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`prices.${index}.price`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>price</FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(event) =>
                                                                field.onChange(
                                                                    +event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`prices.${index}.minQuantity`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        minQuantity
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(event) =>
                                                                field.onChange(
                                                                    +event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`prices.${index}.maxQuantity`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        maxQuantity
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(event) =>
                                                                field.onChange(
                                                                    +event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendPrice({
                                            price: 0,
                                            minQuantity: 0,
                                            maxQuantity: 0,
                                        })
                                    }
                                >
                                    Add price
                                </Button>
                            </div>

                            <FormField
                                control={form.control}
                                name="deliveryPrice"
                                render={({field}) => (
                                    <FormItem>
                                        <FormLabel>Delivery price</FormLabel>
                                        <FormControl>
                                            <Input
                                                placeholder="Delivery price"
                                                type="number"
                                                min={0}
                                                {...field}
                                                onChange={(event) =>
                                                    field.onChange(
                                                        +event.target.value,
                                                    )
                                                }
                                            />
                                        </FormControl>
                                        <FormMessage />
                                    </FormItem>
                                )}
                            />

                            <div className="flex gap-4 flex-col">
                                {customizationFields.map((field, index) => (
                                    <div
                                        className="flex gap-4"
                                        key={`${field.id}-${index}`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`customizations.${index}.name`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`customizations.${index}.minQuantity`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>
                                                        minQuantity
                                                    </FormLabel>
                                                    <FormControl>
                                                        <Input
                                                            type="number"
                                                            min={0}
                                                            {...field}
                                                            onChange={(event) =>
                                                                field.onChange(
                                                                    +event.target
                                                                        .value,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendCustomization({
                                            name: '',
                                            minQuantity: 0,
                                        })
                                    }
                                >
                                    Add customization
                                </Button>
                            </div>

                            <div className="flex gap-4 flex-col">
                                {customPropertiesFields.map((field, index) => (
                                    <div
                                        className="flex gap-4"
                                        key={`${field.id}-${index}`}
                                    >
                                        <FormField
                                            control={form.control}
                                            name={`customProperties.${index}.name`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>name</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                        <FormField
                                            control={form.control}
                                            name={`customProperties.${index}.value`}
                                            render={({field}) => (
                                                <FormItem>
                                                    <FormLabel>value</FormLabel>
                                                    <FormControl>
                                                        <Input {...field} />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    </div>
                                ))}
                                <Button
                                    type="button"
                                    onClick={() =>
                                        appendCustomProperty({
                                            name: '',
                                            value: '',
                                        })
                                    }
                                >
                                    Add custom property
                                </Button>
                            </div>
                        </div>
                    </div>
                    <Button type="submit">Submit</Button>
                </form>
            </Form>
        </div>
    );
};

export default ProductCreationForm;
