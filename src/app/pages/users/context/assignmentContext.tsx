import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ClientModel } from "../../../hooks/assignment/models/ClientModel";
import { useAvailableClients } from "../../../hooks/assignment/useAvailableClients";
import { assign } from "../../../services/assignmentService";

interface AssignmentContextType  {
    loading: boolean;
    clients: ClientModel[];
    loadClients: (manager_id: number) => Promise<void>;
    sending: boolean;
    error: string | null;
    Assign: (client_id: number, manager_id: number) => Promise<void>;
}

const AssignmentContext = createContext<AssignmentContextType|undefined>(undefined);

export const AssignmentCtxProvider: React.FC = ({ children }) => {
    const isMountedRef = useRef(false);
    const available = useAvailableClients();
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, [])

    const Assign = useCallback(async (client_id: number, manager_id: number) => {
        setSending(true);
        try {
            await assign(client_id, manager_id);
        }
        catch {
            if(isMountedRef.current)
                setError("Sorry, an error occurred while processing your request. Please try again later.")
        }
        finally {
            if(isMountedRef.current)
                setSending(false);
        }
    }, []);


    const value: AssignmentContextType = {
        ...available,
        error,
        sending,
        Assign
    };

    return (
        <AssignmentContext.Provider value={value}>
            {children}
        </AssignmentContext.Provider>
    );
}

export const useAssignment = () => {
    const ctx = useContext(AssignmentContext);
    if(!ctx)
        throw new Error('useAssignment debe usarse dentro de AssignmentCtxProvider')
    return ctx;
}