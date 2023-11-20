import {User} from 'next-auth';

type UserId = string;

declare module 'next-auth/jwt' {
    interface JWT {
        id: UserId;
        email: string;
        active: boolean;
    }
}

declare module 'next-auth' {
    interface Session {
        user: User & {
            id: UserId;
            email: string;
            active: boolean;
        };
    }
}
