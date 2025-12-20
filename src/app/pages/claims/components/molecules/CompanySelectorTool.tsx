import { KTSVG } from "../../../../../_metronic/helpers";
import PopUpController from "../../../../modules/controllers/PopUpController";
import { CompanyModel } from "../../../users/models/CompanyModel";
import CompanyField from "../atoms/CompanyField";
import { CompanyOptions } from "../atoms/models/CompanyOptions";

type Props = {
    isLoading: boolean;
    companies: CompanyModel[];
    companySelected: CompanyModel | null;
    onSelect: (company: CompanyOptions | null) => void;
}

const UserSelectorTool = ({ companies, isLoading, companySelected, onSelect }: Props) => {
    return (
        <PopUpController>
            <button data-popup-role='button' className='btn btn-sm btn-flex btn-light btn-active-dark fw-bolder'>
                <KTSVG
                    path='/media/icons/duotune/communication/com005.svg'
                    className='svg-icon-5 svg-icon-gray-500 me-1'
                />
                Companies
            </button>
            <div className="col" data-popup-role='drop' >
                <div className="card shadow-md p-5 w-300px" onMouseDown={e => e.stopPropagation()} onClick={e => e.stopPropagation()}>
                    <CompanyField
                        disabled={companies.length<=1}
                        isLoading={isLoading}
                        companies={companies}
                        companySelected={companySelected}
                        isClearable={false}
                        onChange={onSelect}
                        className="mb-5"
                    />
                </div>
            </div>
        </PopUpController>
    )
}

export default UserSelectorTool;