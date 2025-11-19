import { useRef, useState } from 'react'
import { KTSVG } from '../../../../_metronic/helpers'
import { FilterProp } from '../../../components/molecules/models/FilterProp.Model'
import FilterOptions from '../../../components/molecules/FilterOptions'
import PopUpController from '../../../modules/controllers/PopUpController'

interface ToolbarWithFilterProps<T> {
  filters: T,
  props: FilterProp[],
  setFilters: (filters: T) => void
  onReset: () => void
}

export const ToolbarWithFilter = <T, >({
  filters,
  props,
  setFilters,
  onReset,
}: ToolbarWithFilterProps<T>) => {

  return (
    <div className='d-flex align-items-center py-1 position-relative'>
      <div>
        <PopUpController>
          <button data-popup-role='button' className='btn btn-sm btn-flex btn-light btn-active-dark fw-bolder'>
            <KTSVG
              path='/media/icons/duotune/general/gen031.svg'
              className='svg-icon-5 svg-icon-gray-500 me-1'
            />
            Filter
          </button>
          <div data-popup-role='drop'>
            <FilterOptions
              data-popup-action='close'
              filters={filters}
              setFilters={setFilters}
              onReset={onReset}
              props={props}
            />
          </div>
        </PopUpController>
      </div>
    </div>
  )
}
