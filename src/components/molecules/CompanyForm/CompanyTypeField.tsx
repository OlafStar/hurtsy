import {FieldPath, FieldValues} from 'react-hook-form';
import {CompanyType} from '@prisma/client';

import {FormControl, FormField, FormItem, FormLabel} from '~components/ui/form';
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from '~components/ui/select';

import {FormFieldProps} from '../../../types/formFieldTypes';

const CompanyTypeField = <
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
                    <FormLabel>{'Typ firmy'}</FormLabel>
                    <FormControl>
                        <Select
                            defaultValue={defaultValue ? defaultValue : undefined}
                            onValueChange={field.onChange}
                            {...field}
                        >
                            <SelectTrigger className="shadow-sm border border-input">
                                <SelectValue placeholder="" />
                            </SelectTrigger>
                            <SelectContent>
                                {Object.entries(CompanyType).map(
                                    ([_, value], index) => {
                                        return (
                                            <SelectItem key={index} value={value}>
                                                {value}
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

export default CompanyTypeField;
