import { FilterProp } from "../../../../components/molecules/models/FilterProp.Model";
import { CompaniesCtxProvider } from "../../context/companiesContext";
import ClassifierToolHandler from "../organisms/ClassifierToolHandler";
import CompanyToolHandler from "../organisms/CompanyToolHandler";
import FilterOptionsHandler from "../organisms/FilterOptionsHandler";

type Props<T> = {
    filters: T;
    props: FilterProp[];
    setFilters: (filters: T) => void;
    onResetFilters: () => void;
    reloadUserList: () => void;
};


const UserToolbarSuperAdmin = <T,>({ filters, onResetFilters, setFilters, props, reloadUserList }: Props<T>) => {
    return (
        <CompaniesCtxProvider>
            <div className='d-flex align-items-center py-1 position-relative'>
                <div className="me-2">
                    <CompanyToolHandler reloadUserList={reloadUserList} />
                </div>
                <div className="me-2">
                    <ClassifierToolHandler />
                </div>
                <div>
                    <FilterOptionsHandler 
                        filters={filters}
                        onResetFilters={onResetFilters}
                        props={props}
                        setFilters={setFilters}
                    />
                </div>
            </div>
        </CompaniesCtxProvider>
    )
}

export default UserToolbarSuperAdmin;