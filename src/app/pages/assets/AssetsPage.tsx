import React, {useEffect, useState} from 'react'
import {useHistory, useLocation, useParams} from 'react-router-dom'
import AssetsForm from './components/AssetsForm'
import {getAssetById} from '../../services/assetsService'
import AssetsDetail from './components/AssetsDetail'
import CategoryAssetsTable from './components/CategoryAssetsTable'
import {RouteParamsModel} from '../shared/models/RouteParamsModel'
import {useAssetsByCategories} from '../../hooks/assets/useAssetsByCategories'
import {useSelector} from 'react-redux'
import {RootState} from '../../../setup'

const AssetsPage: React.FC = () => {
  const selectedUser = useSelector((state: RootState) => state.selectedUser?.current)
  const selectedCategory = useSelector((state: RootState) => state.selectedCategory?.current)
  const [selectedAsset, setSelectedAsset] = useState<any>(null)
  const [loadingAsset, setLoadingAsset] = useState(false)
  const [reload, setReload] = useState(Math.random() * 40)
  const history = useHistory()
  const location = useLocation()
  const isEditMode = location.pathname.includes('/assets/edit')
  const isNewMode = location.pathname.includes('/assets/new')
  const isDetailMode = location.pathname.includes('/assets/detail')
  const {data, loading: loadingAssets} = useAssetsByCategories(reload, selectedUser?.id)
  const {id: routeId} = useParams<RouteParamsModel>()
  const [filterData, setFilterData] = useState<any>([])
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

  useEffect(() => {
    if (data.length && selectedCategory?.id) {
      const filter = data.filter((x) => x.category == selectedCategory.name)
      setFilterData(filter)
    } else {
      setFilterData(data)
    }
  }, [data, selectedCategory])

  return (
    <div className='card mb-10'>
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
        ) : (
          /* ) */
          <>
            {/* <AssetTable assets={assets} onEdit={handleEdit} onDetail={handleDetail} loading={loading} /> */}
            <CategoryAssetsTable
              data={filterData}
              onEdit={handleEdit}
              onDetail={handleDetail}
              loading={loadingAssets}
              selectedUser={selectedUser}
            />
          </>
        )}
      </div>
    </div>
  )
}

export {AssetsPage}
