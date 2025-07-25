import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {formatLogDateTime, toShortDateString} from '../../../helpers/FormatDate'
import {ImportJobLog} from '../models/ClaimsTransactionsErrorLogModel'

type Props = {
  logs: ImportJobLog[]
  loading?: boolean
}

const isDateField = (key: string, value: unknown): boolean => {
  return (
    key.toLowerCase().includes('date') && value != null && !isNaN(new Date(String(value)).getTime())
  )
}

const ErrorLogsTimeline: React.FC<Props> = ({logs, loading}) => {
  if (loading) {
    return (
      <div className='text-center py-10'>
        <span className='spinner-border text-primary' role='status' />
        <span className='ms-3'>Loading logs...</span>
      </div>
    )
  }

  if (!logs.length) {
    return (
      <div className='text-center py-10 text-muted fs-5'>
        <KTSVG path='/media/icons/duotune/general/gen040.svg' className='svg-icon-3x mb-3' />
        No errors found.
      </div>
    )
  }

  return (
    <div
      className='mx-auto'
      style={{
        background: '#fff',
        borderRadius: 18,
        boxShadow: '0 4px 24px 0 rgba(40,80,170,0.07)',
        padding: '28px 18px',
        marginBottom: 40,
        marginTop: 20,
        overflow: 'hidden',
      }}
    >
      <div className='d-flex align-items-center justify-content-between bg-light-danger bg-opacity-75 rounded p-4 mb-5 border border-danger border-dashed'>
        <div className='d-flex align-items-center gap-3'>
          <KTSVG
            path='/media/icons/duotune/general/gen044.svg'
            className='svg-icon-2hx text-danger'
          />
          <div>
            <h4 className='text-danger fw-bold mb-1'>Validation Errors Found</h4>
            <div className='text-gray-700 fs-7'>
              Total <strong>{logs.length}</strong> errors in the uploaded file.
            </div>
          </div>
        </div>
        <span className='badge badge-danger fw-bold fs-7 px-4 py-2 shadow-sm'>
          {logs.length} ERRORS
        </span>
      </div>
      <div style={{maxHeight: '440px', overflowY: 'auto', paddingRight: 6}}>
        {logs.map((error) => (
          <div key={error.id} className='mb-5'>
            {/* Header */}
            <div className='d-flex justify-content-between align-items-center mb-2'>
              <span className='text-muted fs-8'>{formatLogDateTime(error.createdAt)}</span>
              <span className='badge badge-light-danger fw-bold px-3 py-1'>Error</span>
            </div>

            {/* Error Card */}
            <div
              className='bg-light-danger bg-opacity-25 rounded p-5 transition'
              style={{transition: 'box-shadow 0.2s, border 0.2s'}}
              onMouseEnter={(e) => {
                e.currentTarget.style.border = '1px solid rgba(220,53,69,0.6)'
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none'
                e.currentTarget.style.border = 'none'
              }}
            >
              {/* Row header */}
              <div className='d-flex align-items-start mb-4'>
                <KTSVG
                  path='/media/icons/duotune/art/art002.svg'
                  className='svg-icon-2hx text-danger me-3 mt-1'
                />
                <div>
                  <h6 className='text-danger mb-1 fw-bold fs-6'>Row {error.rowNumber}</h6>
                  <div className='text-gray-800 fs-7'>{error.errorMessage}</div>
                </div>
              </div>

              {/* Grid fields */}
              <div className='row g-3'>
                {Object.entries(error.rowData).map(([key, value]) => (
                  <div key={key} className='col-md-4'>
                    <div className='bg-white p-3 rounded border h-100'>
                      <span className='text-muted fs-8 fw-semibold'>{key}</span>
                      {value === null || value === undefined ? (
                        <span className='badge badge-light-danger mt-1 fw-bold fs-8'>
                          Missing value
                        </span>
                      ) : (
                        <span
                          className='fw-bold text-dark fs-7 mt-1 d-block'
                          style={{wordBreak: 'break-word'}}
                        >
                          {isDateField(key, value)
                            ? toShortDateString(String(value))
                            : String(value)}
                        </span>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}

export default ErrorLogsTimeline
