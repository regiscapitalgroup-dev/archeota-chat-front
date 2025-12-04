import React, {useMemo, useState} from 'react'
import {TableColumn} from 'react-data-table-component'
import {ClaimTransactionModel} from '../models/ClaimsTransactionsModel'
import {useHistory} from 'react-router-dom'
import DataTableComponent from '../../../components/DataTableComponent'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import {getISODate, toShortDateString} from '../../../helpers/FormatDate'
import {ToolbarWithFilter} from './ToolbarWithFilter'
import { KTSVG } from '../../../../_metronic/helpers'
import ActionTable from '../../../components/ActionTable'
import Swal from 'sweetalert2'
import { deleteTransactionsClaim } from '../../../services/claimsService'
import { FilterProp } from '../../../components/molecules/models/FilterProp.Model'


const FilterProps: FilterProp[] = [
  {
    key: 'accountName',
    label: 'Account Name',
    type: 'text'
  },
  {
    key: 'tradeDate',
    label: 'Trade Date',
    type: 'date'
  },
  {
    key: 'symbol',
    label: 'Symbol',
    type: 'text'
  }
];


type Props = {
  data: ClaimTransactionModel[]
  loading: boolean
  setPage: (page: number) => void
  onReload: () => void
  totalCount: number
  page: number
  selectedUser?: any
}

const ClaimTransactionsTable: React.FC<Props> = ({
  data,
  loading,
  setPage,
  onReload,
  totalCount,
  page,
  selectedUser,
}) => {
  const history = useHistory()
  const [sending, setSending] = useState(false);
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

  const _onEditRecord = (row: ClaimTransactionModel) => history.push(`/claims/transactions/edit/${row.id}`);
  const _onDeleteRecord = async (row: ClaimTransactionModel) => {
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
      await deleteTransactionsClaim(row.id);
    }
    finally {
      setSending(false);
    }
    onReload();
  };

  const columns: TableColumn<ClaimTransactionModel>[] = [
    {name: 'Account Name', selector: (row) => row.accountName, sortable: true},
    {name: 'Account Type', selector: (row) => row.accountType, sortable: true},
    {name: 'Description', selector: (row) => row.description, sortable: true},
    {name: 'Symbol', selector: (row) => row.symbol, sortable: true},
    {
      name: 'Trade Date',
      selector: (row) => row.tradeDate,
      cell: (row) => {
        if(!row.tradeDate)
          return <></>
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
    {
      name: 'Actions',
      cell: (row) => (<ActionTable onDelete={async () => await _onDeleteRecord(row)} onEdit={() => _onEditRecord(row)}/>)
    }
  ]
  const handleReset = () => setFilters({accountName: '', tradeDate: '', symbol: ''})

  return (
    <div className='card shadow-sm mb-10'>
      <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center position-relative'>
          <h3 className='card-title align-items-start flex-column'>
            <span className='fw-bolder text-dark fs-3'>
              Transactional Brokerage {selectedUser ? selectedUser?.name : ''}
            </span>
            <span className='text-muted mt-1 fs-7'>List of movements</span>
          </h3>
        <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
          {data.length > 0 && (
            <ToolbarWithFilter filters={filters} setFilters={setFilters} onReset={handleReset} props={FilterProps} />
          )} 
          <button className='btn btn-sm btn-flex btn-active-dark fw-bolder active' onClick={() => history.push('/claims/transactions/new')}>
            <KTSVG
              path="/media/icons/duotune/general/gen041.svg" 
              className="svg-icon-5 svg-icon-gray-500 ms-1" 
            />
            New
          </button>
          
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
          loading={loading || sending}
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
