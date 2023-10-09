import NextAuth from 'next-auth/next';
import {authOptions} from '~lib/auth';

//@ts-expect-error
const handler = NextAuth(authOptions);

export {handler as GET, handler as POST};
