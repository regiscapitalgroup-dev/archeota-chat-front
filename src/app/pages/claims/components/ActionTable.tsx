import { useEffect, useRef, useState } from "react";
import { createPortal } from "react-dom";


type ActionTableProps = {
    onEdit: () => void;
    onDelete: () => void;
};

const ActionTable = ({ onEdit, onDelete }: ActionTableProps) => {
  let [show, setShow] = useState(false);
  const [position, setPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement>(null);
  const btn = useRef<HTMLButtonElement>(null);

  const updatePosition = () => {
    const _btn = btn.current;
    if(_btn) {
      const rect = btn.current.getBoundingClientRect();
      setPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if(!show)
      return;
    updatePosition();
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !btn.current?.contains(event.target as Node)
      ) {
        setShow(false);
      }
    }
    window.addEventListener('resize', () => setShow(false));
    window.addEventListener('scroll', () => setShow(false));
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      window.addEventListener('resize', () => setShow(false));
      window.addEventListener('scroll', () => setShow(false));
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [show, btn])

  let popUpStyle: React.CSSProperties = {
    zIndex: 25,
    maxWidth: '96vw',
    position: 'absolute',
    top: position.top,
    left: position.left
  }
  return (
    <>
      <button ref={btn} className="btn btn-light action-table-btn" onClick={() => setShow(prev => !prev)}>...</button>
      {
        show && createPortal(
          <div tabIndex={0} ref={dropdownRef} className='card shadow-lg rounded-4 action-wrapper' style={popUpStyle}>
              <div className="card-body action-body">
                  <ul>
                    <li> 
                      <button className="btn btn-light" onClick={() => {
                        setShow(false);
                        onEdit();
                      }}> 
                      Edit 
                      </button> 
                    </li>
                    <li> 
                      <button className="btn btn-light-danger" onClick={() => {
                        setShow(false);
                        onDelete();
                      }}> 
                        Delete 
                      </button> 
                    </li>
                  </ul>
              </div>
          </div>, document.body)
      }
    </>
  );
};

export default ActionTable;