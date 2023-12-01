'use server';

import {randomUUID} from 'crypto';

import Mailgun, {MailgunMessageData} from 'mailgun.js';
import formData from 'form-data';
import {redirect} from 'next/navigation';
import bcrypt from 'bcrypt';

import prismadb from '~lib/prismadb';
import {getCurrentUser} from '~lib/session';
import {AppRoutes} from '~types/AppRoutes';

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
    redirect(AppRoutes.ACTIVE_ACCOUNT);
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

export const resetPassword = async (
    email: string,
    disableRedirect?: boolean,
) => {
    const user = await prismadb.user.findUnique({
        where: {
            email,
        },
    });

    if (!user) {
        throw new Error('User dosent exist');
    }

    const token = await prismadb.passwordResetToken.create({
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
        subject: 'Resetuj hasło',
        text: `Witaj ${user.email}, ktoś (miejmy nadzieję, że ty) poprosił o zresetowanie hasła do tego konta. Jeśli chcesz zresetować hasło, kliknij tutaj: ${process.env.WEB_URL}/password-reset/${token.token}.

        Ze względów bezpieczeństwa ten link jest ważny tylko przez cztery godziny.
    
        Jeśli to nie byłeś ty, zignoruj tę wiadomość e-mail.`,
    };

    await client.messages.create(process.env.MAILGUN_DOMAIN || '', messageData);
    if (!disableRedirect) {
        redirect('forgot-password/success');
    }
};

export const resetCurrentUserPassword = async () => {
    const user = await getCurrentUser();
    if (!user) {
        throw new Error('Not authenticated');
    }

    await resetPassword(user.email, true);
};

export const setNewPassword = async (
    newPassword: string,
    confirm: string,
    token: string,
) => {
    if (newPassword !== confirm) {
        throw new Error("Passwords dosen't match");
    }

    const passwordResetToken = await prismadb.passwordResetToken.findUnique({
        where: {
            token,
            createdAt: {gt: new Date(Date.now() - 1000 * 60 * 60 * 4)},
            resetAt: null,
        },
    });

    if (!passwordResetToken) {
        throw new Error(
            'Invalid token reset request. Please try resetting your password again.',
        );
    }

    const encrypted = await bcrypt.hash(newPassword, 12);

    const updateUser = prismadb.user.update({
        where: {id: passwordResetToken.userId},
        data: {
            hashedPassword: encrypted,
        },
    });

    const updateToken = prismadb.passwordResetToken.update({
        where: {
            id: passwordResetToken.id,
        },
        data: {
            resetAt: new Date(),
        },
    });

    try {
        await prismadb.$transaction([updateUser, updateToken]);
    } catch (err) {
        throw new Error(
            'An unexpected error occured. Please try again and if the problem persists, contact support.',
        );
    }
    redirect('/password-reset/success');
};
