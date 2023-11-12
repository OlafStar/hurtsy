'use client';

import Dropzone from 'react-dropzone';

import DropzoneField from '~components/atoms/DropzoneField';
import {getImgBeforeUpload} from '~utils/getImgBeforeUpload';

import {useDescriptionImageContext} from '../TipTap';

type UploadDropzoneProps = {
    addImage: (url: string) => void;
    className?: string;
};

const TipTapUpload = ({addImage, className}: UploadDropzoneProps) => {
    const {descriptionImages, setDescriptionImages} = useDescriptionImageContext();
    return (
        <Dropzone
            multiple={false}
            onDrop={async (acceptedFile) => {
                setDescriptionImages(
                    descriptionImages && descriptionImages?.length > 0
                        ? [...descriptionImages, ...acceptedFile]
                        : [...acceptedFile],
                );
                addImage(getImgBeforeUpload(acceptedFile[0]));
            }}
        >
            {({getRootProps, getInputProps}) => (
                <DropzoneField
                    rootProps={getRootProps}
                    inputProps={getInputProps}
                    className={className}
                />
            )}
        </Dropzone>
    );
};

export default TipTapUpload;
