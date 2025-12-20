import Select from "react-select";
import { CompanyModel } from "../../../users/models/CompanyModel";
import { CompanyOptions } from "./models/CompanyOptions";
import clsx from "clsx";

type Props = {
    isLoading: boolean;
    companies: CompanyModel[];
    companySelected: CompanyModel | null;
    onChange: (value: CompanyOptions | null) => void;
    className?: string;
    classLabel?: string;
    disabled?: boolean;
    isClearable?: boolean;
}


const CompanyField = ({ isLoading, companies, companySelected, onChange, className, classLabel, disabled, isClearable }: Props) => {
    return (
        <div className={className}>
            <label className={!!classLabel ? clsx(classLabel) : 'mb-2'}>Company</label>
            <Select
                isDisabled={disabled ?? false}
                placeholder='Select or search company'
                classNamePrefix='react-select'
                isClearable={ isClearable ?? true}
                isLoading={isLoading}
                options={companies.map(c => ({ value: c, label: c.name }))}
                onChange={onChange}
                value={companySelected ? { value: companySelected, label: companySelected.name } : null}
            />
        </div>
    )
}

export default CompanyField;