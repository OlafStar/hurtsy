import { Cloud } from 'lucide-react';
import {DropzoneInputProps, DropzoneRootProps} from 'react-dropzone';
import {cn} from '~utils/shadcn';

type DropzoneFieldProps = {
    rootProps: <T extends DropzoneRootProps>(props?: T | undefined) => T;
    inputProps: <T extends DropzoneInputProps>(props?: T | undefined) => T;
    className?: string;
};

const DropzoneField = ({rootProps, inputProps, className}: DropzoneFieldProps) => {
    return (
        <div
            {...rootProps()}
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
                            <span className="font-semibold">Click to upload</span> or
                            drag and drop
                        </p>
                        <p className="text-xs text-zinc-500">Image (up to 4MB)</p>
                    </div>

                    <input
                        {...inputProps()}
                        type="file"
                        id="dropzone-file"
                        className="hidden"
                    />
                </label>
            </div>
        </div>
    );
};

export default DropzoneField;