import { useEffect, useRef, useState } from "react";
import { KTSVG } from "../../../../../_metronic/helpers";
import PopUpController from "../../../../modules/controllers/PopUpController";
import { createCompany, removeCompany, updateCompany } from "../../../../services/companyService";
import { useCompanies } from "../../context/companiesContext";
import CompanyTool from "../molecules/CompanyTool";

type Props = {
    reloadUserList: () => void;
}

const CompanyToolHandler = ({ reloadUserList }: Props) => {
    const isMountedRef = useRef(false);
    const { companies, isLoading: loading, loadCompanies } = useCompanies();
    const [updating, setUpdating] = useState(false);

    useEffect(() => {
        isMountedRef.current = true;
        return () => {
            isMountedRef.current = false;
        }
    }, []);

    const _handleOnApply = (values: { id?: number; name: string; isEdited?: boolean; }[]) => {
        const _fetchActions = async () => {
            if(!isMountedRef.current)
                return;
            setUpdating(true);
            try {
                const _removes = companies.filter(c => !values.find(v => !!v.id && v.id===c.id))
                                    .map(deletes => removeCompany(deletes.id));
                const _changes = values.filter(v => !!v.id && v.isEdited)
                                    .map(updates => updateCompany(updates.id!, { name: updates.name }));
                const _news = values.filter(v => !v.id)
                                    .map(creates => createCompany({ name: creates.name }));
                await Promise.all([..._removes, ..._changes, ..._news])
                loadCompanies();
                if(_removes.length>0||_changes.length>0)
                    reloadUserList();
            }
            finally {
                if(isMountedRef.current)
                    setUpdating(false);
            }
        }
        _fetchActions();
    } 

    return (
        <PopUpController>
            <button data-popup-role='button' className="btn btn-sm btn-flex btn-light btn-active-dark fw-bolder">
                { loading ? ( 
                    <span className="spinner-border spinner-border-sm align-middle me-2"></span>
                ): (
                    <KTSVG path='/media/icons/duotune/finance/fin006.svg' className='svg-icon-5 svg-icon-gray-500 me-1'/>
                )}
                Companies
            </button>
            <div data-popup-role='drop'>
                <CompanyTool onApply={_handleOnApply} loading={loading} sending={updating} companies={companies} />
            </div>
        </PopUpController>
    )
}

export default CompanyToolHandler;