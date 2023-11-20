import {randomUUID} from 'crypto';

import bcrypt from 'bcrypt';
import {NextResponse} from 'next/server';
import {NextRequest} from 'next/server';
import Mailgun, {MailgunMessageData} from 'mailgun.js';
import formData from 'form-data';

import prismadb from '~lib/prismadb';

interface SignupRequestBody {
    data: {
        email: string;
        password: string;
    };
}

export async function POST(request: NextRequest) {
    const body: SignupRequestBody = await request.json();
    const {email, password} = body.data;

    if (!email || !password) {
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
            email,
            hashedPassword,
        },
    });

    const token = await prismadb.activateToken.create({
        data: {
            userId: user.id,
            token: `${randomUUID()}${randomUUID()}`.replace(/-/g, ''),
        },
    });

    const mailgun = new Mailgun(formData);
    const client = mailgun.client({
        username: 'api',
        key: process.env.MAILGUN_API_KEY || '',
        url: 'https://api.eu.mailgun.net',
    });

    const messageData: MailgunMessageData = {
        from: `Hurtsy <no-reply@${
            process.env.MAILGUN_DOMAIN || process.env.WEB_URL || ''
        }>`,
        to: user.email,
        subject: 'Aktywuj swoje konto',
        text: `Cześć! Proszę aktywuj swoje konto klikając w ten link ${process.env.WEB_URL}/activate/${token.token}.`,
    };

    await client.messages.create(
        process.env.MAILGUN_DOMAIN || '',
        messageData,
    );
    return NextResponse.json(user);
}
