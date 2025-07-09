import React, {useEffect, useMemo, useState} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import AssetsForm from './components/AssetsForm'
import {getAssetById, getAssets} from '../../services/assetsService'
import AssetTable from './components/AssetsGrid'
import AssetsDetail from './components/AssetsDetail'
import CategoryAssetsTable from './components/CategoryAssetsTable'
import { RouteParamsModel } from '../shared/models/RouteParamsModel'
import { useAssetsByCategories } from '../../hooks/assets/useAssetsByCategories'

const AssetsPage: React.FC = () => {
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [loadingAsset, setLoadingAsset] = useState(false)
  const [reload, setReload] = useState(Math.random() * 40);
  const history = useHistory()
  const location = useLocation()
  const isEditMode = location.pathname.includes('/assets/edit')
  const isNewMode = location.pathname.includes('/assets/new')
  const isDetailMode = location.pathname.includes('/assets/detail')
  const {data, loading:loadingAssets} = useAssetsByCategories(reload)
  const {id: routeId} = useParams<RouteParamsModel>()

  useEffect(() => {
    const fetchAsset = async () => {
      if ((routeId && isEditMode) || isDetailMode) {
        setLoadingAsset(true)
        const asset = await getAssetById(Number(routeId))
        setSelectedAsset(asset)
        setLoadingAsset(false)
      } else {
        setSelectedAsset(null)
      }
    }

    fetchAsset()
  }, [isEditMode, isDetailMode, routeId])

  const handleCreateNew = () => {
    history.push('/assets/new')
  }

  const handleEdit = (assetId: number) => {
    history.push(`/assets/edit/${assetId}`)
  }

  const handleSuccess = () => {
    setReload(Math.random() * 50)
    history.push('/assets')
  }

  const handleDetail = (assetId: number) => {
    history.push(`/assets/detail/${assetId}`)
  }

  return (
    <div className='card mb-10'>
      <div className='card-header d-flex justify-content-between align-items-center'>
        <h3 className='card-title'>Assets</h3>

        {!isEditMode && !isNewMode && !isDetailMode && (
          <button className='btn btn-dark' onClick={handleCreateNew}>
             <i className='bi bi-plus fs-5 me-2'></i>
            New Asset
          </button>
        )}
      </div>

      <div className='card-body'>
        {isEditMode || isNewMode || isDetailMode ? (
          /* !loadingAsset && ( */
            <>
              {isDetailMode ? (
                <AssetsDetail data={selectedAsset} />
              ) : (
                <AssetsForm
                  isEdit={isEditMode}
                  initialData={selectedAsset}
                  onSuccess={handleSuccess}
                  loadingInfo={loadingAsset}
                />
              )}
            </>
          /* ) */
        ) : (
          
          <>
          {/* <AssetTable assets={assets} onEdit={handleEdit} onDetail={handleDetail} loading={loading} /> */}
          <CategoryAssetsTable data={data} onEdit={handleEdit} onDetail={handleDetail} loading={loadingAssets} />
        </>
        )}
      </div>
    </div>
  )
}

export {AssetsPage}
