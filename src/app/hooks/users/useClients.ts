import { useCallback, useEffect, useRef, useState } from "react";
import { UserListModel } from "../../pages/users/models/UserListModel";
import { getClients } from "../../services/usersService";

export const useClients = () => {
    const isMountedRef = useRef(false);
    const [users, setUsers] = useState<UserListModel[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadUsers = useCallback(async (company_id: number | null) => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        setUsers([]);
        try {
            const _users = await getClients(company_id);
            if(isMountedRef.current)
                setUsers(_users);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    return { users, loading, loadUsers }
}