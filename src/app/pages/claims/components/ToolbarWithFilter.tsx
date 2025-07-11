import React, { useRef, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { FilterOptionsPopup } from './FilterOptionsPopup'

interface ToolbarWithFilterProps {
  filters: { accountName: string; tradeDate: string }
  setFilters: (filters: { accountName: string; tradeDate: string }) => void
  onReset: () => void
}

export const ToolbarWithFilter = ({
  filters,
  setFilters,
  onReset,
}: ToolbarWithFilterProps) => {
  const [showDropdown, setShowDropdown] = useState(false)
  const filterBtnRef = useRef<HTMLButtonElement>(null)

  return (
    <div className='d-flex align-items-center py-1 position-relative'>
      {/* begin::Wrapper */}
      <div className='me-4'>
        <button
          className='btn btn-sm btn-flex btn-light btn-active-dark fw-bolder'
          onClick={() => setShowDropdown(prev => !prev)}
          ref={filterBtnRef}
        >
          <KTSVG
            path='/media/icons/duotune/general/gen031.svg'
            className='svg-icon-5 svg-icon-gray-500 me-1'
          />
          Filter
        </button>
        <FilterOptionsPopup
          show={showDropdown}
          anchorRef={filterBtnRef}
          filters={filters}
          setFilters={setFilters}
          onClose={() => setShowDropdown(false)}
          onReset={onReset}
        />
      </div>
      {/* end::Wrapper */}
      
    </div>
  )
}
