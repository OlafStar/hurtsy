'use client';

import Dropzone from 'react-dropzone';
import {Dispatch, SetStateAction} from 'react';

import DropzoneField from '~components/atoms/DropzoneField';

type UploadDropzoneProps = {
    multiple: boolean;
    setAcceptedImages: Dispatch<SetStateAction<(string | File)[]>>;
    files?: Array<string | File>;
    className?: string;
};

const UploadDropzone = ({
    multiple,
    setAcceptedImages,
    files,
    className,
}: UploadDropzoneProps) => {
    return (
        <Dropzone
            multiple={multiple}
            onDrop={(acceptedFile) => {
                console.log('accepted', acceptedFile)
                console.log('accepted', multiple && files && files?.length > 0)
                setAcceptedImages(
                    multiple && files && files?.length > 0
                        ? [...files, ...acceptedFile]
                        : [...acceptedFile],
                );
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
