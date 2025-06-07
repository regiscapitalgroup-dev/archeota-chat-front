/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {ChatInner} from '../../../_metronic/partials/chat/ChatInner'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}    
    <div className='d-flex flex-column h-100'>
      <div className='card flex-grow-1 d-flex flex-column'>
        <ChatInner isDrawer={true} />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const DashboardWrapper: FC = () => {
  return (
    <>
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
