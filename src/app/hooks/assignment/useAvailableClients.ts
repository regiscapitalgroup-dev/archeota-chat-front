import { useCallback, useEffect, useRef, useState } from "react";
import { ClientModel } from "./models/ClientModel";
import { availableClients } from "../../services/assignmentService";

export const useAvailableClients = () => {
    const isMountedRef = useRef(false);
    const [ loading, setLoading ] = useState(false);
    const [ clients, setClients ] = useState<ClientModel[]>([]);
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);
    
    const loadClients = useCallback(async (manager_id: number) => {
        setLoading(true);
        setClients([]);
        try {
            let _clients = await availableClients(manager_id);
            _clients = _clients.map((c: ClientModel) => ({...c, name: `${c.firstName} ${c.lastName}`}));
            if(isMountedRef.current)
                setClients(_clients);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    return { loading, clients, loadClients }
}