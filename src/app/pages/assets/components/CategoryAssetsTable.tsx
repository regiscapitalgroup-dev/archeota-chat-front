// CategoryAssetsTable.tsx

import React from 'react'
import DataTable, {TableColumn, ExpanderComponentProps} from 'react-data-table-component'
import {CategoryAssets, Asset} from '../models/AssetsGroupModel'
import {formatCurrencyUSD} from '../../../helpers/FormatCurrency'
import {KTSVG} from '../../../../_metronic/helpers'
import LoadingSpinner from '../../../components/LoadingSpinner'
import {useHistory} from 'react-router-dom'
import CountUp from 'react-countup'

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
> = ({data, onDetail, onEdit, loading}) => {
  const totalAcquisition = data.assets.reduce(
    (acc, item) => acc + (Number(item.acquisitionValue) || 0),
    0
  )

  const totalEstimated = data.assets.reduce(
    (acc, item) => acc + (Number(item.estimatedValue) || 0),
    0
  )
  return (
    <div style={{padding: 16, background: '#f8f9fa', borderRadius: '0 0 12px 12px'}}>
      <h6 style={{marginBottom: 12, fontWeight: 600, color: '#212529'}}>
        Assets in <b>{data.category}</b>
      </h6>
      <DataTable
        columns={[
          {name: 'Name', selector: (row: Asset) => row.name, width: '30%'},
          {
            name: 'Acquisition Value',
            selector: (row: Asset) => formatCurrencyUSD(Number(row.acquisitionValue) || 0),
            width: '25%',
            right: true,
          },
          {
            name: 'Estimated Value',
            selector: (row: Asset) => formatCurrencyUSD(Number(row.estimatedValue) || 0),
            width: '25%',
            right: true,
          },
          {
            name: 'Actions',
            width: '20%',
            cell: (row: Asset) => (
              <div className='d-flex justify-content-start gap-2'>
                <a
                  title='Detail'
                  type='button'
                  className='btn btn-icon  btn-active-color-dark btn-sm'
                  onClick={() => onDetail(row.id)}
                >
                  <KTSVG path='/media/icons/duotune/general/gen004.svg' className='svg-icon-3' />
                </a>
                <a
                  title='Edit'
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
      {/* Footer de totales */}
      <div
        style={{
          width: '100%',
          display: 'flex',
          background: '#222e3c', // Fondo oscuro y pro
          color: '#fff',
          fontWeight: 700,
          borderRadius: '0 0 8px 8px',
          borderTop: '3px solid #47525e',
          marginTop: -2,
          fontSize: 16,
          letterSpacing: 0.5,
          alignItems: 'center',
          boxShadow: '0 2px 6px rgba(0,0,0,0.10)',
        }}
      >
        <div style={{width: '30%', padding: '12px 8px'}}>Total</div>
        <div style={{width: '25%', padding: '12px 8px', textAlign: 'right'}}>
          {totalAcquisition.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        </div>
        <div style={{width: '25%', padding: '12px 8px', textAlign: 'right'}}>
          {totalEstimated.toLocaleString('en-US', {style: 'currency', currency: 'USD'})}
        </div>
        <div style={{width: '20%', padding: '12px 8px'}}></div>
      </div>
    </div>
  )
}

interface Props {
  data: CategoryAssets[]
}

const CategoryAssetsTable: React.FC<Props> = ({data, onDetail, onEdit, loading}) => {
  const history = useHistory()

  const handleCreateNew = () => {
    history.push('/assets/new')
  }

  const totalGlobalEstimated = React.useMemo(() => {
    return data.reduce((sum, category) => {
      const subtotal = category.assets.reduce(
        (acc, asset) => acc + (Number(asset.estimatedValue) || 0),
        0
      )
      return sum + subtotal
    }, 0)
  }, [data])

  const customHeader = (
    <div style={{display: 'flex', width: '100%', marginBottom: 8}}>
      <div style={{width: '30%'}} />
      <div
        style={{
          width: '25%',
          textAlign: 'right',
          fontWeight: 700,
          fontSize: 18,
          color: '#222e3c',
          letterSpacing: '0.5px',
        }}
      >
        Estimated Value :{' '}
        <CountUp
          end={totalGlobalEstimated}
          duration={1.5}
          separator=','
          decimals={2}
          decimal='.'
          prefix='$'
        />
      </div>
      <div style={{width: '25%'}} />
      {/* <div style={{ width: '20%' }} /> */}
    </div>
  )

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
          <div className='d-flex justify-content-center align-items-center mb-6 w-100'>
            <span className='fs-4 fw-semibold text-muted me-2' style={{whiteSpace: 'nowrap'}}>
              Total Estimated Value:
            </span>
            <span
              className='fs-2 fw-bolder text-dark'
              style={{
                lineHeight: 1,
                minWidth: '170px',
                display: 'inline-block',
                textAlign: 'left',
                fontVariantNumeric: 'tabular-nums',
              }}
            >
              $
              <CountUp
                end={totalGlobalEstimated}
                duration={1.5}
                decimals={2}
                separator=','
                decimal='.'
              >
                {({countUpRef}) => <span ref={countUpRef} />}
              </CountUp>
            </span>
          </div>

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
