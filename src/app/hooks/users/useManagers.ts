import { useCallback, useEffect, useRef, useState } from "react"
import { getUsersManagers } from "../../services/usersService";
import { AccountManagerModel } from "../../pages/users/models/AccountManagerModel";

export const useManagers = () => {
    const isMountedRef = useRef(false);
    const [ loading, setLoading ] = useState(false);
    const [ managers, setManagers ] = useState<AccountManagerModel[]>([]);
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadManagers = useCallback(async (company_id: number) => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        try {
            const _manager = await getUsersManagers(company_id);
            if(isMountedRef.current)
                setManagers(_manager);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    return { loading, managers, loadManagers }
}