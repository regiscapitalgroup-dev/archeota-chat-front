import { TableColumn } from "react-data-table-component";
import ActionTable from "../../../../components/ActionTable";
import CheckAtomComponent from "../../../../components/atoms/CheckAtomComponent";
import { ClassifierAtom } from "../../../../components/atoms/ClassifierAtom";
import DataTableComponent from "../../../../components/DataTableComponent";
import { UserListModel } from "../../models/UserListModel";

type Props = {
    data: UserListModel[];
    loading: boolean;
    showCompany: boolean;
    onEdit: (id: number) => void;
    onDetail: (id: number) => void;
    onDelete: (id: number) => void;
};

const UserList = ({ data, loading, showCompany, onEdit, onDetail, onDelete }: Props) => {
    const _columns: TableColumn<UserListModel>[] = [
        {
            name: 'First name',
            selector: (row) => row.firstName,
            sortable: true
        },
        {
            name: 'Last name',
            selector: (row) => row.lastName,
            sortable: true
        },
        ...(showCompany ? [
            {
                name: 'Company',
                selector: (row) => row.company,
                sortable: true
            } as TableColumn<UserListModel>
        ]: []),
        {
            name: 'Email',
            selector: (row) => row.email,
            sortable: true
        },
        {
            name: 'Role',
            selector: (row) => row.role,
            sortable: true
        },
        {
            name: 'Assigned users',
            selector: (row) => row.dependentsCount,
            sortable: true
        },
        {
            name: 'Active',
            cell: (row) => (
                <CheckAtomComponent value={row.isActive}/>
            ),
            sortable: true
        },
        {
            name: 'Classification',
            cell: (row) => {
                if(!row.classification || !row.color)
                  return (<></>);
                return ( 
                    <ClassifierAtom
                        className="fs-9 px-2 py-1"
                        name={row.classification}
                        color={row.color}
                    />
            )},
            sortable: true
        },
        {
            name: 'Actions',
            cell: (row) => (
                <ActionTable props={[
                    {
                        label: 'Edit',
                        cb: () => onEdit(row.id)                        
                    },
                    {
                        label: 'Details',
                        cb: () => onDetail(row.id)
                    },
                    {
                        label: 'Delete',
                        cb: () => onDelete(row.id),
                        className: 'btn-light-danger'
                    }
                ]}/> 
            ),
            sortable: true
        },
    ];
    
    return (
        <DataTableComponent<UserListModel>
          columns={_columns}
          data={data}
          loading={loading}
          pagination
          paginationServer={false}
          totalRows={data.length}
          customTitle={null}
          highlightOnHover
        />
    )
}

export default UserList;