'use client';

import Dropzone from 'react-dropzone';
import {Cloud} from 'lucide-react';
import {cn} from '~utils/shadcn';

type UploadDropzoneProps = {
    multiple: boolean;
    setAcceptedImages: React.Dispatch<React.SetStateAction<File[]>>;
    files?: File[];
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
            onDrop={async (acceptedFile) => {
                setAcceptedImages(
                    multiple
                        ? [...(files as File[]), ...acceptedFile]
                        : [...acceptedFile],
                );
            }}
        >
            {({getRootProps, getInputProps, acceptedFiles}) => (
                <div
                    {...getRootProps()}
                    className={`border h-64 border-dashed border-gray-300 rounded-lg ${cn(
                        className,
                    )}`}
                >
                    <div className="flex items-center justify-center h-full w-full">
                        <label
                            htmlFor="dropzone-file"
                            className="flex flex-col items-center justify-center w-full h-full rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100"
                        >
                            <div className="flex flex-col items-center justify-center pt-5 pb-6">
                                <Cloud className="h-6 w-6 text-zinc-500 mb-2" />
                                <p className="mb-2 text-sm text-zinc-700">
                                    <span className="font-semibold">
                                        Click to upload
                                    </span>{' '}
                                    or drag and drop
                                </p>
                                <p className="text-xs text-zinc-500">
                                    Image (up to 4MB)
                                </p>
                            </div>

                            <input
                                {...getInputProps()}
                                type="file"
                                id="dropzone-file"
                                className="hidden"
                            />
                        </label>
                    </div>
                </div>
            )}
        </Dropzone>
    );
};

export default UploadDropzone;