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

const ProductDescriptionField = <
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
            render={({field}) => (
                <FormItem>
                    <FormLabel>{'Product Description'}</FormLabel>
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

export default ProductDescriptionField;
