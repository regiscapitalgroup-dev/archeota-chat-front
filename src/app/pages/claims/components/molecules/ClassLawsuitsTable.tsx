import { TableColumn } from "react-data-table-component";
import DataTableComponent from "../../../../components/DataTableComponent";
import { ClassLawsuitModel } from "../../../../hooks/claims/models/ClassLawsuitModel";
import CheckAtomComponent from "../../../../components/atoms/CheckAtomComponent";
import ActionTable from "../../../../components/ActionTable";

type Props = {
    data: ClassLawsuitModel[];
    loading: boolean;
    onEdit: (id: number) => void;
    onDelete: (item: ClassLawsuitModel) => void;
};

const ClassLawsuitsTable = ({ data, loading, onEdit, onDelete }: Props) => {
    const _columns: TableColumn<ClassLawsuitModel>[] = [
        {
            name: 'Ticker Symbol',
            selector: (row) => row.tyckerSymbol,
            sortable: true
        },
        {
            name: 'Company Name',
            selector: (row) => row.companyName,
            sortable: true
        },
        {
            name: 'Quantity Stock',
            selector: (row) => row.quantityStock,
            sortable: true
        },
        {
            name: 'Value per Stock',
            selector: (row) => row.valuePerStock,
            sortable: true
        },
        {
            name: 'Amount',
            selector: (row) => row.amount,
            sortable: true
        },
        {
            name: 'Claim Date',
            selector: (row) => row.claimDate,
            sortable: true
        },
        {
            name: 'Status',
            selector: (row) => row.status
        },
        {
            name: 'Send Format',
            cell: (row) =>  <CheckAtomComponent value={row.sendFormat} /> 
        },
        {
            name: 'Accept Claim',
            cell: (row) => <CheckAtomComponent value={row.acceptClaim} />
        },
        {
            name: 'Register payment',
            cell: (row) => <CheckAtomComponent value={row.registerPayment} />
        },
        {
            name: 'Actions',
            cell: (row) => <ActionTable props={[
                {
                    label: 'Claim accepted',
                    cb: () => {}
                },
                {
                    label: 'Payment registered',
                    cb: () => {},
                    className: 'btn-light-success'
                }
            ]}/>
        }
    ];

    return (
        <DataTableComponent
            columns={_columns}
            data={data}
            loading={loading}
            pagination
            paginationServer={false}
            totalRows={data.length}
        />
    )
}

export default ClassLawsuitsTable;