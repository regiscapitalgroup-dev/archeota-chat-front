import { createContext, useCallback, useContext, useEffect, useRef, useState } from "react";
import { ClientModel } from "../../../hooks/assignment/models/ClientModel";
import { useAssignedClients } from "../../../hooks/assignment/useAssignedClients";
import { unassign } from "../../../services/assignmentService";

interface UnassignmentContextType  {
    loading: boolean;
    clients: ClientModel[];
    loadClients: (manager_id: number) => Promise<void>;
    sending: boolean;
    error: string | null;
    Unassign: (client_id: number) => Promise<void>;
}

const UnassignmentContext = createContext<UnassignmentContextType|undefined>(undefined);

export const UnassignmentCtxProvider: React.FC = ({ children }) => {
    const isMountedRef = useRef(false);
    const available = useAssignedClients();
    const [sending, setSending] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, [])

    const Unassign = useCallback(async (client_id: number) => {
        setSending(true);
        try {
            await unassign(client_id);
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


    const value: UnassignmentContextType = {
        ...available,
        error,
        sending,
        Unassign
    };

    return (
        <UnassignmentContext.Provider value={value}>
            {children}
        </UnassignmentContext.Provider>
    );
}

export const useUnassignment = () => {
    const ctx = useContext(UnassignmentContext);
    if(!ctx)
        throw new Error('useUnassignment debe usarse dentro de UnassignmentCtxProvider')
    return ctx;
}