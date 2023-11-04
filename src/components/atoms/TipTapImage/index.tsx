'use client';

import {Editor} from '@tiptap/react';
import {ChevronLeft, ChevronRight, Image} from 'lucide-react';
import {Dispatch, SetStateAction, useCallback, useEffect, useState} from 'react';
import {trpc} from '~app/_trpc/client';
import UploadDropzone from '~components/molecules/UploadDropzone';
import {Button} from '~components/ui/button';
import {Dialog, DialogContent} from '~components/ui/dialog';
import TipTapUpload from '../TipTapUpload';

type TipTapImageProps = {
    editor: Editor;
};

const TipTapImage = ({editor}: TipTapImageProps) => {
    const [isOpen, setIsOpen] = useState<boolean>(false);
    const [currentPage, setCurrentPage] = useState(0);

    const {data, isLoading} = trpc.getImages.useQuery({
        page: currentPage,
        pageSize: 6,
    });

    const addImage = useCallback(
        (url: string) => {
            if (url) {
                editor.chain().focus().setImage({src: url}).run();
            }
        },
        [editor],
    );

    return (
        <>
            <Button type="button" variant="ghost" onClick={() => setIsOpen(true)}>
                <Image className="w-4 h-4" />
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
                        <TipTapUpload addImage={addImage} />
                        <div className="flex gap-2 items-center w-[324px] h-[184px]">
                            <ChevronLeft
                                onClick={() => setCurrentPage(currentPage - 1)}
                                className={`${currentPage > 0 && 'disabled'}`}
                            />
                            <div className="grid grid-cols-3 grid-rows-2 gap-2">
                                {data?.images.map((item, index) => (
                                    <img
                                        key={index}
                                        src={item.url}
                                        alt={`${index}`}
                                        className="w-[84px] aspect-square object-contain"
                                        onClick={() => {
                                            addImage(item.url);
                                        }}
                                    />
                                ))}
                            </div>
                            {!data?.isLastPage && !isLoading && (
                                <ChevronRight
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

export default TipTapImage;
