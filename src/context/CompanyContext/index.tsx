'use client';
import React, {PropsWithChildren, createContext, useContext, useState} from 'react';
import {trpc} from '~app/_trpc/client';
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

    const {data, isLoading} = trpc.getUserCompany.useQuery();

    return (
        <CompanyContext.Provider value={{company, setCompany}}>
            {isLoading && !company ? <div>{'Loading'}</div> : children}
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
