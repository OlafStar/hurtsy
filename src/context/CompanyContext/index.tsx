'use client';
import {Company, CompanyType} from '@prisma/client';
// CompanyContext.js
import React, {
    PropsWithChildren,
    createContext,
    useContext,
    useEffect,
    useState,
} from 'react';
import {trpc} from '~app/_trpc/client';

type CompanyTypeWeb = {
    id: string;
    userId: string;
    name: string;
    type: CompanyType;
    mainProducts?: any;
    city: string;
    street: string;
    postCode: string;
    website?: string | null;
    phone: string;
    country: string;
    establishment: number;
};

const CompanyContext = createContext<{
    company: CompanyTypeWeb | null | undefined;
    setCompany: React.Dispatch<
        React.SetStateAction<CompanyTypeWeb | null | undefined>
    >;
} | null>(null);

const CompanyProvider = ({children}: PropsWithChildren) => {
    const [company, setCompany] = useState<CompanyTypeWeb | null | undefined>(
        undefined,
    );

    return (
        <CompanyContext.Provider value={{company, setCompany}}>
            {children}
        </CompanyContext.Provider>
    );
};

const useCompanyContext = () => {
    const context = useContext(CompanyContext);
    if (!context) {
        throw new Error('useCompanyContext must be used within a CompanyProvider');
    }
    return context;
};

export {CompanyProvider, useCompanyContext};
