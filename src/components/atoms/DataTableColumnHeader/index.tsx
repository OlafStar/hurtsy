import {
    ArrowDownIcon,
    ArrowUpIcon,
    CaretSortIcon,
    EyeNoneIcon,
} from '@radix-ui/react-icons';
import {Column} from '@tanstack/react-table';

import {cn} from '~/utils/shadcn';
import {Button} from '~/components/ui/button';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from '~/components/ui/dropdown-menu';

interface DataTableColumnHeaderProps<TData, TValue>
    extends React.HTMLAttributes<HTMLDivElement> {
    column: Column<TData, TValue>;
    title: string;
    disableSort?: boolean;
}

const DataTableColumnHeader = <TData, TValue>({
    column,
    title,
    className,
    disableSort,
}: DataTableColumnHeaderProps<TData, TValue>) => {
    if (!column.getCanSort()) {
        return <div className={cn(className)}>{title}</div>;
    }

    return (
        <div className={cn('flex items-center space-x-2', className)}>
            <DropdownMenu>
                <DropdownMenuTrigger asChild>
                    <Button
                        variant="ghost"
                        size="sm"
                        className="-ml-3 h-8 data-[state=open]:bg-accent"
                    >
                        <span>{title}</span>
                        {!disableSort &&
                            (column.getIsSorted() === 'desc' ? (
                                <ArrowDownIcon className="ml-2 h-4 w-4" />
                            ) : column.getIsSorted() === 'asc' ? (
                                <ArrowUpIcon className="ml-2 h-4 w-4" />
                            ) : (
                                <CaretSortIcon className="ml-2 h-4 w-4" />
                            ))}
                    </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="start">
                    {!disableSort && (
                        <>
                            <DropdownMenuItem
                                onClick={() => column.toggleSorting(false)}
                            >
                                <ArrowUpIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                {'Rosnąco'}
                            </DropdownMenuItem>
                            <DropdownMenuItem
                                onClick={() => column.toggleSorting(true)}
                            >
                                <ArrowDownIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                                {'Malejąco'}
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                        </>
                    )}

                    <DropdownMenuItem onClick={() => column.toggleVisibility(false)}>
                        <EyeNoneIcon className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
                        {'Ukryj'}
                    </DropdownMenuItem>
                </DropdownMenuContent>
            </DropdownMenu>
        </div>
    );
};

export default DataTableColumnHeader;
