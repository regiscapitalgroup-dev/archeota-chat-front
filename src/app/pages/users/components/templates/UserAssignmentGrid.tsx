import ClientsAssigner from "../organisms/ClientsAssigner";
import ClientsUnassigner from "../organisms/ClientsUnassigner";

type Props = {
    managerName: string; 
    onAssign: (clients_id: number[]) => Promise<void>;
    onUnassign: (clients_id: number[]) => Promise<void>;
}

const UserAssignmentGrid = ({ 
    managerName,
    onAssign,
    onUnassign
} : Props) => {
    return (
        <>
            <div className="row w-100 gy-5">
                <ClientsAssigner onAssign={onAssign} />
                <ClientsUnassigner managerName={managerName} onUnassign={onUnassign}/>
            </div>
        </>
    )
}

export default UserAssignmentGrid;