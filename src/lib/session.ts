import {getServerSession} from 'next-auth/next';

import {authOptions} from '~lib/auth';

export async function getCurrentUser() {
    //@ts-expect-error
    const session = await getServerSession(authOptions);

    return session?.user;
}
