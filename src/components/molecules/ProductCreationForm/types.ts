import {
    FieldValues,
    FieldPath,
    ControllerProps,
    Control,
    FieldArrayPath,
} from 'react-hook-form';

type Unpacked<T> = T extends (infer U)[] ? U : T;

export type ControllerArrayProps<
    TFieldValues extends FieldValues = FieldValues,
    TFieldArrayName extends
        FieldArrayPath<TFieldValues> = FieldArrayPath<TFieldValues>,
> = {
    control?: Control<TFieldValues>;
    name: TFieldArrayName;
    defaultValue: Unpacked<TFieldValues[TFieldArrayName]>;
};

export type FormFieldProps<
    TFieldValues extends FieldValues = FieldValues,
    TName extends FieldPath<TFieldValues> = FieldPath<TFieldValues>,
> = Omit<ControllerProps<TFieldValues, TName>, 'render'> & {
    defaultValue?: Unpacked<TFieldValues[TName]>; // Use Unpacked to infer the correct type
};
