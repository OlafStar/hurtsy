import {redirect} from 'next/navigation';
import {NextRequest} from 'next/server';

import prismadb from '~lib/prismadb';

export async function GET(
    request: NextRequest,
    {params}: {params: {token: string}},
) {
    const {token} = params;

    const user = await prismadb.user.findFirst({
        where: {
            activateTokens: {
                some: {
                    AND: [
                        {activatedAt: null},
                        {
                            createdAt: {
                                gt: new Date(Date.now() - 24 * 60 * 60 * 1000),
                            },
                        },
                        {
                            token,
                        },
                    ],
                },
            },
        },
    });

    if (!user) {
        throw new Error('Invalid token');
    }

    await prismadb.user.update({
        where: {id: user.id},
        data: {active: true},
    });

    await prismadb.activateToken.update({
        where: {
            token,
        },
        data: {
            activatedAt: new Date(),
        },
    });

    redirect('/login');
}
