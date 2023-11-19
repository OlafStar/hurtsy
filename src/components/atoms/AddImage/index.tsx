'use client';

import {ChevronLeft, ChevronRight} from 'lucide-react';
import {Dispatch, SetStateAction, useState} from 'react';

import {trpc} from '~app/_trpc/client';
import UploadDropzone from '~components/molecules/UploadDropzone';
import {Button} from '~components/ui/button';
import {Dialog, DialogContent} from '~components/ui/dialog';

type AddImageProps = {
    multiple: boolean;
    currentState?: Array<string | File>;
    onAcceptedImage: Dispatch<SetStateAction<(string | File)[]>>;
};

const AddImage = ({currentState, multiple, onAcceptedImage}: AddImageProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);

    const {data, isLoading} = trpc.getImages.useQuery({
        page: currentPage,
        pageSize: 6,
    });

    console.log(data);

    return (
        <>
            <Button type="button" onClick={() => setIsOpen(true)} variant='ghost'>
                {'Dodaj zdjecie'}
            </Button>
            <Dialog
                open={isOpen}
                onOpenChange={(v) => {
                    if (!v) {
                        setIsOpen(v);
                    }
                }}
            >
                <DialogContent>
                    <div className="flex flex-col gap-4 items-center">
                        <UploadDropzone
                            multiple={multiple}
                            files={
                                multiple && currentState ? currentState : undefined
                            }
                            setAcceptedImages={onAcceptedImage}
                            className="w-[324px] h-[152px]"
                        />
                        <div className="flex gap-2 items-center w-[324px] h-[184px]">
                            <ChevronLeft
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`${
                                    currentPage === 0 &&
                                    'disabled opacity-0 pointer-events-none'
                                } cursor-pointer`}
                            />
                            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                {data?.images.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.url}
                                        alt={`${index}`}
                                        className="w-[84px] aspect-square object-contain"
                                        onClick={() => {
                                            onAcceptedImage(
                                                multiple && currentState
                                                    ? [...currentState, item.url]
                                                    : [item.url],
                                            );
                                        }}
                                    />
                                ))}
                            </div>
                            {!data?.isLastPage && !isLoading && (
                                <ChevronRight
                                    className="cursor-pointer"
                                    onClick={() => setCurrentPage(currentPage + 1)}
                                />
                            )}
                        </div>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    );
};

export default AddImage;
