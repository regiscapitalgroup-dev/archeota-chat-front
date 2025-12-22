import React, { useMemo, useState } from 'react';
import { TableColumn } from 'react-data-table-component';
import { useHistory } from 'react-router';
import Swal from 'sweetalert2';
import { KTSVG } from '../../../../_metronic/helpers';
import DataTableComponent from '../../../components/DataTableComponent';
import { formatCurrency } from '../../../helpers/FormatCurrency';
import { deleteActionsClaim } from '../../../services/claimsService';
import { filterData } from '../../../services/utilsService';
import { ClaimsActionsModel } from '../models/ClaimsActionsModel';
import { FilterProp } from '../../../components/molecules/models/FilterProp.Model';
import ActionTable from '../../../components/ActionTable';
import { ToolbarWithFilter } from './ToolbarWithFilter';
import ClaimsActionTable from './molecules/ClaimsActionTable';
import CompanySelectorTool from './molecules/CompanySelectorTool';
import { CompanyModel } from '../../users/models/CompanyModel';
import { CompanyOptions } from './atoms/models/CompanyOptions';
import ClaimStatus from './atoms/ClaimStatus';
import { ClaimStatusEnum } from './atoms/enums/ClaimStatusEnum';

const FilterProps: FilterProp[] = [
  {
    key: 'companyName',
    label: 'Company Name',
    type: 'text'
  },
  {
    key: 'lawsuitType',
    label: 'Lawsuit Type',
    type: 'text'
  },
  {
    key: 'tyckerSymbol',
    label: 'Ticket Symbol',
    type: 'text'
  },
  {
    key: 'claimStatus',
    label: 'Claim Status',
    type: [ 
      'Active',
      'In Progress', 
      'Closed' 
    ]
  }
];

type Filter = {
  companyName: string; 
  lawsuitType: string, 
  tyckerSymbol: string; 
  claimStatus: string[];
}

type ClaimsActionsGridProps = {
  data: ClaimsActionsModel[];
  loading: boolean;
  companies: CompanyModel[];
  loadingCompanies: boolean;
  companySelected: CompanyModel | null;
  canClaim: boolean;
  claimStatus: ClaimStatusEnum | null;
  onCompanySelect: (company: CompanyOptions | null) => void;
  onReload: () => void;
  onClaim: (id: number) => void;
}

const ClaimsActionsGrid: React.FC<ClaimsActionsGridProps> = ({data, loading, companies, loadingCompanies, companySelected, canClaim, claimStatus, onCompanySelect, onReload, onClaim}) => {
  const [sending, setSending] = useState(false);
  const [filters, setFilters] = useState({ companyName: '', lawsuitType: '', tyckerSymbol: '', claimStatus: [] } as Filter);
  const filteredData = useMemo(() => filterData(data, filters), [data, filters]);
  const history = useHistory();

  const _onDeleteRecord = async (id: number) => {
    const _result = await Swal.fire({
      title: 'Delete claim action',
      text: 'Do you really want to delete this claim action?\nThis process can not be undone.',
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
      await deleteActionsClaim(id);
    }
    finally {
      setSending(false);
    }
    onReload();
  };

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Claims Actions {companySelected && (`- ${companySelected.name}`)}</span>
          <span className='text-muted mt-1 fs-7'>List of claims actions</span>
        </h3>
        <div className="d-flex gap-2 ms-auto align-items-center">
          {
            companies.length > 1 && (
              <CompanySelectorTool 
                companies={companies}
                isLoading={loadingCompanies}
                companySelected={companySelected}
                onSelect={onCompanySelect}
              />
          )}
          { data.length > 0 && 
            <ToolbarWithFilter props={FilterProps} filters={filters} setFilters={setFilters} onReset={() => setFilters({ companyName: '', lawsuitType: '', tyckerSymbol: '', claimStatus: [] })} />
          }
          <button className='btn btn-sm btn-flex btn-active-dark fw-bolder active' onClick={() => history.push('/claims/actions/new')}>
            <KTSVG
              path="/media/icons/duotune/general/gen041.svg" 
              className="svg-icon-5 svg-icon-gray-500 ms-1" 
            />
            New
          </button>
        </div>
      </div>
      <div className='card-body py-3'>
        <ClaimsActionTable 
          data={filteredData}
          isLoading={loading || sending}
          onEdit={(id) => history.push(`/claims/actions/edit/${id}`)}
          onDelete={_onDeleteRecord}
          canClaim={canClaim}
          onClaim={onClaim}
          onDetails={(id) => history.push(`/claims/actions/details/${id}`)}
        />
        {claimStatus && (
          <ClaimStatus type={claimStatus}/>
        )}
      </div>
    </div>
  )
}

export default ClaimsActionsGrid
