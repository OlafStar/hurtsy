import {FieldPath, FieldValues} from 'react-hook-form';

import {FormControl, FormField, FormItem, FormLabel} from '~components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~components/ui/select';
import {Countries} from '~config/countries';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

import {FormFieldProps} from '../../../types/formFieldTypes';

const CountryField = <
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
                <FormItem className="flex-1">
                    <FormLabel>{'Kraj'}</FormLabel>
                    <FormControl>
                        <Select
                            defaultValue={defaultValue ? defaultValue : undefined}
                            {...field}
                            onValueChange={field.onChange}
                        >
                            <SelectTrigger className="shadow-sm border border-input">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(Countries).map(
                                    ([_, value], index) => {
                                        return (
                                            <SelectItem key={index} value={value}>
                                                {translateEnumValueToPolish(value)}
                                            </SelectItem>
                                        );
                                    },
                                )}
                            </SelectContent>
                        </Select>
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default CountryField;
