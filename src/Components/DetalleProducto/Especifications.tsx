import  { useContext } from 'react'
import { ProductContext } from '../../Contexts/ProductContext';
import '/src/css/description.css'

export const Especifications = () => {
    const { selectedProduct } = useContext(ProductContext);
  return (
    <div>
        <label className='item-especificacations'>Fabricante</label> 
        <label className='value-especificacations'>{selectedProduct?.fabricante}</label><br />
        <label className='item-especificacations'>Peso del Producto</label> 
        <label className='value-especificacations'>{selectedProduct?.peso}</label><br />
        <label className='item-especificacations'>Dimensiones</label> 
        <label className='value-especificacations'>{selectedProduct?.dimensiones}</label><br />
        <label className='item-especificacations'>País de origen</label> 
        <label className='value-especificacations'>{selectedProduct?.pais}</label><br />
        <label className='item-especificacations'>Número del modelo</label> 
        <label className='value-especificacations'>{selectedProduct?.numeroModelo}</label><br />
        <label className='item-especificacations'>Color</label> 
        <label className='value-especificacations'>{selectedProduct?.color}</label><br />
        <label className='item-especificacations'>Material</label> 
        <label className='value-especificacations'>{selectedProduct?.material}</label><br />
        <label className='item-especificacations'>Cantidad de piezas</label> 
        <label className='value-especificacations'>{selectedProduct?.piezas}</label><br />
        <label className='item-especificacations'>Características especiales</label> 
        <label className='value-especificacations'>{selectedProduct?.caracteristicasEspeciales}</label><br />
        <label className='item-especificacations'>Componentes incluidos</label> 
        <label className='value-especificacations'>{selectedProduct?.componentesIncluidos}</label><br />
    </div>
  )
}
