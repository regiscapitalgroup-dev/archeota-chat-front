// CategoryAssetsTable.tsx

import React from 'react'
import DataTable, {TableColumn, ExpanderComponentProps} from 'react-data-table-component'
import {CategoryAssets, Asset} from '../models/AssetsGroupModel'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import {KTSVG} from '../../../../_metronic/helpers'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {useHistory} from 'react-router-dom'

interface Props {
  data: CategoryAssets[]
  onDetail: (id: number) => void
  onEdit: (id: number) => void
  loading: boolean
}

const columns: TableColumn<CategoryAssets>[] = [
  {
    name: 'Category',
    selector: (row) => row.category,
    sortable: true,
  },
  {
    name: 'Assets Count',
    selector: (row) => row.assets.length,
    sortable: true,
    right: true,
  },
]

const AssetExpandComponent: React.FC<
  ExpanderComponentProps<CategoryAssets> & {
    onDetail: (id: number) => void
    onEdit: (id: number) => void
    loading: boolean
  }
> = ({data, onDetail, onEdit, loading}) => (
  <div style={{padding: 16}}>
    <h6 style={{marginBottom: 8}}>
      Assets in <b>{data.category}</b>
    </h6>
    <DataTable
      columns={[
        {name: 'Name', selector: (row: Asset) => row.name},
        {
          name: 'Acquisition Value',
          selector: (row: Asset) => formatCurrencyUSD(Number(row.acquisitionValue) || 0),
        },
        {
          name: 'Estimated Value',
          selector: (row: Asset) => formatCurrencyUSD(Number(row.estimatedValue) || 0),
        },
        {
          name: 'Acctions',
          cell: (row: Asset) => (
            <div className='d-flex justify-content-start gap-2'>
              {/* Botón Ver Detalle */}
              <a
                title='Detail'
                type='button'
                className='btn btn-icon  btn-active-color-dark btn-sm'
                onClick={() => onDetail(row.id)}
              >
                <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
              </a>

              {/* Botón Editar */}
              <a
                title='Edit'
                /*   type='button' */
                className='btn btn-icon btn-active-color-dark btn-sm'
                onClick={() => onEdit(row.id)}
              >
                <KTSVG path='/media/icons/duotune/art/art005.svg' className='svg-icon-3' />
              </a>
            </div>
          ),
        },
      ]}
      data={data.assets}
      dense
      noHeader
      highlightOnHover
      striped
      pagination={false}
    />
  </div>
)

interface Props {
  data: CategoryAssets[]
}

const CategoryAssetsTable: React.FC<Props> = ({data, onDetail, onEdit, loading}) => {
  const history = useHistory()

  const handleCreateNew = () => {
    history.push('/assets/new')
  }

  return (
    <>
      <div className='card shadow-sm mb-10'>
        <div className='card-header border-0 pt-5 d-flex justify-content-between align-items-center position-relative'>
          <div>
            <h3 className='card-title align-items-start flex-column'>
              <span className='fw-bolder text-dark fs-3'>Assets</span>
              <span className='text-muted mt-1 fs-7'>List of assets by category</span>
            </h3>
          </div>
          <div className='d-flex gap-2 ms-auto align-items-center position-relative'>
            <button className='btn btn-sm btn-dark' onClick={handleCreateNew}>
              <i className='bi bi-plus fs-5 me-2'></i>
              New Asset
            </button>
          </div>
        </div>

        <div className='card-body py-3'>
          <DataTable
            title=''
            columns={columns}
            data={data}
            pagination
            expandableRows
            expandableRowsComponent={(props) => (
              <AssetExpandComponent
                {...props}
                onDetail={onDetail}
                onEdit={onEdit}
                loading={loading}
              />
            )}
            highlightOnHover
            striped
            progressPending={loading}
            progressComponent={<LoadingSpinner message='Loading data...' />}
          />
        </div>
      </div>
    </>
  )
}

export default CategoryAssetsTable
