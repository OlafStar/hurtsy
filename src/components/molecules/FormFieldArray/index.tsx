import {PlusIcon, MinusIcon} from '@radix-ui/react-icons';
import {
    Control,
    FieldArrayPath,
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

type Unpacked<T> = T extends (infer U)[] ? U : T;

type ControllerArrayProps<
    TFieldValues extends FieldValues = FieldValues,
    TFieldArrayName extends
        FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
    control?: Control<TFieldValues>;
    name: TFieldArrayName;
    defaultValue: Unpacked<TFieldValues[TFieldArrayName]>;
};

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
        <div className="flex flex-col outline outline-[#fafafa] rounded-xl overflow-hidden">
            <div className="flex justify-between items-center bg-[#fafafa] pl-2">
                <FormLabel>{name}</FormLabel>
                <Button
                    type="button"
                    variant="ghost"
                    onClick={() => append(defaultValue)}
                >
                    <PlusIcon />
                </Button>
            </div>
            <div className="py-2 px-4 flex flex-col gap-2">
                {fields.map((field, index) => {
                    return (
                        <div
                            className="flex items-end gap-2"
                            key={`${field.id}-${index}`}
                        >
                            <div className="grid grid-cols-3 gap-4">
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
                                                        <FormLabel>{key}</FormLabel>
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
                            <Button
                                variant="destructive"
                                onClick={() => remove(index)}
                            >
                                <MinusIcon />
                            </Button>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default FormFieldArray;
