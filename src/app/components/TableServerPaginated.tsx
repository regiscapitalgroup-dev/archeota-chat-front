import React, { useMemo, useState, useEffect } from 'react'
import {
  useReactTable,
  getCoreRowModel,
  flexRender,
  ColumnDef,
} from '@tanstack/react-table'
import LoadingSpinner from './LoadingSpinner'

type Props<T extends object> = {
  columns: ColumnDef<T, any>[]
  data: T[]
  pageSize?: number
  loading?: boolean
  message: string
  pageIndex?: number 
  setPageIndex?: (page: number) => void
  totalPages?: number
}

function TableServerPaginated<T extends object>({
  columns,
  data,
  pageSize = 10,
  loading = false,
  message,
  pageIndex: controlledPageIndex,
  setPageIndex: controlledSetPageIndex,
  totalPages: controlledTotalPages,
}: Props<T>) {
  const [localPageIndex, setLocalPageIndex] = useState(0)

  const isControlled =
    controlledPageIndex !== undefined &&
    controlledSetPageIndex !== undefined &&
    controlledTotalPages !== undefined

  const pageIndex = isControlled ? controlledPageIndex! : localPageIndex
  const setPageIndex = isControlled ? controlledSetPageIndex! : setLocalPageIndex
  const totalPages = isControlled
    ? controlledTotalPages!
    : Math.ceil(data.length / pageSize)

  // For local pagination only
  const pagedData = useMemo(
    () =>
      isControlled
        ? data // data ya viene paginada del backend
        : data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [data, pageIndex, pageSize, isControlled]
  )

  useEffect(() => {
    if (!isControlled) setLocalPageIndex(0)
  }, [data]) // Reset on new data

  const table = useReactTable({
    data: pagedData,
    columns,
    getCoreRowModel: getCoreRowModel(),
  })

  return (
    <div className="table-responsive">
      {loading ? (
        <LoadingSpinner message={message} />
      ) : (
        <>
          <table className="table table-row-dashed table-row-gray-300 align-middle gs-0 gy-4">
            <thead>
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id}>
                  {headerGroup.headers.map(header => (
                    <th key={header.id} className="fw-bold">
                      {flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {table.getRowModel().rows.length === 0 ? (
                <tr>
                  <td colSpan={columns.length} className="text-center">
                    No data found.
                  </td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id}>
                    {row.getVisibleCells().map(cell => (
                      <td key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </td>
                    ))}
                  </tr>
                ))
              )}
            </tbody>
          </table>
          {/* Pagination controls */}
          <div className="d-flex justify-content-between align-items-center mt-4">
            <button
              className="btn btn-light"
              disabled={pageIndex === 0}
              onClick={() => setPageIndex(pageIndex - 1)}
            >
              Previous
            </button>
            <span>
              Page <strong>{pageIndex + 1}</strong> of{' '}
              <strong>{totalPages || 1}</strong>
            </span>
            <button
              className="btn btn-light"
              disabled={pageIndex + 1 >= totalPages}
              onClick={() => setPageIndex(pageIndex + 1)}
            >
              Next
            </button>
          </div>
        </>
      )}
    </div>
  )
}

export default TableServerPaginated
