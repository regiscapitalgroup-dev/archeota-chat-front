import React, {FC} from 'react'
import {PageTitle} from '../../../_metronic/layout/core'
import {AssetsPage} from './AssetsPage'
const AssetsPageWrapper: FC = () => {
  return (
    <>
      <PageTitle breadcrumbs={[]}>Assets</PageTitle>
      <AssetsPage />
    </>
  )
}

export default AssetsPageWrapper
