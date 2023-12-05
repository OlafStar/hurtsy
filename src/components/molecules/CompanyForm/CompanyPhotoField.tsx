import {FieldPath, FieldValues, useFormContext} from 'react-hook-form';
import {useEffect, useState} from 'react';

import AddImage from '~components/atoms/AddImage';
import {cn} from '~utils/shadcn';

import {FormFieldProps} from '../../../types/formFieldTypes';

const CompanyPhotoFields = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    setImage,
}: FormFieldProps<TFieldValues, TName> & {
    setImage: React.Dispatch<React.SetStateAction<string>>;
}) => {
    const {formState} = useFormContext();
    const [mainImage, setMainImage] = useState<string[]>(
        formState.defaultValues ? [formState.defaultValues[name]] : [],
    );

    useEffect(() => {
        setImage(mainImage[0]);
    }, [mainImage]);

    return (
        <div>
            {mainImage[0] ? (
                <img
                    className="w-[148px] h-[148px] object-contain"
                    src={mainImage[0]}
                    onClick={() => setMainImage([])}
                />
            ) : (
                <AddImage
                    className={`w-full xs:w-[148px] xs:h-[148px] border  border-black border-opacity-10`}
                    multiple={false}
                    onAcceptedImage={setMainImage}
                />
            )}
        </div>
    );
};

export default CompanyPhotoFields;
