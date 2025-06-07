import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import AssetsForm from './components/AssetsForm'
import {getAssetById, getAssets} from '../../services/assetsService'
import AssetTable from './components/AssetsGrid'
import AssetsDetail from './components/AssetsDetail'
import { RouteParamsModel } from '../shared/models/RouteParamsModel'

const AssetsPage: React.FC = () => {
  const [assets, setAssets] = useState([])
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [loadingAsset, setLoadingAsset] = useState(false)
  const history = useHistory()
  const location = useLocation()
  const isEditMode = location.pathname.includes('/assets/edit')
  const isNewMode = location.pathname.includes('/assets/new')
  const isDetailMode = location.pathname.includes('/assets/detail')

  const loadAssets = async () => {
    const data = await getAssets()
    setAssets(data)
  }

  const {id: routeId} = useParams<RouteParamsModel>()

  useEffect(() => {
    loadAssets()
  }, [])

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
    loadAssets()
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
            New Asset
          </button>
        )}
      </div>

      <div className='card-body'>
        {isEditMode || isNewMode || isDetailMode ? (
          !loadingAsset && (
            <>
              {isDetailMode ? (
                <AssetsDetail data={selectedAsset} />
              ) : (
                <AssetsForm
                  isEdit={isEditMode}
                  initialData={selectedAsset}
                  onSuccess={handleSuccess}
                />
              )}
            </>
          )
        ) : (
          <AssetTable assets={assets} onEdit={handleEdit} onDetail={handleDetail} />
        )}
      </div>
    </div>
  )
}

export {AssetsPage}
