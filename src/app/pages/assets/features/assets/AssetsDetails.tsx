import { useEffect, useState } from "react";
import AssetsDetail from "../../components/AssetsDetail";
import { useParams } from "react-router-dom";
import { RouteParamsModel } from "../../../shared/models/RouteParamsModel";
import { getAssetById } from "../../../../services/assetsService";

const AssetsDetails = () => {
    const [selectedAsset, setSelectedAsset] = useState<any>(null)
    const {id: routeId} = useParams<RouteParamsModel>()
    useEffect(() => {
        const fetchAsset = async () => {
            if (routeId) {
                const asset = await getAssetById(Number(routeId))
                setSelectedAsset(asset)
            } else {
                setSelectedAsset(null)
            }
        }
        fetchAsset()
    }, [routeId])

    return (
        <div className='card mb-10'>
            <div className='card-body'>
                 <AssetsDetail data={selectedAsset} />
            </div>
        </div>
    )
};

export default AssetsDetails;