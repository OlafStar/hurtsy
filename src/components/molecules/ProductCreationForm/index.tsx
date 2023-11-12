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
import {Dialog, DialogContent, DialogTrigger} from '~/components/ui/dialog';
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
import {
    generateDefaultValues,
    productFormDefaultValues,
} from '~config/formDefaultValues';
import FormFieldArray from '../FormFieldArray';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';
import UploadDropzone from '../UploadDropzone';
import {useUploadS3} from '~hooks/useUploadS3';
import {Progress} from '~components/ui/progress';
import {useUserCompany} from '~hooks/useUserCompany';
import useCompanyRepresentatives from '~hooks/useCompanyRepresentatives';
import {useToast} from '~components/ui/use-toast';
import {DashboardRoutes} from '~types/AppRoutes';
import useUserCompanyProducts from '~hooks/useUserCompanyProducts';
import {ProductWeb} from '~types/products';
import Tiptap from '~components/atoms/TipTap';
import AddImage from '~components/atoms/AddImage';

type ProductCreationFormProps = {isEdit?: boolean; initialData?: ProductWeb};

const ProductCreationForm = ({isEdit, initialData}: ProductCreationFormProps) => {
    const [selectedMainCategory, setSelectedMainCategory] = useState(
        initialData ? (initialData.category?.mainCategory as string) : '',
    );
    const [mainImage, setMainImage] = useState<Array<File | string>>(
        isEdit && initialData?.mainImage ? [initialData.mainImage] : [],
    );
    const [images, setImages] = useState<Array<File | string>>(
        isEdit && initialData?.images ? initialData.images : [],
    );
    const [descriptionImages, setDescriptionImages] = useState<Array<File>>([]);
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [isUploading, setIsUploading] = useState<boolean>(false);
    const [uploadProgress, setUploadProgress] = useState<number>(0);

    const {company} = useUserCompany();
    const {uploadImagesToS3} = useUploadS3();
    const {representatives} = useCompanyRepresentatives(company?.id || '');
    const {refetch} = useUserCompanyProducts();

    const router = useRouter();
    const {toast} = useToast();

    const form = useForm<z.infer<typeof productFormSchema>>({
        resolver: zodResolver(productFormSchema),
        defaultValues:
            isEdit && initialData
                ? generateDefaultValues(initialData)
                : productFormDefaultValues,
    });

    const {mutateAsync} = trpc.createProduct.useMutation();
    const {mutateAsync: editProduct} = trpc.editProduct.useMutation();

    const startSimulatedProgress = () => {
        setUploadProgress(0);

        const interval = setInterval(() => {
            setUploadProgress((prevProgress) => {
                if (prevProgress >= 95) {
                    clearInterval(interval);
                    return prevProgress;
                }
                return prevProgress + 5;
            });
        }, 500);

        return interval;
    };

    async function onSubmit(values: z.infer<typeof productFormSchema>) {
        try {
            if (company) {
                setIsOpen(true);
                setIsUploading(true);
                const progressInterval = startSimulatedProgress();

                const companyRepresentative = representatives?.find(
                    (element) => element.name === company.name,
                );

                let updatedDesc: string | undefined = undefined;
                if (descriptionImages.length > 0 && values.description) {
                    const keys = await uploadImagesToS3(descriptionImages);
                    const blobUrlRegex =
                        /<img [^>]*src=["'](blob:http:\/\/localhost:3000\/[^"']*)["']/g;
                    let localUrls = [];
                    let match;

                    // Use a loop to extract all matches
                    while (
                        (match = blobUrlRegex.exec(values.description)) !== null
                    ) {
                        // The actual blob URL is captured in the full match
                        localUrls.push(match[1]);
                    }

                    console.log(localUrls);

                    console.log(keys);
                    console.log(localUrls);
                    console.log(values.description);

                    let updatedDescription = values.description;

                    localUrls.forEach((localUrl, index) => {
                        const key = keys[index];
                        updatedDescription = updatedDescription.replace(
                            new RegExp(localUrl, 'g'),
                            key,
                        );
                    });
                    console.log(updatedDescription);
                    updatedDesc = updatedDescription;
                }

                if (isEdit && initialData) {
                    if ([...mainImage, ...images].length > 0) {
                        const keys = await uploadImagesToS3([
                            mainImage[0],
                            ...images,
                        ]);
                        const submitValues = {
                            companyId: company?.id || '',
                            ...values,
                            representativeId: companyRepresentative?.id || '',
                            mainImage: keys[0],
                            images: keys.slice(1),
                            id: initialData.id,
                            description: updatedDesc
                                ? updatedDesc
                                : values.description,
                        };
                        await editProduct(submitValues);
                    } else {
                        const submitValues = {
                            companyId: company?.id || '',
                            ...values,
                            representativeId: companyRepresentative?.id || '',
                            id: initialData.id,
                            description: updatedDesc
                                ? updatedDesc
                                : values.description,
                        };
                        await editProduct(submitValues);
                    }
                } else {
                    if ([...mainImage, ...images].length > 0) {
                        const keys = await uploadImagesToS3([
                            ...mainImage,
                            ...images,
                        ]);
                        const submitValues = {
                            companyId: company?.id || '',
                            ...values,
                            representativeId: companyRepresentative?.id || '',
                            mainImage: keys[0],
                            images: keys.slice(1),
                            description: updatedDesc
                                ? updatedDesc
                                : values.description,
                        };

                        await mutateAsync(submitValues);
                    } else {
                        const submitValues = {
                            companyId: company?.id || '',
                            ...values,
                            representativeId: companyRepresentative?.id || '',
                            description: updatedDesc
                                ? updatedDesc
                                : values.description,
                        };
                        await mutateAsync(submitValues);
                    }
                }

                await refetch();
                clearInterval(progressInterval);
                setUploadProgress(100);

                setIsUploading(false);
                setIsOpen(false);
                toast({
                    title: 'Success',
                    description: `Product ${
                        isEdit ? 'edytowany' : 'został stworzony'
                    }`,
                });
                router.refresh();
                router.push(DashboardRoutes.PRODUCTS);
            }
        } catch (error) {
            setUploadProgress(100);

            setIsUploading(false);
            setIsOpen(false);
            toast({
                title: 'Error',
                description: `Błąd z tworzeniem produktu`,
                variant: 'destructive',
            });
        }
    }

    return (
        <div className="p-4">
            <Dialog
                open={isOpen}
                onOpenChange={(v) => {
                    if (!v) {
                        setIsOpen(v);
                    }
                }}
            >
                <DialogContent hideClose>
                    {isUploading && (
                        <Progress
                            value={uploadProgress}
                            className="h-1 w-full bg-zinc-200"
                        />
                    )}
                </DialogContent>
            </Dialog>
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
                                {Object.entries(
                                    subCategoryEnums[
                                        selectedMainCategory
                                            .charAt(0)
                                            .toUpperCase() +
                                            selectedMainCategory.slice(1)
                                    ] || {},
                                ).map(([key, value], index) => {
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
                                                                    value,
                                                                )}
                                                                onCheckedChange={(
                                                                    checked,
                                                                ) => {
                                                                    return checked
                                                                        ? field.onChange(
                                                                              [
                                                                                  ...field.value,
                                                                                  value,
                                                                              ],
                                                                          )
                                                                        : field.onChange(
                                                                              field.value?.filter(
                                                                                  (
                                                                                      catValue,
                                                                                  ) =>
                                                                                      catValue !==
                                                                                      value,
                                                                              ),
                                                                          );
                                                                }}
                                                            />
                                                        </FormControl>
                                                        <FormLabel className="font-normal">
                                                            {value}
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
                                {mainImage.length > 0 ? (
                                    typeof mainImage[0] !== 'string' ? (
                                        <img
                                            className="w-[250px] h-[250px] object-cover"
                                            src={getImgBeforeUpload(mainImage[0])}
                                            onClick={() => setMainImage([])}
                                        />
                                    ) : (
                                        <img
                                            className="w-[250px] h-[250px] object-cover"
                                            src={mainImage[0]}
                                            onClick={() => setMainImage([])}
                                        />
                                    )
                                ) : (
                                    <AddImage
                                        multiple={false}
                                        onAcceptedImage={setMainImage}
                                    />
                                )}
                            </div>

                            <div className="flex flex-col gap-2 flex-wrap">
                                {images.map((item, index) => {
                                    if (typeof item !== 'string') {
                                        return (
                                            <img
                                                key={index}
                                                className="w-[121px] h-[121px] object-cover"
                                                src={getImgBeforeUpload(item)}
                                                onClick={() => {
                                                    const filteredImages =
                                                        images.filter(
                                                            (_, filterIndex) =>
                                                                filterIndex !==
                                                                index,
                                                        );
                                                    setImages(filteredImages);
                                                }}
                                            />
                                        );
                                    }
                                    return (
                                        <img
                                            key={index}
                                            className="w-[121px] h-[121px] object-cover"
                                            src={item}
                                            onClick={() => {
                                                const filteredImages = images.filter(
                                                    (_, filterIndex) =>
                                                        filterIndex !== index,
                                                );
                                                setImages(filteredImages);
                                            }}
                                        />
                                    );
                                })}
                            </div>
                            <AddImage
                                multiple={true}
                                currentState={images}
                                onAcceptedImage={setImages}
                            />
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
                                            <Tiptap
                                                content={
                                                    isEdit &&
                                                    initialData?.description
                                                        ? initialData.description
                                                        : field.name
                                                }
                                                onChange={field.onChange}
                                                {...{
                                                    descriptionImages,
                                                    setDescriptionImages,
                                                }}
                                            />
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
