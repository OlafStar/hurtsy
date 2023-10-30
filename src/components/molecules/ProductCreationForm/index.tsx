'use client';
import {useForm} from 'react-hook-form';
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
import React, {useEffect, useState} from 'react';
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
import FormFieldArray from '../FormFieldArray';
import {useBlockNote} from '@blocknote/react';
import {BlockNoteEditor} from '@blocknote/core';
import {BlockNoteView} from '@blocknote/react';
import '@blocknote/core/style.css';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';
import UploadDropzone from '../UploadDropzone';
const ProductCreationForm = () => {
    const [selectedMainCategory, setSelectedMainCategory] = useState('');
    const [editorState, setEditorState] = useState('');
    const [mainImage, setMainImage] = useState<File[]>([]);
    const [images, setImages] = useState<File[]>([]);

    const editor: BlockNoteEditor = useBlockNote({
        initialContent: undefined,
        onEditorContentChange: (editor) => {
            setEditorState(JSON.stringify(editor.topLevelBlocks));
        },
    });

    useEffect(() => {
        form.setValue('description', `${editorState}`);
    }, [editorState]);

    useEffect(() => {
        console.log(mainImage);
    }, [mainImage]);

    const router = useRouter();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues: productFormDefaultValues,
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
                    <Button type="submit">Submit</Button>
                    <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                            <FormField
                                control={form.control}
                                name="category.mainCategory"
                                render={({field}) => (
                                    <FormItem className="flex flex-col">
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
                                                                        form.setValue(
                                                                            'category.subCategory',
                                                                            [],
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
                        <FormField
                            control={form.control}
                            name="name"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{'Nazwa produktu'}</FormLabel>
                                    <FormControl>
                                        <Input
                                            placeholder="Nazwa produktu"
                                            {...field}
                                        />
                                    </FormControl>
                                    <FormDescription>
                                        {
                                            'Nazwa produktu dzięki której użytkownik znajdzie twój produkt'
                                        }
                                    </FormDescription>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <div className="flex gap-4 h-[250px]">
                            <div>
                                {mainImage.length === 0 && (
                                    <UploadDropzone
                                        multiple={false}
                                        setAcceptedImages={setMainImage}
                                        className="w-[250px] h-[250px]"
                                    />
                                )}

                                {mainImage.map((item, index) => (
                                    <img
                                        key={index}
                                        className="w-[250px] h-[250px] object-cover"
                                        src={getImgBeforeUpload(item)}
                                    />
                                ))}
                            </div>

                            <div className="flex flex-col gap-2 flex-wrap">
                                {images.map((item, index) => (
                                    <img
                                        key={index}
                                        className="w-[121px] h-[121px] object-cover"
                                        src={getImgBeforeUpload(item)}
                                    />
                                ))}
                            </div>
                            <div className="h-[250px] w-[250px]">
                                <UploadDropzone
                                    multiple={true}
                                    files={images}
                                    setAcceptedImages={setImages}
                                    className="h-full w-full"
                                />
                            </div>
                        </div>
                        <FormFieldArray
                            control={form.control}
                            name="prices"
                            defaultValue={{
                                price: 0,
                                minQuantity: 0,
                                maxQuantity: 0,
                            }}
                        />
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
                                                field.onChange(+event.target.value)
                                            }
                                        />
                                    </FormControl>
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormFieldArray
                            control={form.control}
                            name="customizations"
                            defaultValue={{
                                name: '',
                                minQuantity: 0,
                            }}
                        />
                        <FormFieldArray
                            control={form.control}
                            name="customProperties"
                            defaultValue={{
                                name: '',
                                value: '',
                            }}
                        />

                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>Product Description</FormLabel>
                                    <FormControl>
                                        <div>
                                            <BlockNoteView editor={editor} />
                                        </div>
                                    </FormControl>
                                </FormItem>
                            )}
                        />
                    </div>
                </form>
            </Form>
        </div>
    );
};

export default ProductCreationForm;
