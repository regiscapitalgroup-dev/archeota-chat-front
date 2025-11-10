import { useRef, useState } from "react";
import { KTSVG } from "../../../../_metronic/helpers";
import { FilterOptionsPopup } from "../../../components/molecules/FilterOptionsPopup";
import { FilterProp } from "../../../components/molecules/models/FilterProp.Model";
import PopUpController from "../../../modules/controllers/PopUpController";
import ClassifiersTool from "./ClassifiersTool";
import { ClassifierModel } from "../models/ClassifierModel";

type Props<T> = {
    classifiers: ClassifierModel[];
    onChangeClassifier: (classifier: ClassifierModel) => void;
    filters: T,
    props: FilterProp[],
    setFilters: (filters: T) => void,
    onReset: () => void
};



const UsersToolbar = <T,>({ classifiers, onChangeClassifier, filters, props, setFilters, onReset }: Props<T>) => {
    const [showFilter, setShowFilter] = useState(false)
    const filterBtnRef = useRef<HTMLButtonElement>(null)

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
                <button ref={filterBtnRef} onClick={() => setShowFilter(prev => !prev)} className="btn btn-sm btn-flex btn-light btn-active-dark fw-bolder">
                    <KTSVG path='/media/icons/duotune/general/gen031.svg' className='svg-icon-5 svg-icon-gray-500 me-1'/>
                    Filter
                </button>
                <FilterOptionsPopup 
                    show={showFilter}
                    anchorRef={filterBtnRef}
                    filters={filters}
                    setFilters={setFilters}
                    onClose={() => setShowFilter(false)}
                    onReset={onReset}
                    props={props}
                />
            </div>
        </div>
    )
};

export default UsersToolbar;