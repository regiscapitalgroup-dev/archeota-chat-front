import React, {useEffect, useRef} from 'react'
import { FilterProp } from './models/FilterProp.Model'

type Props<T> = {
  show: boolean;
  anchorRef: React.RefObject<HTMLButtonElement>;
  filters: T;
  props: FilterProp[];
  setFilters: (filters: T) => void;
  onClose: () => void;
  onReset: () => void;
}

export const FilterOptionsPopup = <T,>({
  show,
  anchorRef,
  filters,
  props,
  setFilters,
  onClose,
  onReset,
}: Props<T>) => {
  const dropdownRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node) &&
        !anchorRef.current?.contains(event.target as Node)
      ) {
        onClose()
      }
    }
    if (show) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [show, onClose, anchorRef])

  if (!show) return null

  let style: React.CSSProperties = {minWidth: 320}
  if (anchorRef.current) {
    style = {
      ...style,
      position: 'absolute',
      top: anchorRef.current.offsetTop + anchorRef.current.offsetHeight + 8,
      right: 0,
      zIndex: 1202,
      minWidth: 340, 
      maxWidth: '96vw',
    }
  }

  return (
    <div ref={dropdownRef} className='card shadow-lg rounded-4' style={style}>
      <div className='card-body p-4'>
        <div className='fw-bold fs-5 mb-3'>Filter Options</div>
        {
          props.map((p, i) => {
            return (
              <div key={i} className="mb-3">
                <label className="form-label">{p.label}</label>
                {
                  p.type==="text" ? 
                    <input type="text" className="form-control" value={(filters as Record<string, string>)[p.key]} onChange={(e) => setFilters({...filters, [p.key]: e.target.value})}/> 
                  : p.type==="date" ? 
                    <input type="date" className="form-control" value={(filters as Record<string, string>)[p.key]} onChange={(e) => setFilters({...filters, [p.key]: e.target.value})}/>
                  :
                    (p.type.map(box => (
                      <div key={i+box} className="form-check form-check-custom form-check-solid mb-3">
                          <input className="form-check-input" 
                            type="checkbox" 
                            checked={(filters as Record<string, string[]>)[p.key]?.includes(box)} id={`${box}_cbox`}
                            onChange={() => 
                              setFilters({
                                ...filters, 
                                [p.key]: 
                                  ((filters as Record<string, string[]>)[p.key].includes(box) ? 
                                    (filters as Record<string, string[]>)[p.key].filter(v => v !== box)
                                    : [...((filters as Record<string, string[]>)[p.key] || []), box]
                                  )})}
                            />
                          <label className="form-check-label" htmlFor={`${box}_cbox`}>
                              {box}
                          </label>
                      </div>
                    )))   
                }
              </div>
            );
          })
        }
        <div className='d-flex justify-content-between'>
          <button className='btn btn-light' type='button' onClick={onReset}>
            Reset
          </button>
          <button className='btn btn-dark' type='button' onClick={onClose}>
            Apply
          </button>
        </div>
      </div>
    </div>
  )
}
