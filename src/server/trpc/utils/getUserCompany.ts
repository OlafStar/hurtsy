import {TRPCError} from '@trpc/server';
import {User} from 'next-auth';
import prismadb from '~lib/prismadb';

export const getUserCompany = async (ctx: {
    user: User & {
        id: string;
    };
}) => {
    const company = await prismadb.company.findUnique({
        where: {
            userId: ctx.user.id,
        },
    });

    return company;
};
