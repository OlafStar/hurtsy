'use client';

import {ColumnDef} from '@tanstack/react-table';
import {MoreHorizontal} from 'lucide-react';
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
    {
        accessorKey: 'description',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Opis" />;
        },
    },
    {
        accessorKey: 'category',
        header: ({column}) => {
            return <DataTableColumnHeader column={column} title="Kategorie" />;
        },
        cell: ({row}) => {
            const categories: CategoryWeb = row.getValue('category');
            return (
                <div className="flex flex-col gap-1">
                    <div>{categories.mainCategory}</div>
                    <div className="flex gap-1">
                        {categories.subCategory.map((item, index) => (
                            <div key={`${item}-${index}`}>{item}</div>
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
                            <div>{`Cena: ${item.price}`}</div>
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
            const amount = parseFloat(row.getValue('deliveryPrice'));
            const formatted = new Intl.NumberFormat('pl-PL', {
                style: 'currency',
                currency: 'PLN',
            }).format(amount);

            return <div className="font-medium">{formatted}</div>;
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
                        <div key={index} className="flex  gap-1">
                            <div>{`${item.name}`}</div>
                            <div>{`Min szt: ${item.minQuantity}`}</div>
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
                <div className="flex flex-col gap-3">
                    {customizations?.map((item, index) => (
                        <div key={index} className="flex gap-1">
                            <div>{`${item.name}`}</div>
                            <div>{`${item.value}`}</div>
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

            return (
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <Button variant="ghost" className="h-8 w-8 p-0">
                            <span className="sr-only">Open menu</span>
                            <MoreHorizontal className="h-4 w-4" />
                        </Button>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent align="end">
                        <DropdownMenuLabel>{"Akcje"}</DropdownMenuLabel>
                        <DropdownMenuItem
                            onClick={() => navigator.clipboard.writeText(product.id)}
                        >
                            Copy payment ID
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>View customer</DropdownMenuItem>
                        <DropdownMenuItem>View payment details</DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            );
        },
    },
];