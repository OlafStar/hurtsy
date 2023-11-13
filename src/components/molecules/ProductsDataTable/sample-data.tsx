'use client';

import {ColumnDef} from '@tanstack/react-table';
import {CheckCircle, MoreHorizontal} from 'lucide-react';
import {useRouter} from 'next/navigation';

import {Checkbox} from '~/components/ui/checkbox';
import {Button} from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';
import DataTableColumnHeader from '~components/atoms/DataTableColumnHeader';
import {
    CategoryWeb,
    CustomPropertiesWeb,
    CustomizationWeb,
    PriceWeb,
    ProductWeb,
} from '~types/products';
import {trpc} from '~app/_trpc/client';
import useUserCompanyProducts from '~hooks/useUserCompanyProducts';
import {useToast} from '~components/ui/use-toast';
import {AppRoutes} from '~types/AppRoutes';
import {parseNumberToCurrency} from '~utils/parseNumberToCurrency';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';
export const columns: ColumnDef<ProductWeb>[] = [
    {
        id: 'select',
        header: ({table}) => (
            <Checkbox
                checked={table.getIsAllPageRowsSelected()}
                onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
                aria-label="Select all"
            />
        ),
        cell: ({row}) => (
            <Checkbox
                checked={row.getIsSelected()}
                onCheckedChange={(value) => row.toggleSelected(!!value)}
                aria-label="Select row"
            />
        ),
        enableSorting: false,
        enableHiding: false,
    },
    {
        accessorKey: 'mainImage',
        header: ({column}) => {
            return (
                <DataTableColumnHeader column={column} title="Zdjęcie" disableSort />
            );
        },
        cell: ({row}) => {
            const image = String(row.getValue('mainImage'));

            return <img src={`${image}`} alt={image} width={50} height={50} />;
        },
    },
    {
        accessorKey: 'name',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Nazwa" />;
        },
    },
    // {
    //     accessorKey: 'description',
    //     header: ({column}) => {
    //         return <DataTableColumnHeader column={column} title="Opis" />;
    //     },
    // },
    {
        accessorKey: 'category',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Kategorie" />;
        },
        cell: ({row}) => {
            const categories: CategoryWeb = row.getValue('category');
            return (
                <div className="flex flex-col gap-1">
                    <div className="font-medium">
                        {translateEnumValueToPolish(categories.mainCategory)}
                    </div>
                    <div className="flex flex-col gap-1">
                        {categories.subCategory.map((item, index) => (
                            <div
                                key={`${item}-${index}`}
                                className="text-xs whitespace-nowrap text-ellipsis opacity-50"
                            >
                                {translateEnumValueToPolish(item)}
                            </div>
                        ))}
                    </div>
                </div>
            );
        },
    },
    {
        accessorKey: 'prices',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Ceny" />;
        },
        cell: ({row}) => {
            const prices: PriceWeb[] = row.getValue('prices');
            return (
                <div className="flex flex-col gap-3">
                    {prices.map((item, index) => (
                        <div
                            key={index}
                            className="flex flex-col gap-1 flex-shrink-0 flex-nowrap whitespace-nowrap"
                        >
                            <div className="flex gap-1">
                                <div>{`Cena: `}</div>
                                <div className="font-bold">{`${parseNumberToCurrency(
                                    item.price,
                                )}`}</div>
                            </div>
                            <div className="flex gap-1 flex-shrink-0 flex-nowrap whitespace-nowrap">
                                <div>{`Min szt: ${item.minQuantity}`}</div>
                                <div>{`Max szt: ${item.maxQuantity}`}</div>
                            </div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'deliveryPrice',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Cena dostawy" />;
        },
        cell: ({row}) => {
            return (
                <div className="font-medium">
                    {parseNumberToCurrency(row.getValue('deliveryPrice'))}
                </div>
            );
        },
    },
    {
        accessorKey: 'customizations',
        header: ({column}) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title="Dostosowania"
                    disableSort
                />
            );
        },
        cell: ({row}) => {
            const customizations: CustomizationWeb[] | undefined =
                row.getValue('customizations');
            return (
                <div className="flex flex-col gap-3">
                    {customizations?.map((item, index) => (
                        <div key={index} className="flex flex-col gap-1">
                            <div>{`${item.name}`}</div>
                            <div className="text-xs opacity-50">{`Min szt: ${item.minQuantity}`}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        accessorKey: 'customProperties',
        header: ({column}) => {
            return (
                <DataTableColumnHeader
                    column={column}
                    title="Niestandardowe"
                    disableSort
                />
            );
        },
        cell: ({row}) => {
            const customizations: CustomPropertiesWeb[] | undefined =
                row.getValue('customProperties');
            return (
                <div className="text-xs flex flex-col gap-1">
                    {customizations?.map((item, index) => (
                        <div key={index} className="flex gap-1">
                            <div>{`${item.name}:`}</div>
                            <div className="font-medium">{`${item.value}`}</div>
                        </div>
                    ))}
                </div>
            );
        },
    },
    {
        id: 'actions',
        cell: ({row}) => {
            const product = row.original;
            const {mutateAsync} = trpc.deleteProduct.useMutation();
            const {mutateAsync: createProduct} = trpc.createProduct.useMutation();
            const {mutateAsync: promote} = trpc.promoteProduct.useMutation();
            const {mutateAsync: bump} = trpc.bumpProduct.useMutation();
            const {refetch} = useUserCompanyProducts();
            const {toast} = useToast();
            const router = useRouter();
            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">{'Open menu'}</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{'Akcje'}</DropdownMenuLabel>
                        {!product.promotedTo ||
                        new Date(product.promotedTo) < new Date() ? (
                            <DropdownMenuItem
                                onClick={async () => {
                                    await promote(product.id);
                                    await refetch();
                                    toast({
                                        title: 'Succes',
                                        description: 'Product has been promoted',
                                    });
                                    router.refresh();
                                }}
                            >
                                {'Promuj'}
                            </DropdownMenuItem>
                        ) : (
                            <DropdownMenuItem className="pointer-events-none opacity-40 flex gap-1">
                                <CheckCircle className="h-3 w-3" />
                                <div>{'Promowany'}</div>
                            </DropdownMenuItem>
                        )}

                        <DropdownMenuItem
                            onClick={async () => {
                                bump(product.id);
                                await refetch();
                                toast({
                                    title: 'Succes',
                                    description: 'Product has been refreshed',
                                });
                                router.refresh();
                            }}
                        >
                            {'Odśwież'}
                        </DropdownMenuItem>

                        <DropdownMenuItem
                            onClick={() =>
                                router.push(
                                    `${AppRoutes.EDIT_PRODUCTS}/${product.id}`,
                                )
                            }
                        >
                            {'Edytuj'}
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                            onClick={async () => {
                                await mutateAsync({id: product.id});
                                await refetch();
                                toast({
                                    title: 'Succes',
                                    description: 'Product has been deleted',
                                });
                            }}
                        >
                            {'Delete product'}
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            onClick={async () => {
                                //@ts-expect-error
                                await createProduct(product);
                                await refetch();
                                toast({
                                    title: 'Succes',
                                    description: 'Product has been copied',
                                });
                            }}
                        >
                            {'Copy product'}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];
