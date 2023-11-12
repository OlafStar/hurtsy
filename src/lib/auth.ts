import CredentialsProvider from 'next-auth/providers/credentials';
import bcrypt from 'bcrypt';
import {PrismaAdapter} from '@auth/prisma-adapter';
import {NextAuthOptions} from 'next-auth';

import prismadb from '~lib/prismadb';

export const authOptions: NextAuthOptions = {
    adapter: PrismaAdapter(prismadb),
    session: {
        strategy: 'jwt',
    },
    pages: {
        signIn: '/login',
    },
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

                // if (!user.active) {
                //     throw new Error('User is not active');
                // }

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
    secret: process.env.NEXTAUTH_SECRET,
    debug: process.env.NODE_ENV === 'development',
    callbacks: {
        async session({token, session}) {
            if (token) {
                session.user.id = token.id;
                session.user.name = token.name;
                session.user.email = token.email;
                session.user.image = token.picture;
            }
            return session;
        },
        async jwt({token, user}) {
            const dbUser = await prismadb.user.findFirst({
                where: {
                    email: token.email,
                },
            });

            if (!dbUser) {
                if (user) {
                    token.id = user?.id;
                }
                return token;
            }

            return {
                id: dbUser.id,
                name: dbUser.name,
                email: dbUser.email,
                picture: dbUser.image,
            };
        },
    },
};
