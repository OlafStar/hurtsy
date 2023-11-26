'use client';
import {useRouter} from 'next/navigation';
import React, {useState} from 'react';
import {signIn} from 'next-auth/react';
import Link from 'next/link';
import {Loader2} from 'lucide-react';

import Logo from '~components/atoms/Logo';
import {DashboardRoutes} from '~types/AppRoutes';
import {useToast} from '~components/ui/use-toast';

const RegisterPage = () => {
    const [isLoading, setIsLoading] = useState(false);
    const [isError, setIsErrror] = useState(false);
    const router = useRouter();
    const {toast} = useToast();
    const [data, setData] = useState({
        email: '',
        password: '',
    });
    const loginUser = async (e: React.FormEvent<HTMLFormElement>) => {
        setIsLoading(true);
        e.preventDefault();
        const response = await signIn('credentials', {
            ...data,
            redirect: false,
        });

        if (response?.ok) {
            router.refresh();
            router.push(DashboardRoutes.YOUR_COMPANY);
        } else {
            setIsErrror(true);
            toast({
                title: 'Błąd: Nieprawidłowe dane',
                description:
                    'Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe. Proszę spróbować ponownie.',
                variant: 'destructive',
            });
        }
        setIsLoading(false);
    };
    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center">
                        <Logo className="justify-self-center" />
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {'Zaloguj się'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={loginUser}
                    >
                        <div>
                            <label
                                htmlFor="email"
                                className="block text-sm font-medium leading-6 text-gray-900"
                            >
                                {'Email'}
                            </label>
                            <div className="mt-2">
                                <input
                                    id="email"
                                    name="email"
                                    type="email"
                                    autoComplete="email"
                                    required
                                    value={data.email}
                                    onChange={(e) => {
                                        setData({...data, email: e.target.value});
                                    }}
                                    className={`block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6`}
                                />
                            </div>
                        </div>

                        <div>
                            <div className="flex items-center justify-between">
                                <label
                                    htmlFor="password"
                                    className="block text-sm font-medium leading-6 text-gray-900"
                                >
                                    {'Hasło'}
                                </label>
                                <div className="text-sm">
                                    <Link
                                        href="/forgot-password"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        {'Zapomniałeś hasła?'}
                                    </Link>
                                </div>
                            </div>
                            <div className="mt-2">
                                <input
                                    id="password"
                                    name="password"
                                    type="password"
                                    autoComplete="current-password"
                                    required
                                    value={data.password}
                                    onChange={(e) => {
                                        setData({...data, password: e.target.value});
                                    }}
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
                                />
                            </div>
                        </div>
                        {isError && (
                            <div className="text-[#ff0000] text-xs">
                                {
                                    'Wprowadzona nazwa użytkownika lub hasło są nieprawidłowe.'
                                }
                            </div>
                        )}
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center items-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {isLoading ? (
                                    <Loader2 className="mr-4 h-4 w-4 animate-spin" />
                                ) : null}
                                {'Zaloguj'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {'Nie posiadasz konta?'}{' '}
                        <Link
                            href="/register"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            {'Kliknij i zarejestruj się już teraz'}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
