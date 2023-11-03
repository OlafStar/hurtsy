import {trpc} from '~app/_trpc/client';

export function useUploadS3() {
    const {mutateAsync: createPresignedUrl} = trpc.createPresignedUrl.useMutation();
    const {mutateAsync: createImage} = trpc.createImage.useMutation();

    const uploadImageToS3 = async (file: File): Promise<string> => {
        const {url, key} = await createPresignedUrl();

        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': file.type,
            },
            body: file,
        });

        if (!response.ok) {
            throw new Error(`Failed to upload file. Status: ${response.statusText}`);
        }

        const returnedUrl = `${process.env.NEXT_PUBLIC_S3_URL}${key}`;
        createImage({url: returnedUrl});

        return returnedUrl;
    };

    const uploadImagesToS3 = async (
        files: Array<File | string>,
    ): Promise<string[]> => {
        const keys: string[] = [];

        for (let file of files) {
            if (typeof file !== 'string') {
                const key = await uploadImageToS3(file);
                keys.push(key);
            } else {
                keys.push(file);
            }
        }

        return keys;
    };

    return {uploadImageToS3, uploadImagesToS3};
}
