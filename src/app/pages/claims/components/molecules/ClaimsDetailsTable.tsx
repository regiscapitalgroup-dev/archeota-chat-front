import { TableColumn } from "react-data-table-component";
import DataTableComponent from "../../../../components/DataTableComponent";
import { ClassFromClaim } from "../../../../hooks/claims/models/ClaimDetailsModel";
import CheckAtomComponent from "../../../../components/atoms/CheckAtomComponent";

type Props = {
    classes: ClassFromClaim[];
}




const ClaimsDetailsTable = ({ classes }: Props) => {
    const _columns: TableColumn<ClassFromClaim>[] = [
        {
            name: 'First name',
            selector: (row) => row.user.firstName,
            sortable: true,
        },
        {
            name: 'Last name',
            selector: (row) => row.user.lastName,
            sortable: true,
        },
        {
            name: 'Lot',
            selector: (row) => row.holding.lotNumber,
            sortable: true,
        },
        {
            name: 'Start date',
            selector: (row) => row.holding.startDate,
            sortable: true,
        },
        {
            name: 'End date',
            selector: (row) => row.holding.endDate,
            sortable: true,
        },
        {
            name: 'Quantity',
            selector: (row) => row.quantityStock,
            sortable: true,
        },
        {
            name: 'Benefit per stock',
            selector: (row) => row.holding.costPerStock,
            sortable: true,
        },
        {
            name: 'Amount',
            selector: (row) => row.holding.amount,
            sortable: true,
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
            name: 'Claim Amount',
            selector: (row) => row.amount,
            sortable: true,
        }
    ];
        
    return (
        <>
            <span className="fw-bolder text-dark ms-2">Valid actions for the claim</span>
            <DataTableComponent 
                data={classes}
                columns={_columns}
                pagination
                paginationServer={false}
                totalRows={classes.length}
                customTitle={null}
                highlightOnHover
            />
        </>
    )
}

export default ClaimsDetailsTable;