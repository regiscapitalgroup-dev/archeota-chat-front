import React from 'react'
import {TableColumn} from 'react-data-table-component'
import DataTableComponent from '../../../components/DataTableComponent'
import {ClaimsActionsModel} from '../models/ClaimsActionsModel'

const columns: TableColumn<ClaimsActionsModel>[] = [
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
]

type ClaimsActionsGridProps = {
  data: ClaimsActionsModel[]
  loading: boolean
}

const ClaimsActionsGrid: React.FC<ClaimsActionsGridProps> = ({data, loading}) => {
  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Claims Actions</span>
          <span className='text-muted mt-1 fs-7'>List of claims actions</span>
        </h3>
      </div>
      <div className='card-body py-3'>
        <DataTableComponent
          columns={columns}
          data={data}
          loading={loading}
          pagination
          paginationServer={false}
          totalRows={data.length}
          customTitle={null}
          highlightOnHover
        />
      </div>
    </div>
  )
}

export default ClaimsActionsGrid
