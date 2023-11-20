'use server';

import {randomUUID} from 'crypto';

import Mailgun, {MailgunMessageData} from 'mailgun.js';
import formData from 'form-data';

import prismadb from '~lib/prismadb';
import {getCurrentUser} from '~lib/session';

export const registerUserServer = async (data: {
    email: string;
    password: string;
}) => {
    await fetch(`${process.env.WEB_URL}/api/register`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({data}),
    });
};

export const resendActiveToken = async () => {
    const user = await getCurrentUser();

    if (!user) {
        throw Error('Unauthenticated');
    }

    await prismadb.activateToken.deleteMany({
        where: {
            AND: [{activatedAt: null}, {userId: user.id}],
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

    await client.messages.create(process.env.MAILGUN_DOMAIN || '', messageData);
};
