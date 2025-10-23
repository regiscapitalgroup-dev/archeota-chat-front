import { useHistory, useLocation, useParams } from "react-router-dom";
import AssetsForm from "../../components/AssetsForm";
import { useEffect, useState } from "react";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { getAssetById } from "../../../../services/assetsService";

const AssetsForms = () => {
    const history = useHistory()
    const location = useLocation()
    const isEditMode = location.pathname.includes('/assets/edit')
    const [loadingAsset, setLoadingAsset] = useState(false)
    const [selectedAsset, setSelectedAsset] = useState<any>(null)
    const {id: routeId} = useParams<RouteParamsModel>()
    useEffect(() => {
        const fetchAsset = async () => {
        if (routeId && isEditMode) {
            setLoadingAsset(true)
            const asset = await getAssetById(Number(routeId))
            setSelectedAsset(asset)
            setLoadingAsset(false)
        } else {
            setSelectedAsset(null)
        }
        }

        fetchAsset()
    }, [isEditMode, routeId])

    const handleSuccess = () => {
        history.push('/assets')
    }

    return (
        <div className='card mb-10'>
            <div className='card-body'>
                <AssetsForm
                    isEdit={isEditMode}
                    initialData={selectedAsset}
                    onSuccess={handleSuccess}
                    loadingInfo={loadingAsset}
                />
            </div>
        </div>
    )
};

export default AssetsForms;