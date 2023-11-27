import {FieldPath, FieldValues, useFormContext} from 'react-hook-form';
import {useEffect, useState} from 'react';

import AddImage from '~components/atoms/AddImage';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';

import {FormFieldProps} from '../../../types/formFieldTypes';

const ProductPhotosFields = <
    TFieldValues extends FieldValues,
    TName extends FieldPath<TFieldValues>,
>({
    name,
    setAllImages,
}: FormFieldProps<TFieldValues, TName> & {
    setAllImages: React.Dispatch<React.SetStateAction<string[]>>;
}) => {
    const {formState} = useFormContext();
    const [mainImage, setMainImage] = useState<Array<string>>(
        formState.defaultValues ? [formState.defaultValues[name]] : [],
    );
    const [images, setImages] = useState<Array<string>>(
        formState.defaultValues ? formState.defaultValues['images'] : [],
    );

    useEffect(() => {
        setAllImages([...mainImage, ...images]);
    }, [mainImage, images]);

    return (
        <div className="flex flex-col gap-6">
            <div className="flex flex-col gap-3">
                <div className="flex justify-between">
                    <div className="text-xl font-bold">{'Zdjęcia'}</div>
                    <AddImage
                        multiple={true}
                        currentState={images}
                        onAcceptedImage={setImages}
                    />
                </div>
                <div className="w-full h-[1px] bg-black opacity-10" />
            </div>
            <div className="flex gap-4 h-[250px]">
                <div>
                    {mainImage[0] !== '' ? (
                        <img
                            className="w-[250px] h-[250px] object-contain"
                            src={mainImage[0]}
                            onClick={() => setMainImage([])}
                        />
                    ) : (
                        <AddImage multiple={false} onAcceptedImage={setMainImage} />
                    )}
                </div>

                <div className="flex flex-col gap-2 flex-wrap">
                    {images.map((item, index) => {
                        if (typeof item !== 'string') {
                            return (
                                <img
                                    key={index}
                                    className="w-[121px] h-[121px] object-contain"
                                    src={getImgBeforeUpload(item)}
                                    onClick={() => {
                                        const filteredImages = images.filter(
                                            (_, filterIndex) =>
                                                filterIndex !== index,
                                        );
                                        setImages(filteredImages);
                                    }}
                                />
                            );
                        }
                        return (
                            <img
                                key={index}
                                className="w-[121px] h-[121px] object-contain"
                                src={item}
                                onClick={() => {
                                    const filteredImages = images.filter(
                                        (_, filterIndex) => filterIndex !== index,
                                    );
                                    setImages(filteredImages);
                                }}
                            />
                        );
                    })}
                </div>
            </div>
        </div>
    );
};

export default ProductPhotosFields;
