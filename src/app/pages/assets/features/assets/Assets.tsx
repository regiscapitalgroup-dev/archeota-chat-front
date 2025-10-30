import { useEffect, useState } from "react";
import CategoryAssetsTable from "../../components/CategoryAssetsTable";
import { useHistory } from "react-router-dom";
import { useAssetsByCategories } from "../../../../hooks/assets/useAssetsByCategories";
import { useSelector } from "react-redux";
import { RootState } from "../../../../../setup";

const Assets = () => {
    const selectedUser = useSelector((state: RootState) => state.selectedUser?.current)
    const selectedCategory = useSelector((state: RootState) => state.selectedCategory?.current)
    const history = useHistory();
    const {data, loading: loadingAssets} = useAssetsByCategories(0, selectedUser?.id)
    const [filterData, setFilterData] = useState<any>([])

    const handleEdit = (assetId: number) => {
        history.push(`/assets/edit/${assetId}`)
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
                <CategoryAssetsTable
                    data={filterData}
                    onEdit={handleEdit}
                    onDetail={handleDetail}
                    loading={loadingAssets}
                    selectedUser={selectedUser}
                />
            </div>
        </div>
    )
};

export default Assets;