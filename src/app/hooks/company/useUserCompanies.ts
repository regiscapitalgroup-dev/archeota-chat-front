import { useCallback, useEffect, useRef, useState } from "react"
import { CompanyModel } from "../../pages/users/models/CompanyModel"
import { getCompanies } from "../../services/companyService";
import { shallowEqual, useSelector } from "react-redux";
import { RootState } from "../../../setup";
import { UserRoles } from "../../enums/userRoles";

export const useUserCompanies = (loadOnInit: boolean = true) => {
    const { user } = useSelector((state: RootState) => state.auth, shallowEqual)
    const isMountedRef = useRef(false);
    const [companies, setCompanies] = useState<CompanyModel[]>([]);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadCompanies = useCallback(async () => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        setCompanies([])
        try {
            if(!user || !user.role)
                return;
            if(user.role === UserRoles.SUPER_ADMIN) {
                const _companies = await getCompanies();
                if(isMountedRef.current)
                    setCompanies(_companies);
            }
            else if(user.role === UserRoles.COMPANY_ADMIN || user.role === UserRoles.COMPANY_MANAGER) {
                setCompanies([{
                    id: user.profile.companyId,
                    name: user.profile.companyName
                }]);
            }
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    useEffect(() => {
        if(loadOnInit)
            loadCompanies();
    }, [loadCompanies]);

    return { companies, loading, loadCompanies };
}