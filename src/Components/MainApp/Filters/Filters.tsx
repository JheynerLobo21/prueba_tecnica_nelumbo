import { OptionsFilters } from './OptionsFilters'
import { SelectOrder } from './SelectOrder'

export const Filters = () => {
  return (
    <>
        <div className='orderFor'>
            <span className='txt-order'>Ordenar por</span>
            <SelectOrder/>
        </div>
        <OptionsFilters/>
    </>
  )
}