import {z} from 'zod';
import {privateProcedure} from '../trpc';
import prismadb from '~lib/prismadb';
import {TRPCError} from '@trpc/server';

export const imagesProcedures = {
    getImages: privateProcedure
        .input(z.object({page: z.number(), pageSize: z.number()}))
        .query(async ({ctx, input}) => {
            const validatedInput = z
                .object({page: z.number(), pageSize: z.number()})
                .safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const {page, pageSize} = validatedInput.data;

            const skip = page * pageSize;

            const totalImages = await prismadb.images.count({
                where: {
                    userId: ctx.user.id,
                },
            });

            const images = await prismadb.images.findMany({
                where: {
                    userId: ctx.user.id,
                },
                skip: skip,
                take: pageSize,
            });

            // Check if the current page is the last page
            const isLastPage = skip + pageSize >= totalImages;

            return {
                images,
                currentPage: page,
                isLastPage,
                totalImages,
                totalPages: Math.ceil(totalImages / pageSize),
            };
        }),
    createImage: privateProcedure
        .input(z.object({url: z.string()}))
        .mutation(async ({input, ctx}) => {
            const validatedInput = z.object({url: z.string()}).safeParse(input);
            if (!validatedInput.success) {
                throw new TRPCError({
                    code: 'BAD_REQUEST',
                    message: validatedInput.error.message,
                });
            }

            const image = await prismadb.images.create({
                data: {
                    url: validatedInput.data.url,
                    userId: ctx.user.id,
                },
            });

            console.log('upload', image);
        }),
};
