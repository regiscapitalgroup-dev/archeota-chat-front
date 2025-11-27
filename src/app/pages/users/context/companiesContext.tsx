import { createContext, ReactNode, useContext } from "react";
import { useUserCompanies } from "../../../hooks/company/useUserCompanies";
import { CompanyModel } from "../models/CompanyModel";

interface CompaniesContextType {
    companies: CompanyModel[];
    isLoading: boolean;
    loadCompanies: () => Promise<void>;
}

const CompaniesContext = createContext<CompaniesContextType | undefined>(undefined);

export const CompaniesCtxProvider = ({ children }: { children: ReactNode }) => {
    const { companies, loading, loadCompanies } = useUserCompanies();

    const value: CompaniesContextType = {
        companies,
        isLoading: loading,
        loadCompanies
    };
    
    return (
        <CompaniesContext.Provider value={value}>
            {children}
        </CompaniesContext.Provider>
    );
};


export const useCompanies = () => {
    const ctx = useContext(CompaniesContext);
    if(!ctx)
        throw new Error('useCompanies debe usarse dentro de CompaniesCtxProvider')
    return ctx;
}