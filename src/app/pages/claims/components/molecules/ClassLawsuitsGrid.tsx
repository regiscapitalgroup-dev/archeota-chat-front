import { useMemo, useState } from "react";
import { useHistory } from "react-router-dom";
import Swal from "sweetalert2";
import { KTSVG } from "../../../../../_metronic/helpers";
import { FilterProp } from "../../../../components/molecules/models/FilterProp.Model";
import { ClassLawsuitModel } from "../../../../hooks/claims/models/ClassLawsuitModel";
import { deleteClassLawsuit } from "../../../../services/claimsService";
import { filterData } from "../../../../services/utilsService";
import ClassLawsuitsTable from "./ClassLawsuitsTable";
import { ToolbarWithFilter } from "../ToolbarWithFilter";
import { CompanyModel } from "../../../users/models/CompanyModel";


const FilterProps: FilterProp[] = [
    {
        key: 'tyckerSymbol',
        label: 'Tycker Symbol',
        type: "text"
    },
    {
        key: 'companyName',
        label: 'Company Name',
        type: 'text'
    }
]

type Filter = {
    tyckerSymbol: string;
    companyName: string;
}

type Props = {
    data: ClassLawsuitModel[];
    companySelected: CompanyModel | null;
    loading: boolean;
    onReload: () => void;
}

const ClassLawsuitsGrid = ({ data, loading, companySelected, onReload }: Props) => {
    const history = useHistory();
    const [sending, setSending] = useState(false);
    const [filters, setFilters] = useState<Filter>({ companyName: '', tyckerSymbol: '' } as Filter)
    const filteredData = useMemo(() => filterData(data, filters), [data, filters]);


    const _onEdit = (id: number) => history.push(`/claims/lawsuit/edit/${id}`);

    const _onDelete = async (item: ClassLawsuitModel) => {
        const _result = await Swal.fire({
            title: 'Delete class action',
            text: 'Do you really want to delete this class action lawsuit?\nThis process can not be undone.',
            icon: 'error',
            showCancelButton: true,
            confirmButtonText: 'Delete',
            cancelButtonText: 'Cancel',
            customClass: {
            confirmButton: 'btn-danger text-white'
            }, 
            scrollbarPadding: false,
            heightAuto: false
        });
        
        if(!_result.isConfirmed)
            return;
        try {
            setSending(true);
            await deleteClassLawsuit(item.id);
        }
        finally {
            setSending(false);
        }
        onReload();
    }

    return (
        <div className="card shadow-sm mb-10">
            <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
                <h3 className='card-title align-items-start flex-column'>
                    <span className='fw-bolder text-dark fs-3'>Class Action Lawsuits { companySelected && (`- ${companySelected.name}`)} </span>
                    <span className='text-muted mt-1 fs-7'>List of Class Actions</span>
                </h3>
                <div className="d-flex gap-2 ms-auto align-items-center">
                    { data.length > 0 && (
                        <ToolbarWithFilter
                            props={FilterProps} 
                            filters={filters} 
                            setFilters={setFilters}
                            onReset={() => setFilters({ companyName: '', tyckerSymbol: '' })}
                        />
                    )}
                </div>
            </div>

            <div className="card-body py-3">
                <ClassLawsuitsTable 
                    data={filteredData}
                    loading={loading || sending}
                    onDelete={_onDelete}
                    onEdit={_onEdit}
                />
            </div>
        </div>
    )
}

export default ClassLawsuitsGrid;