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
  loading?: boolean,
  message: string
}

function TablePaginated<T extends object>({
  columns,
  data,
  pageSize = 10,
  loading = false,
  message
}: Props<T>) {
  const [pageIndex, setPageIndex] = useState(0)

  // When data changes, reset to first page
  useEffect(() => {
    setPageIndex(0)
  }, [data])

  const totalPages = Math.ceil(data.length / pageSize)

  const pagedData = useMemo(
    () => data.slice(pageIndex * pageSize, (pageIndex + 1) * pageSize),
    [data, pageIndex, pageSize]
  )

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
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
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
              Page <strong>{pageIndex + 1}</strong> of <strong>{totalPages || 1}</strong>
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

export default TablePaginated
