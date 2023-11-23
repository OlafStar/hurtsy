'use client';

import Dropzone from 'react-dropzone';

import DropzoneField from '~components/atoms/DropzoneField';
import {useUploadS3} from '~hooks/useUploadS3';

type UploadDropzoneProps = {
    addImage: (url: string) => void;
    className?: string;
    onComplete: () => Promise<void>;
};

const TipTapUpload = ({addImage, className, onComplete}: UploadDropzoneProps) => {
    const {uploadImageToS3} = useUploadS3();
    return (
        <Dropzone
            multiple={false}
            onDrop={async (acceptedFile) => {
                const key = await uploadImageToS3(acceptedFile[0]);
                addImage(key);
                await onComplete();
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
