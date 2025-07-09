import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import LoadingSpinner from '../../../components/LoadingSpinner'

interface AssetTableProps {
  assets: any[]
  onEdit: (id: number) => void
  onDetail: (id: number) => void
  loading: boolean
}

const AssetsGrid: React.FC<AssetTableProps> = ({assets, onEdit, onDetail, loading}) => {
  if (loading) {
    return <LoadingSpinner message='Loading assets...' />
  }

  if (!assets.length) {
    return <p className='text-center'>No data available.</p>
  }

  return (
    <table className='table align-middle table-row-dashed fs-6 gy-5'>
      <thead>
        <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0'>
          <th>Name</th>
          <th>Estimated Value</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset: any) => (
          <tr key={asset.id}>
            <td>
              <span
                onClick={() => onEdit(asset.id)}
                className='text-dark fw-bold text-hover-primary cursor-pointer'
              >
                {asset?.name}
              </span>
            </td>
            <td>{formatCurrencyUSD(asset?.valueOverTime)}</td>
            <td className='text-center'>
              <div className='d-flex justify-content-start gap-2'>
                {/* Botón Ver Detalle */}
                <button
                  title='Detail'
                  type='button'
                  className='btn btn-icon btn-bg-light btn-active-color-dark btn-sm'
                  onClick={() => onDetail(asset.id)}
                >
                  <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
                </button>

                {/* Botón Editar */}
                <button
                  title='Edit'
                  type='button'
                  className='btn btn-icon btn-bg-light btn-active-color-dark btn-sm'
                  onClick={() => onEdit(asset.id)}
                >
                  <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
                </button>
              </div>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default AssetsGrid
