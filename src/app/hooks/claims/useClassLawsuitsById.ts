import { useCallback, useEffect, useRef, useState } from "react";
import { getClassLawsuitDetails } from "../../services/claimsService";
import { ClassLawsuitModel } from "./models/ClassLawsuitModel";

export const useClassLawsuitsById = (id: number) => {
    const isMountedRef = useRef(false);
    const [data, setData] = useState<ClassLawsuitModel | null>(null);
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadRecord = useCallback(async () => {
        if(!isMountedRef.current || !id)
            return;
        setLoading(true);
        try {
            const _data = await getClassLawsuitDetails(id);
            if(isMountedRef.current)
                setData(_data);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, [id]);

    useEffect(() => {
        loadRecord();
    }, [loadRecord]);

    return { data, loading };
}