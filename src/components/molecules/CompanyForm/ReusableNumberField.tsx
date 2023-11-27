import {FieldPath, FieldValues, useFormContext} from 'react-hook-form';

import {FormControl, FormField, FormItem, FormLabel} from '~components/ui/form';
import {Input} from '~components/ui/input';

import {FormFieldProps} from '../../../types/formFieldTypes';

const ReusableNumberField = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
    placeholder,
    label,
    numberType,
    customReg,
    formatFunction,
}: FormFieldProps<TFieldValues, TName> & {
    placeholder?: string;
    label?: string;
    numberType: 'float' | 'int' | 'string';
    customReg?: RegExp;
    formatFunction?: (value: string) => string;
}) => {
    const {setValue} = useFormContext();

    const handleChangeValue = (e: React.ChangeEvent<HTMLInputElement>) => {
        let value = e.target.value;

        if (numberType === 'string') {
            if (customReg ? customReg.test(value) : /^\d*\.?\d{0,2}$/.test(value)) {
                //@ts-expect-error
                setValue(name, String(value));

                if (formatFunction) {
                    value = formatFunction(value);
                    console.log(value);
                    //@ts-expect-error
                    setValue(name, String(value));
                }
            }
        } else {
            if (customReg ? customReg.test(value) : /^\d*\.?\d{0,2}$/.test(value)) {
                setValue(
                    name,
                    //@ts-expect-error
                    numberType === 'float' ? parseFloat(value) : parseInt(value),
                );

                if (formatFunction) {
                    value = formatFunction(value);
                    console.log(value);
                    setValue(
                        name,
                        //@ts-expect-error
                        numberType === 'float' ? parseFloat(value) : parseInt(value),
                    );
                }
            }
        }
    };

    return (
        <FormField
            control={control}
            name={name}
            defaultValue={defaultValue}
            render={({field}) => (
                <FormItem className="flex-1">
                    {label && <FormLabel>{label}</FormLabel>}
                    <FormControl>
                        <Input
                            placeholder={placeholder}
                            {...field}
                            onChange={handleChangeValue}
                        />
                    </FormControl>
                </FormItem>
            )}
        />
    );
};

export default ReusableNumberField;
