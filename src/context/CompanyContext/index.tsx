'use client';
import React, {PropsWithChildren, createContext, useContext, useState} from 'react';
import {CompanyTypeWeb} from '~types/company';

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
