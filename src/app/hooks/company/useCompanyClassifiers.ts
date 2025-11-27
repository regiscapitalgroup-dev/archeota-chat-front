import { useCallback, useEffect, useRef, useState } from "react"
import { ClassifierModel } from "../../pages/users/models/ClassifierModel";
import { getClassifiers } from "../../services/classifiersService";

export const useCompanyClassifiers = () => {
    const isMountedRef = useRef(false);
    const [classifiers, setClassifiers] = useState<ClassifierModel[]>([]);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const loadClassifiers = useCallback(async (company_id: number) => {
        if(!isMountedRef.current)
            return;
        setLoading(true);
        setClassifiers([]);
        try {
            const _classifiers = await getClassifiers(company_id);
            if(isMountedRef.current)
                setClassifiers(_classifiers);
        }
        finally {
            if(isMountedRef.current)
                setLoading(false);
        }
    }, []);

    return { loading, classifiers, loadClassifiers };
}