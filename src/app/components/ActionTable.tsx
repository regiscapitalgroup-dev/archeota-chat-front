import clsx from "clsx";
import PopUpController from "../modules/controllers/PopUpController";
import { ActionProp } from "./models/ActionProp.model";

type ActionTableProps = {
    props: ActionProp[];
};

const ActionTable = ({ props }: ActionTableProps) => {
  return (
    <PopUpController>
      <button data-popup-role='button' className="btn btn-light action-table-btn">...</button>
      <div data-popup-role='drop' tabIndex={0} className="card shadow-lg rounded-4 action-wrapper" style={{ minWidth: '100px' }}>
        <div className="card-body action-body">
          <ul>
            { props.map((p, i) => (
              <li key={i}>
                <button className={clsx("btn btn-light", p.className)} onClick={p.cb}>
                  { p.label }
                </button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </PopUpController>
  );
};

export default ActionTable;