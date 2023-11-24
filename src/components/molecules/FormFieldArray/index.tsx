import {MinusIcon} from '@radix-ui/react-icons';
import {
    FieldArrayPath,
    FieldPath,
    FieldValues,
    Path,
    useFieldArray,
} from 'react-hook-form';

import {Button} from '~components/ui/button';
import {
    FormControl,
    FormField,
    FormItem,
    FormLabel,
    FormMessage,
} from '~components/ui/form';
import {Input} from '~components/ui/input';
import {translateEnumValueToPolish} from '~utils/enumValueTranslations';

import {ControllerArrayProps} from '../../../types/formFieldTypes';

const FormFieldArray = <
    TFieldValues extends FieldValues = FieldValues,
    TFieldArrayName extends
        FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
>({
    control,
    name,
    defaultValue,
}: ControllerArrayProps<TFieldValues, TFieldArrayName>) => {
    const {
        fields: fields,
        append: append,
        remove: remove,
    } = useFieldArray({
        control: control,
        name: name,
    });
    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="text-xl font-bold">
                        {translateEnumValueToPolish(name)}
                    </div>
                    <Button
                        type="button"
                        variant="outline"
                        onClick={() => append(defaultValue)}
                    >
                        {'Dodaj'}
                    </Button>
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
            </div>
            <div className="flex flex-col gap-2">
                {fields.map((field, index) => {
                    return (
                        <div
                            className="flex items-end gap-2"
                            key={`${field.id}-${index}`}
                        >
                            <div
                                className={`grid grid-cols-${
                                    Object.keys(defaultValue).length
                                } gap-4`}
                            >
                                {Object.keys(defaultValue).map((key) => {
                                    const value = defaultValue[key];
                                    const inputType =
                                        typeof value === 'number'
                                            ? 'number'
                                            : 'text';

                                    return (
                                        <FormField
                                            key={key}
                                            control={control}
                                            name={
                                                `${name}.${index}.${key}` as Path<TFieldValues>
                                            }
                                            render={({field}) => (
                                                <FormItem>
                                                    {index === 0 && (
                                                        <FormLabel>
                                                            {translateEnumValueToPolish(
                                                                key,
                                                            )}
                                                        </FormLabel>
                                                    )}
                                                    <FormControl>
                                                        <Input
                                                            type={inputType}
                                                            min={
                                                                inputType ===
                                                                'number'
                                                                    ? 0
                                                                    : undefined
                                                            }
                                                            {...field}
                                                            onChange={(event) =>
                                                                field.onChange(
                                                                    inputType ===
                                                                        'number'
                                                                        ? +event
                                                                              .target
                                                                              .value
                                                                        : event
                                                                              .target
                                                                              .value,
                                                                )
                                                            }
                                                        />
                                                    </FormControl>
                                                    <FormMessage />
                                                </FormItem>
                                            )}
                                        />
                                    );
                                })}
                            </div>
                            {index !== 0 && (
                                <Button
                                    variant="destructive"
                                    onClick={() => remove(index)}
                                >
                                    <MinusIcon />
                                </Button>
                            )}
                        </div>
                    );
                })}
                <FormField
                    control={control}
                    name={`${name}` as FieldPath<TFieldValues>}
                    render={() => (
                        <FormItem>
                            <FormMessage />
                        </FormItem>
                    )}
                />
            </div>
        </div>
    );
};

export default FormFieldArray;
