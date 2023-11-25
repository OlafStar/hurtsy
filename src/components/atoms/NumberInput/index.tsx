import {useFormContext} from 'react-hook-form';
import * as React from 'react';

import {cn} from '~/utils/shadcn';
import { InputProps } from '~components/ui/input';

export const NumberInput = React.forwardRef<
    HTMLInputElement,
    InputProps & {field: string; numbertype: 'int' | 'float'}
>(({className, type, ...props}, ref) => {
    const {setValue} = useFormContext();

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setValue(
                props.field,
                value
                    ? props.numbertype === 'float'
                        ? parseFloat(value)
                        : parseInt(value)
                    : undefined,
            );
        }
    };

    const numberInputOnWheelPreventChange = (e: any) => {
        e.target.blur();

        e.stopPropagation();

        setTimeout(() => {
            e.target.focus();
        }, 0);
    };
    return (
        <input
            className={cn(
                'flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50',
                className,
            )}
            type="number"
            onWheel={numberInputOnWheelPreventChange}
            onChange={handleValueChange}
            ref={ref}
            {...props}
            
        />
    );
});
NumberInput.displayName = 'NumberInput';
