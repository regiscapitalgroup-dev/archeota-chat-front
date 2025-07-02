import React from 'react'
import {ColumnDef} from '@tanstack/react-table'
import {ClaimTransactionModel} from '../models/ClaimsTransactionsModel'
import TableServerPaginated from '../../../components/TableServerPaginated'
import {useHistory} from 'react-router-dom'

type Props = {
  data: ClaimTransactionModel[]
  loading: boolean
  page: number
  setPage: (page: number) => void
  totalCount: number
  pageSize?: number 
}

const ClaimTransactionsTable: React.FC<Props> = ({
  data,
  loading,
  page,
  setPage,
  totalCount,
  pageSize = 10,
}) => {
  const history = useHistory()

  const columns: ColumnDef<ClaimTransactionModel, any>[] = [
    {header: 'Account Name', accessorKey: 'accountName'},
    {header: 'Account Type', accessorKey: 'accountType'},
    {header: 'Description', accessorKey: 'description'},
    {header: 'Symbol', accessorKey: 'symbol'},
    {
      header: 'Amount',
      accessorKey: 'amount',
      cell: (info) => `$${info.getValue()}`,
    },
  ]

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
        <h3 className='card-title align-items-start flex-column'>
          <span className='fw-bolder text-dark fs-3'>Claims Transactions</span>
          <span className='text-muted mt-1 fs-7'>List of claims transactions</span>
        </h3>
        <div className='card-toolbar'>
          <button
            className='btn btn-sm btn-dark'
            onClick={() => {
              history.push('/claims/upload-transactions')
            }}
          >
            Import file
          </button>
        </div>
      </div>
      <div className='card-body py-3'>
        <div className='table-responsive'>
          <TableServerPaginated
            columns={columns}
            data={data}
            loading={loading}
            message='Loading transactions...'
            pageIndex={page - 1}
            setPageIndex={(idx) => setPage(idx + 1)}
            totalPages={Math.ceil(totalCount / pageSize)}
            pageSize={pageSize}
          />
        </div>
      </div>
    </div>
  )
}

export default ClaimTransactionsTable
