import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import {PrismaAdapter} from '@auth/prisma-adapter';
import prismadb from '~lib/prismadb';

export const authOptions = {
    adapter: PrismaAdapter(prismadb),
    providers: [
        CredentialsProvider({
            name: 'Credentials',
            credentials: {
                username: {label: 'Username', type: 'text', placeholder: 'Username'},
                password: {label: 'Password', type: 'password'},
                email: {label: 'Email', type: 'email'},
            },
            async authorize(credentials) {
                if (!credentials?.email || !credentials?.password) {
                    return null;
                }

                const user = await prismadb.user.findUnique({
                    where: {
                        email: credentials.email,
                    },
                });

                if (!user) {
                    return null;
                }

                const passwordsMatch = await bcrypt.compare(
                    credentials.password,
                    user.hashedPassword,
                );

                if (!passwordsMatch) {
                    return null;
                }

                return user;
            },
        }),
    ],
    pages: {
        signIn: '/login',
        register: '/register',
    },
    session: {
        strategy: 'jwt',
    },
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
};
