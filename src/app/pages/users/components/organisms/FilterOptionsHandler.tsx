import { KTSVG } from "../../../../../_metronic/helpers";
import FilterOptions from "../../../../components/molecules/FilterOptions";
import { FilterProp } from "../../../../components/molecules/models/FilterProp.Model";
import PopUpController from "../../../../modules/controllers/PopUpController";

type Props<T> = {
    filters: T,
    props: FilterProp[],
    setFilters: (filters: T) => void,
    onResetFilters: () => void
}

const FilterOptionsHandler = <T,>({ filters, setFilters, onResetFilters, props }: Props<T>) => {
    return (
        <PopUpController>
            <button data-popup-role='button' className="btn btn-sm btn-flex btn-light btn-active-dark fw-bolder">
                <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-5 svg-icon-gray-500 me-1'/>
                Filter
            </button>
            <div data-popup-role='drop'>
                <FilterOptions 
                    data-popup-action='close'
                    filters={filters}
                    setFilters={setFilters}
                    onReset={onResetFilters}
                    props={props}
                />
            </div>
        </PopUpController>
    )
}

export default FilterOptionsHandler;