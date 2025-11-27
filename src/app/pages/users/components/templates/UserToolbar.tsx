import { FilterProp } from "../../../../components/molecules/models/FilterProp.Model";
import FilterOptionsHandler from "../organisms/FilterOptionsHandler";

type Props<T> = {
    filters: T,
    props: FilterProp[],
    setFilters: (filters: T) => void,
    onResetFilters: () => void
};

const UserToolbar = <T,>({ filters, onResetFilters, props, setFilters }: Props<T>) => {
    return (
        <div className='d-flex align-items-center py-1 position-relative'>
            <div>
                <FilterOptionsHandler 
                    filters={filters}
                    onResetFilters={onResetFilters}
                    props={props}
                    setFilters={setFilters}
                />
            </div>
        </div>
    )
}

export default UserToolbar;