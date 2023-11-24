import {useFormContext} from 'react-hook-form';

import {Input, InputProps} from '~components/ui/input';

const NumberInput = (
    props: InputProps & {field: string; type: 'int' | 'float'},
) => {
    const {setValue} = useFormContext();

    const handleValueChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        if (/^\d*\.?\d{0,2}$/.test(value)) {
            setValue(
                props.field,
                value
                    ? props.type === 'float'
                        ? parseFloat(value)
                        : parseInt(value)
                    : undefined,
            );
        }
    };

    const numberInputOnWheelPreventChange = (e: any) => {
        e.target.blur();

        e.stopPropagation();

        setTimeout(() => {
            e.target.focus();
        }, 0);
    };

    return (
        <Input
            placeholder="Delivery price"
            {...props}
            type="number"
            onWheel={numberInputOnWheelPreventChange}
            onChange={handleValueChange}
        />
    );
};

export default NumberInput;
