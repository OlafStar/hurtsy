'use client';
import {useForm} from 'react-hook-form';
import * as z from 'zod';
import {zodResolver} from '@hookform/resolvers/zod';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {CaretSortIcon, CheckIcon} from '@radix-ui/react-icons';

import {productFormSchema} from '~validations/product';
import {trpc} from '~app/_trpc/client';
import {Button} from '~components/ui/button';
import {Input} from '~components/ui/input';
import {Category, subCategoryEnums} from '~types/categories';
import {Dialog, DialogContent} from '~/components/ui/dialog';
import {
    Form,
    FormField,
    FormLabel,
    FormControl,
    FormDescription,
    FormMessage,
    FormItem,
} from '~/components/ui/form';
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
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';
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
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

import FormFieldArray from '../FormFieldArray';

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
        <div className="p-4 min-h-full flex flex-col">
            <div className="flex justify-between gap-4">
                <div className="flex flex-col gap-2 pb-[70px]">
                    <div className="text-2xl font-bold">
                        {isEdit ? 'Edytuj produkt' : 'Dodaj produkt'}
                    </div>
                    <div className="text-sm opacity-50">
                        {isEdit
                            ? 'Zaaktualizuj informacje w tym produkcie'
                            : 'Stworz produkt i zacznij zbierać oferty!'}
                    </div>
                </div>
                <div className="flex gap-4 xs:flex-row flex-col">
                    <Button variant="outline" type="button">
                        {'Podgląd'}
                    </Button>
                    <Button form="productForm" type="submit">
                        {isEdit ? 'Edytuj' : 'Dodaj'}
                    </Button>
                </div>
            </div>
            <Form {...form}>
                <form
                    id="productForm"
                    name="productForm"
                    onSubmit={form.handleSubmit(onSubmit)}
                    className="space-y-2 max-w-[800px] w-full mx-auto flex flex-col gap-10"
                >
                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="text-xl font-bold">
                                    {'Informacje o produkcie'}
                                </div>
                            </div>
                            <div className="w-full h-[1px] bg-black opacity-10" />
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
                                    <FormMessage />
                                </FormItem>
                            )}
                        />
                        <FormField
                            control={form.control}
                            name="category.mainCategory"
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
                                                        !field.value &&
                                                            'text-muted-foreground',
                                                    )}
                                                >
                                                    {field.value
                                                        ? translateEnumValueToPolish(
                                                              field.value,
                                                          )
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
                                                            (value) =>
                                                                typeof value ===
                                                                'string',
                                                        )
                                                        .map((cat) => (
                                                            <CommandItem
                                                                value={cat as string}
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
                                                                {translateEnumValueToPolish(
                                                                    cat,
                                                                )}
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
                                                    <FormLabel className="font-normal whitespace-nowrap">
                                                        {translateEnumValueToPolish(
                                                            value,
                                                        )}
                                                    </FormLabel>
                                                </FormItem>
                                            );
                                        }}
                                    />
                                );
                            })}
                        </div>
                        <FormField
                            control={form.control}
                            name="deliveryPrice"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{'Delivery price'}</FormLabel>
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

                    <div className="flex flex-col gap-6">
                        <div className="flex flex-col gap-3">
                            <div>
                                <div className="text-xl font-bold">{'Opis'}</div>
                            </div>
                            <div className="w-full h-[1px] bg-black opacity-10" />
                        </div>
                        <FormField
                            control={form.control}
                            name="description"
                            render={({field}) => (
                                <FormItem>
                                    <FormLabel>{'Product Description'}</FormLabel>
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

                    {/* <div className="flex flex-col gap-4">
                        <div className="flex gap-8">
                            
                            
                        </div>
                        
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
                       
                        
                        

                       
                    </div> */}
                </form>
            </Form>
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
        </div>
    );
};

export default ProductCreationForm;
