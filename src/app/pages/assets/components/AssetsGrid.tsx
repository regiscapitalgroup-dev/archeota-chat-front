import React from 'react'
import {KTSVG} from '../../../../_metronic/helpers'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'

interface AssetTableProps {
  assets: any[]
  onEdit: (id: number) => void
  onDetail: (id: number) => void
}

const AssetsGrid: React.FC<AssetTableProps> = ({assets, onEdit, onDetail}) => {
  return (
    <table className='table align-middle table-row-dashed fs-6 gy-5'>
      <thead>
        <tr className='text-start text-muted fw-bold fs-7 text-uppercase gs-0'>
          <th>Name</th>
          <th>Value</th>
          <th>Value Over Time</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        {assets.map((asset: any) => (
          <tr key={asset.id}>
            <td>
              <span
                onClick={() => onDetail(asset.id)}
                className='text-dark fw-bold text-hover-primary cursor-pointer'
              >
                {asset.name}
              </span>
            </td>

            <td>{formatCurrencyUSD(asset.value)}</td>
            <td>{formatCurrencyUSD(asset.valueOverTime)}</td>
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
