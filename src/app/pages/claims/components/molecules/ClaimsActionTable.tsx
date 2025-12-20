import { TableColumn } from "react-data-table-component";
import DataTableComponent from "../../../../components/DataTableComponent";
import { ClaimsActionsModel } from "../../models/ClaimsActionsModel";
import { formatCurrency } from "../../../../helpers/FormatCurrency";
import ActionTable from "../../../../components/ActionTable";

type Props = {
    data: ClaimsActionsModel[];
    isLoading: boolean;
    canClaim: boolean;
    onDetails: (id: number) => void;
    onEdit: (id: number) => void;
    onDelete: (id: number) => void;
    onClaim: (id: number) => void
}

const ClaimsActionTable = ({ data, isLoading, canClaim, onDetails, onEdit, onClaim, onDelete }: Props) => {
    let columns: TableColumn<ClaimsActionsModel>[] = [
        {name: 'Ticker Symbol', selector: (row) => row.tyckerSymbol, sortable: true},
        {name: 'Company Name', selector: (row) => row.companyName, sortable: true},
        {name: 'Lawsuit Type', selector: (row) => row.lawsuitType, sortable: true},
        {name: 'Eligibility', selector: (row) => row.eligibility, sortable: true},
        {
            name: 'Total Settlement Fund',
            selector: (row) => row.totalSettlementFund,
            cell: (row) => row.totalSettlementFund ? formatCurrency(row.totalSettlementFund) : 'N/A',
            sortable: true,
        },
        {name: 'Claim Status', selector: (row) => row.claimStatus, sortable: true},
        {
            name: 'More Info',
            selector: (row) => row.officialClaimFilingLink || '',
            cell: (row) =>
                row.officialClaimFilingLink ? (
                <a
                    href={row.officialClaimFilingLink}
                    target='_blank'
                    rel='noopener noreferrer'
                    style={{color: '#009EF7', textDecoration: 'underline'}}
                >
                    View Link
                </a>
                ) : (
                <span className='badge badge-light-danger'>N/A</span>
                ),
            ignoreRowClick: true
        },
        {
            name: 'Actions',
            cell: (row) => <ActionTable props={[
                ...(row.claimed ? [{
                    label: 'Details',
                    cb: () => onDetails(row.id)
                }]: []),
                ...(row.claimed ? [] : [
                    ...(canClaim ? [{
                        label: 'Claim',
                        cb: () => onClaim(row.id)
                    }]: []),
                    {
                        label: 'Edit',
                        cb: () => onEdit(row.id),
                    },
                    {
                        label: 'Delete',
                        cb: () => onDelete(row.id),
                        className: 'btn-light-danger'
                    }
                ]),
                
            ]}/>
        }
    ]
    return (
        <DataTableComponent
          columns={columns}
          data={data}
          loading={isLoading}
          pagination
          paginationServer={false}
          totalRows={data.length}
          customTitle={null}
          highlightOnHover
        />
    )
}

export default ClaimsActionTable;