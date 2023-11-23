import {FieldPath, FieldValues} from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~components/ui/form';
import {Input} from '~components/ui/input';

import {FormFieldProps} from './types';

const ProductNameField = <
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
            defaultValue={defaultValue}
            name={name}
            render={({field}) => (
                <FormItem>
                    <FormLabel>{'Nazwa produktu'}</FormLabel>
                    <FormControl>
                        <Input placeholder="Nazwa produktu" {...field} />
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default ProductNameField;
