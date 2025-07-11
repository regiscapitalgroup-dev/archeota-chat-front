

import React from 'react'
import DataTable, { TableColumn } from 'react-data-table-component'

type DataTableComponentProps<T> = {
  columns: TableColumn<T>[]
  data: T[]
  loading?: boolean
  pagination?: boolean
  paginationServer?: boolean
  totalRows?: number
  onChangePage?: (page: number) => void
  onChangeRowsPerPage?: (currentRowsPerPage: number, currentPage: number) => void
  customTitle?: React.ReactNode
  actions?: React.ReactNode
  highlightOnHover?: boolean
  selectableRows?: boolean
  subHeader?: boolean
  subHeaderComponent?: React.ReactNode
  paginationDefaultPage?: number  
}

function DataTableComponent<T extends object>({
  columns,
  data,
  loading = false,
  pagination = true,
  paginationServer = true,
  totalRows,
  onChangePage,
  onChangeRowsPerPage,
  customTitle,
  actions,
  highlightOnHover = true,
  selectableRows = false,
  subHeader,
  subHeaderComponent,
  paginationDefaultPage,   
}: DataTableComponentProps<T>) {
  return (
    <DataTable
      title={customTitle}
      columns={columns}
      data={data}
      progressPending={loading}
      pagination={pagination}
      paginationServer={paginationServer}
      paginationTotalRows={totalRows}
      onChangePage={onChangePage}
      onChangeRowsPerPage={onChangeRowsPerPage}
      highlightOnHover={highlightOnHover}
      selectableRows={selectableRows}
      actions={actions}
      responsive
      dense
      subHeader={subHeader}
      subHeaderComponent={subHeaderComponent}
      paginationDefaultPage={paginationDefaultPage} 
    />
  )
}

export default DataTableComponent
