import '~/styles/globals.css';
import type {Metadata} from 'next';
import {Inter} from 'next/font/google';

import Providers from '~components/providers';
import {Toaster} from '~components/ui/toaster';
const inter = Inter({subsets: ['latin']});

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
};

export default function RootLayout({children}: {children: React.ReactNode}) {
    return (
        <html lang="en">
            <Providers>
                <body className={`${inter.className}`}>
                    {children}
                    <Toaster />
                </body>
            </Providers>
        </html>
    );
}
