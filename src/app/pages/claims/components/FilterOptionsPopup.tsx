import React, {useEffect, useRef} from 'react'

type Filters = {
  accountName: string
  tradeDate: string
}

type Props = {
  show: boolean
  anchorRef: React.RefObject<HTMLButtonElement>
  filters: Filters
  setFilters: (filters: Filters) => void
  onClose: () => void
  onReset: () => void
}

export const FilterOptionsPopup: React.FC<Props> = ({
  show,
  anchorRef,
  filters,
  setFilters,
  onClose,
  onReset,
}) => {
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
        <div className='mb-3'>
          <label className='form-label'>Account Name:</label>
          <input
            type='text'
            className='form-control'
            value={filters.accountName}
            onChange={(e) => setFilters({...filters, accountName: e.target.value})}
            placeholder='Filter by Account Name'
          />
        </div>
        <div className='mb-8'>
          <label className='form-label'>Trade Date:</label>
          <input
            type='date'
            className='form-control'
            value={filters.tradeDate}
            onChange={(e) => setFilters({...filters, tradeDate: e.target.value})}
          />
        </div>
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
