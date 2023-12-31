'use client';

import Link from 'next/link';
import React, {useState} from 'react';

import Logo from '~components/atoms/Logo';
import {useToast} from '~components/ui/use-toast';

import {registerUserServer} from '../../../server/actions/action';

const RegisterPage = () => {
    const {toast} = useToast();

    const [data, setData] = useState({
        email: '',
        password: '',
    });

    const registerUser = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        try {
            await registerUserServer(data);
        } catch (error) {
            toast({
                title: 'Error',
                description: 'Wystąpił błąd przy rejestracji',
                variant: 'destructive',
            });
        }
    };

    return (
        <>
            <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8">
                <div className="sm:mx-auto sm:w-full sm:max-w-sm">
                    <div className="flex items-center justify-center">
                        <Logo className="justify-self-center" />
                    </div>
                    <h2 className="mt-10 text-center text-2xl font-bold leading-9 tracking-tight text-gray-900">
                        {'Zarejestruj konto'}
                    </h2>
                </div>

                <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
                    <form
                        className="space-y-6"
                        action="#"
                        method="POST"
                        onSubmit={registerUser}
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
                                    className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
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
                                    <a
                                        href="#"
                                        className="font-semibold text-indigo-600 hover:text-indigo-500"
                                    >
                                        {'Nie pamiętasz hasła?'}
                                    </a>
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
                        <div className="text-xs text-center">
                            {'Rejestrując się akceptujesz regulamin serwisu'}
                        </div>
                        <div>
                            <button
                                type="submit"
                                className="flex w-full justify-center rounded-md bg-indigo-600 px-3 py-1.5 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
                            >
                                {'Zarejestruj'}
                            </button>
                        </div>
                    </form>

                    <p className="mt-10 text-center text-sm text-gray-500">
                        {'Już posiadasz konto?'}{' '}
                        <Link
                            href="/login"
                            className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500"
                        >
                            {'Zaloguj'}
                        </Link>
                    </p>
                </div>
            </div>
        </>
    );
};

export default RegisterPage;
