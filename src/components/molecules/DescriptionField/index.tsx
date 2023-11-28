import {FieldPath, FieldValues} from 'react-hook-form';

import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~components/ui/form';
import Tiptap from '~components/atoms/TipTap';

import {FormFieldProps} from '../../../types/formFieldTypes';

const DescriptionField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
    label,
}: FormFieldProps<TFieldValues, TName> & {label?: string}) => {
    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem>
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <div>
                            <Tiptap
                                content={defaultValue}
                                onChange={field.onChange}
                            />
                        </div>
                    </FormControl>
                    <FormMessage />
                </FormItem>
            )}
        />
    );
};

export default DescriptionField;
