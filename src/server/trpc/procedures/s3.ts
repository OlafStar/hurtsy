import {getSignedUrl} from '@aws-sdk/s3-request-presigner';
import {privateProcedure} from '../trpc';
import {PutObjectCommand} from '@aws-sdk/client-s3';
import {s3} from '~server/s3/s3';
import {v4 as uuidv4} from 'uuid';

export const s3Procedures = {
    createPresignedUrl: privateProcedure.mutation(async ({ctx}) => {
        const user = ctx.user;

        if (!user || !user.id) {
            throw new Error('Unauthorize');
        }

        const key = uuidv4();

        const url = await getSignedUrl(
            s3,
            new PutObjectCommand({
                Bucket: process.env.S3_BUCKET,
                Key: key,
            }),
        );

        return {
            url,
            key,
        };
    }),
};
