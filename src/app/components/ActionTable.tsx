import PopUpController from "../modules/controllers/PopUpController";

type ActionTableProps = {
    onEdit?: () => void;
    onDelete?: () => void;
    onDetails?: () => void;
};

const ActionTable = ({ onEdit, onDelete, onDetails }: ActionTableProps) => {
  return (
    <PopUpController>
      <button data-popup-role='button' className="btn btn-light action-table-btn">...</button>
      <div data-popup-role='drop' tabIndex={0} className="card shadow-lg w-100px rounded-4 action-wrapper">
        <div className="card-body action-body">
          <ul>
            { !!onDetails && (
              <li>
                <button className="btn btn-light" onClick={onDetails}>
                  Details
                </button>
              </li>
            )}
            { !!onEdit && (
              <li> 
                <button className="btn btn-light" onClick={onEdit}> 
                  Edit 
                </button> 
              </li>
            )}
            { !!onDelete && (
              <li> 
                <button className="btn btn-light-danger" onClick={onDelete}> 
                  Delete 
                </button> 
              </li>
            )}
          </ul>
        </div>
      </div>
    </PopUpController>
  );
};

export default ActionTable;