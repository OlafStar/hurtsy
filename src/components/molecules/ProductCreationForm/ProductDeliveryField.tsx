import {FieldPath, FieldValues} from 'react-hook-form';

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
                            type="number"
                            {...field}
                            onChange={(event) => {
                                if (event.target.value === '') {
                                    return field.onChange(event.target.value);
                                }
                                return field.onChange(+event.target.value);
                            }}
                            //@ts-expect-error
                            onWheel={(e) => e.target.blur()}
                        />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ProductDeliveryField;
