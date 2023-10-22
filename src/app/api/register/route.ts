import bcrypt from 'bcrypt';
import prismadb from '~lib/prismadb';
import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';

//initialize prisma if needed

interface SignupRequestBody {
    data: {
        name: string;
        email: string;
        password: string;
    };
}

export async function POST(request: NextRequest) {
    const body: SignupRequestBody = await request.json();
    const {name, email, password} = body.data;

    if (!name || !email || !password) {
        return new NextResponse('Missing name, email, or password', {status: 400});
    }

    const exist = await prismadb.user.findUnique({
        where: {
            email: email,
        },
    });

    if (exist) {
        return new NextResponse('User already exists', {status: 400});
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await prismadb.user.create({
        data: {
            name,
            email,
            hashedPassword,
        },
    });

    return NextResponse.json(user);
}
