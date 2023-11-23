'use client';

import Dropzone from 'react-dropzone';
import {Dispatch, SetStateAction} from 'react';

import DropzoneField from '~components/atoms/DropzoneField';
import {useUploadS3} from '~hooks/useUploadS3';

type UploadDropzoneProps = {
    multiple: boolean;
    setAcceptedImages: Dispatch<SetStateAction<string[]>>;
    files?: Array<string>;
    className?: string;
    onComplete: () => Promise<void>;
};

const UploadDropzone = ({
    multiple,
    setAcceptedImages,
    files,
    className,
    onComplete,
}: UploadDropzoneProps) => {
    const {uploadImageToS3, uploadImagesToS3} = useUploadS3();

    return (
        <Dropzone
            multiple={multiple}
            onDrop={async (acceptedFile) => {
                if (multiple) {
                    console.log(acceptedFile);
                    const keys = await uploadImagesToS3(acceptedFile);
                    setAcceptedImages(
                        multiple && files && files?.length > 0
                            ? [...files, ...keys]
                            : [...keys],
                    );
                    await onComplete();
                } else {
                    const key = await uploadImageToS3(acceptedFile[0]);
                    setAcceptedImages(
                        files && files?.length > 0 ? [...files, key] : [key],
                    );
                    await onComplete();
                }
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

export default UploadDropzone;
