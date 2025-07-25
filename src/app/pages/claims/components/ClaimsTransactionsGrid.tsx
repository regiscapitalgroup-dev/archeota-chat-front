import React, {useMemo, useState} from 'react'
import {TableColumn} from 'react-data-table-component'
import {ClaimTransactionModel} from '../models/ClaimsTransactionsModel'
import {useHistory} from 'react-router-dom'
import DataTableComponent from '../../../components/DataTableComponent'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import {getISODate, toShortDateString} from '../../../helpers/FormatDate'
import {ToolbarWithFilter} from './ToolbarWithFilter'

type Props = {
  data: ClaimTransactionModel[]
  loading: boolean
  setPage: (page: number) => void
  totalCount: number
  page: number
}

const ClaimTransactionsTable: React.FC<Props> = ({data, loading, setPage, totalCount, page}) => {
  const history = useHistory()

  const [filters, setFilters] = useState({accountName: '', tradeDate: '', symbol: ''})
  const filteredItems = useMemo(
    () =>
      data.filter((item) => {
        const accountMatch =
          !filters.accountName ||
          (item.accountName &&
            item.accountName.toLowerCase().includes(filters.accountName.toLowerCase()))
        const dateMatch =
          !filters.tradeDate ||
          (item.tradeDate && getISODate(item.tradeDate) === getISODate(filters.tradeDate))

        const symbolMatch =
          !filters.symbol ||
          (item.symbol && item.symbol.toLowerCase().includes(filters.symbol.toLowerCase()))
        return accountMatch && dateMatch && symbolMatch
      }),
    [data, filters]
  )

  const columns: TableColumn<ClaimTransactionModel>[] = [
    {name: 'Account Name', selector: (row) => row.accountName, sortable: true},
    {name: 'Account Type', selector: (row) => row.accountType, sortable: true},
    {name: 'Description', selector: (row) => row.description, sortable: true},
    {name: 'Symbol', selector: (row) => row.symbol, sortable: true},
    {
      name: 'Trade Date',
      selector: (row) => row.tradeDate,
      cell: (row) => {
        return <div>{toShortDateString(row.tradeDate)}</div>
      },
      sortable: true,
    },
    {
      name: 'Amount',
      selector: (row) => formatCurrencyUSD(Number(row.amount) ?? 0),
      sortable: true,
      right: true,
    },
  ]
  const handleReset = () => setFilters({accountName: '', tradeDate: '', symbol: ''})

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center position-relative'>
        <div>
          <h3 className='card-title align-items-start flex-column'>
            <span className='fw-bolder text-dark fs-3'>Stock Transactions </span>
            <span className='text-muted mt-1 fs-7'>List of movements</span>
          </h3>
        </div>
        <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
          {data.length > 0 && (
            <ToolbarWithFilter filters={filters} setFilters={setFilters} onReset={handleReset} />
          )}

          <button
            className='btn btn-sm btn-dark'
            onClick={() => history.push('/claims/upload-transactions')}
          >
            Import file
          </button>
        </div>
      </div>

      <div className='card-body py-3'>
        <DataTableComponent
          columns={columns}
          data={filteredItems}
          loading={loading}
          pagination
          paginationServer
          totalRows={totalCount}
          onChangePage={(page) => setPage(page)}
          customTitle={null}
          paginationDefaultPage={page}
        />
      </div>
    </div>
  )
}

export default ClaimTransactionsTable
