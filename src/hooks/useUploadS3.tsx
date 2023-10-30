import {trpc} from '~app/_trpc/client';

export function useUploadS3() {
    const {mutateAsync: createPresignedUrl} = trpc.createPresignedUrl.useMutation();

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

        return `${process.env.NEXT_PUBLIC_S3_URL}${key}`;
    };

    const uploadImagesToS3 = async (files: File[]): Promise<string[]> => {
        const keys: string[] = [];

        for (let file of files) {
            const key = await uploadImageToS3(file);
            keys.push(key);
        }

        return keys;
    };

    return {uploadImageToS3, uploadImagesToS3};
}
