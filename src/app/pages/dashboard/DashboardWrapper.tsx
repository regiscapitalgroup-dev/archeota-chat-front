/* eslint-disable jsx-a11y/anchor-is-valid */
import React, {FC} from 'react'
import {ChatInner} from '../../../_metronic/partials/chat/ChatInner'

const DashboardPage: FC = () => (
  <>
    {/* begin::Row */}
    <div className='row gy-5 g-xl-8'>
      <div className='card'>
        <ChatInner isDrawer />
      </div>
    </div>
    {/* end::Row */}
  </>
)

const DashboardWrapper: FC = () => {
  /*  const intl = useIntl() */
  return (
    <>
      {/* <PageTitle breadcrumbs={[]}>{intl.formatMessage({id: 'MENU.DASHBOARD'})}</PageTitle> */}
      <DashboardPage />
    </>
  )
}

export {DashboardWrapper}
