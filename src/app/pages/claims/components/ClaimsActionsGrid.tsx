import React from 'react'
import {ColumnDef} from '@tanstack/react-table'
import TablePaginated from '../../../components/TablePaginated'
import {ClaimsActionsModel} from '../models/ClaimsActionsModel'

const columns: ColumnDef<ClaimsActionsModel, any>[] = [
  {header: 'Ticker Symbol', accessorKey: 'tyckerSymbol'},
  {header: 'Company Name', accessorKey: 'companyName'},
  {header: 'Lawsuit Type', accessorKey: 'lawsuitType'},
  {header: 'Eligibility', accessorKey: 'eligibility'},
  {
    header: 'Total Settlement Fund',
    accessorKey: 'totalSettlementFund',
    cell: (info) => info.getValue() || 'N/A',
  },
  {header: 'Claim Status', accessorKey: 'claimStatus'},
  {
    header: 'More Info',
    accessorKey: 'officialClaimFilingLink',
    cell: (info) =>
      info.getValue() ? (
        <a
          href={info.getValue() as string}
          target='_blank'
          rel='noopener noreferrer'
          className='btn btn-sm btn-light-primary'
        >
          View Link
        </a>
      ) : (
        <span className='badge badge-light-danger'>N/A</span>
      ),
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
        <div className='table-responsive'>
          <TablePaginated
            columns={columns}
            data={data}
            loading={loading}
            pageSize={5}
            message='Loading actions...'
          />
        </div>
      </div>
    </div>
  )
}

export default ClaimsActionsGrid
