import { useEffect, useRef, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";
import { useCompanyClassifiers } from "../../../../hooks/company/useCompanyClassifiers";
import PopUpController from "../../../../modules/controllers/PopUpController";
import { createClassifier, removeClassifier, updateClassifier } from "../../../../services/classifiersService";
import { useCompanies } from "../../context/companiesContext";
import { CompanyModel } from "../../models/CompanyModel";
import ClassifiersTool from "../molecules/ClassifiersTool";
import { ClassifierManipulatedModel } from "../molecules/models/ClassifierManipulatedModel";

const ClassifierToolHandler = () => {
    const isMountedRef = useRef(false);
    const [updating, setUpdating] = useState(false);
    const [company, setCompany] = useState<CompanyModel | null>(null);
    const { companies, isLoading: companiesLoading } = useCompanies();
    const { classifiers, loadClassifiers, loading } = useCompanyClassifiers();

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const _handleUpdateClassifiers = (values: ClassifierManipulatedModel[]) => {
        const _fetchActions = async () => {
            if(!company || !isMountedRef.current)
                return;
            setUpdating(true);
            try {
                const _removes = classifiers.filter(c => !values.find(v => !!v.id && v.id===c.id))
                                    .map(deletes => removeClassifier(deletes.id));
                const _changes = values.filter(v => !!v.id && v.isEdited)
                                    .map(updates => updateClassifier(updates.id!, { color: updates.color, name: updates.name }));
                const _news = values.filter(v => !v.id)
                                    .map(creates => createClassifier({ color: creates.color, name: creates.name, company_id: company.id }));
                await Promise.all([..._removes, ..._changes, ..._news])
                loadClassifiers(company.id);
            }
            finally {
                if(isMountedRef.current)
                    setUpdating(false);
            }
        }
        _fetchActions();
    }

    const _handleSelectCompany = (company: CompanyModel) => {
        setCompany(company);
        loadClassifiers(company.id);
    }

    return (
        <PopUpController>
            <button data-popup-role='button' className="btn btn-sm btn-flex btn-light btn-active-dark fw-bolder">
                { (loading || companiesLoading) ? ( 
                    <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                ): (
                    <KTSVG path='/media/icons/duotune/communication/com005.svg' className='svg-icon-5 svg-icon-gray-500 me-1'/>
                )}
                Classifiers
            </button>
            <div data-popup-role='drop'>
                <ClassifiersTool loading={loading} companies={companies} onSelectCompany={_handleSelectCompany} sending={updating} onChangeClassifier={_handleUpdateClassifiers} classifiers={classifiers}/>
            </div>
        </PopUpController>
    )
}

export default ClassifierToolHandler;