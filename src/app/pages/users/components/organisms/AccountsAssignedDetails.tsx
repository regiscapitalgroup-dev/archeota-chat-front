import { TableColumn } from "react-data-table-component";
import { ClassifierAtom } from "../../../../components/atoms/ClassifierAtom";
import { CountryInfoAtom } from "../../../../components/atoms/CountryInfoAtom";
import DataTableComponent from "../../../../components/DataTableComponent";
import { DependentUser } from "../../../../hooks/users/models/DependentUser";


const _columns: TableColumn<DependentUser>[] = [
    {
        name: 'First name',
        selector: (row) => row.firstName,
        sortable: true,
    },
    {
        name: 'Last name',
        selector: (row) => row.lastName,
        sortable: true,
    },
    {
        name: 'Country',
        cell: (row) => (
          <CountryInfoAtom country={row.country!} />  
        ),
        sortable: true,
    },
    {
        name: 'National ID',
        selector: (row) => row.nationalId,
        sortable: true,
    },
    {
        name: 'Classification',
        cell: (row) => (
            <ClassifierAtom 
                color={row.classificationColor ?? ''}
                name={row.classificationName ?? ''}
            />
        ),
        sortable: true,
    },
];

type Props = {
    data: DependentUser[]
}

export const AccountsAssignedDetails = ({ data }: Props) => {
    return (
        <div>
            <span className="fw-bolder text-dark">Accounts assigned</span>
            <div>
                <DataTableComponent
                    columns={_columns}
                    data={data}
                    pagination
                    paginationServer={false}
                    totalRows={data.length}
                    customTitle={null}
                    highlightOnHover
                />
            </div>
        </div>
    )
}