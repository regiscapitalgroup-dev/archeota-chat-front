import { KTSVG } from "../../../../_metronic/helpers";
import FilterOptions from "../../../components/molecules/FilterOptions";
import { FilterProp } from "../../../components/molecules/models/FilterProp.Model";
import PopUpController from "../../../modules/controllers/PopUpController";
import { ClassifierModel } from "../models/ClassifierModel";
import ClassifiersTool from "./ClassifiersTool";

type Props<T> = {
    classifiers: ClassifierModel[];
    onChangeClassifier: (classifier: ClassifierModel) => void;
    filters: T,
    props: FilterProp[],
    setFilters: (filters: T) => void,
    onResetFilters: () => void
};



const UsersToolbar = <T,>({ classifiers, onChangeClassifier, filters, props, setFilters, onResetFilters }: Props<T>) => {
    return (
        <div className='d-flex align-items-center py-1 position-relative'>
            <div className="me-2">
                <PopUpController>
                    <button data-popup-role='button' className="btn btn-sm btn-flex btn-light btn-active-dark fw-bolder">
                        <KTSVG path='/media/icons/duotune/communication/com005.svg' className='svg-icon-5 svg-icon-gray-500 me-1'/>
                        Classifiers
                    </button>
                    <div data-popup-role='drop'>
                        <ClassifiersTool onChangeClassifier={onChangeClassifier} classifiers={classifiers}/>
                    </div>
                </PopUpController>
            </div>
            <div>
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
            </div>
        </div>
    )
};

export default UsersToolbar;