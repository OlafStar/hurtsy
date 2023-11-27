import {FieldPath, FieldValues} from 'react-hook-form';

import {FormControl, FormField, FormItem, FormLabel} from '~components/ui/form';
import {Input} from '~components/ui/input';

import {FormFieldProps} from '../../../types/formFieldTypes';

const CompanyReusableField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
    placeholder,
    label,
}: FormFieldProps<TFieldValues, TName> & {placeholder?: string; label?: string}) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem className="flex-1">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input placeholder={placeholder} {...field} />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default CompanyReusableField;
