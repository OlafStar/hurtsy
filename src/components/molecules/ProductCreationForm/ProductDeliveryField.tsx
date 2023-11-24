import {FieldPath, FieldValues, useFormContext} from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~components/ui/form';
import {Input} from '~components/ui/input';

import {FormFieldProps} from '../../../types/formFieldTypes';

const ProductDeliveryField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
}: FormFieldProps<TFieldValues, TName>) => {
    const {setValue} = useFormContext();

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setValue('deliveryPrice', value ? parseFloat(value) : undefined);
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
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{'Delivery price'}</FormLabel>
                    <FormControl>
                        <Input
                            type="number" // Set input type as number
                            step="0.01" // Set step to allow decimal values
                            placeholder="Delivery price"
                            {...field}
                            onWheel={numberInputOnWheelPreventChange}
                            onChange={handleValueChange}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ProductDeliveryField;
