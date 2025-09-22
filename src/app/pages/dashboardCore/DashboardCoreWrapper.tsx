/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import StatusClaimsChart from './components/StatusClaimsChart'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'

const DashboardCorePage: FC = () => {
 const selectedUser = useSelector((state: RootState) => state?.selectedUser?.current)

  return (
    <>
      {/* begin::Row */}
      <div className='card shadow-sm mb-10'>
        <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center'>
          <h3 className='card-title align-items-start flex-column mb-10'>
            <span className='fw-bolder text-dark fs-3'>
              {`Claims ${selectedUser ? selectedUser?.name : ''}`}{' '}
            </span>
            <span className='text-muted mt-1 fs-7'>Claims by status statistics</span>
          </h3>
        </div>
        <div className='d-flex flex-column h-100'>
          <div className='card flex-grow-1 d-flex flex-column'>
            <StatusClaimsChart selectedUser={selectedUser} />
          </div>
        </div>
      </div>
      {/* end::Row */}
    </>
  )
}

const DashboardCoreWrapper: FC = () => {
  return (
    <>
      <DashboardCorePage />
    </>
  )
}

export {DashboardCoreWrapper}
