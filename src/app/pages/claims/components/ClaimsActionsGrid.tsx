import React, { useMemo, useState } from 'react'
import { useHistory } from 'react-router';
import { TableColumn } from 'react-data-table-component'
import DataTableComponent from '../../../components/DataTableComponent'
import { filterData } from '../../../services/utilsService'
import { ClaimsActionsModel } from '../models/ClaimsActionsModel'
import { FilterProp } from '../models/FilterProp.Model'
import ActionTable from './ActionTable'
import { ToolbarWithFilter } from './ToolbarWithFilter'
import { KTSVG } from '../../../../_metronic/helpers';
import Swal from 'sweetalert2';
import { deleteActionClaim } from '../../../services/cliamsService';

const FilterProps: FilterProp[] = [
  {
    key: 'companyName',
    label: 'Company Name',
    type: 'input'
  },
  {
    key: 'lawsuitType',
    label: 'Lawsuit Type',
    type: 'input'
  },
  {
    key: 'tyckerSymbol',
    label: 'Ticket Symbol',
    type: 'input'
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
  selectedUser?: any;
  onReload: () => void;
}

const ClaimsActionsGrid: React.FC<ClaimsActionsGridProps> = ({data, loading, selectedUser, onReload}) => {
  const [filters, setFilters] = useState({ companyName: '', lawsuitType: '', tyckerSymbol: '', claimStatus: [] } as Filter)
  const filteredData = useMemo(() => filterData(data, filters), [data, filters]);
  const history = useHistory();

  const _onEditRecord = (row: ClaimsActionsModel) => history.push(`/claims/actions/edit/${row.id}`);
  const _onDeleteRecord = async (row: ClaimsActionsModel) => {
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
    await deleteActionClaim(row.id);
    onReload();
  };


  let columns: TableColumn<ClaimsActionsModel>[] = [
    {name: 'Ticker Symbol', selector: (row) => row.tyckerSymbol, sortable: true},
    {name: 'Company Name', selector: (row) => row.companyName, sortable: true},
    {name: 'Lawsuit Type', selector: (row) => row.lawsuitType, sortable: true},
    {name: 'Eligibility', selector: (row) => row.eligibility, sortable: true},
    {
      name: 'Total Settlement Fund',
      selector: (row) => row.totalSettlementFund,
      cell: (row) => row.totalSettlementFund || 'N/A',
      sortable: true,
    },
    {name: 'Claim Status', selector: (row) => row.claimStatus, sortable: true},
    {
      name: 'More Info',
      selector: (row) => row.officialClaimFilingLink || '',
      cell: (row) =>
        row.officialClaimFilingLink ? (
          <a
            href={row.officialClaimFilingLink}
            target='_blank'
            rel='noopener noreferrer'
            style={{color: '#009EF7', textDecoration: 'underline'}}
          >
            View Link
          </a>
        ) : (
          <span className='badge badge-light-danger'>N/A</span>
        ),
      ignoreRowClick: true,
      allowOverflow: true,
    },
    {
      name: 'Actions',
      cell: (row) => (<ActionTable onDelete={async () => await _onDeleteRecord(row)} onEdit={() => _onEditRecord(row)}/>)
    }
  ]

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Claims Actions {selectedUser?  selectedUser?.name : ""}</span>
          <span className='text-muted mt-1 fs-7'>List of claims actions</span>
        </h3>
        <div className="d-flex gap-2 ms-auto align-items-center">
          <ToolbarWithFilter props={FilterProps} filters={filters} setFilters={setFilters} onReset={() => setFilters({ companyName: '', lawsuitType: '', tyckerSymbol: '', claimStatus: [] })} />
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
        <DataTableComponent
          columns={columns}
          data={filteredData}
          loading={loading}
          pagination
          paginationServer={false}
          totalRows={filteredData.length}
          customTitle={null}
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default ClaimsActionsGrid
