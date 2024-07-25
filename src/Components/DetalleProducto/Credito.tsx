import { Button } from 'antd'
import '/src/css/credito.css'
import { useContext } from 'react'
import { ProductContext } from '../../Contexts/ProductContext'
export const Credito = () => {
    const { precioSemanal } = useContext(ProductContext);
  return (
    <>
    <aside className='figures'>
    <div className="circle">
        <h2>HOY</h2>
    </div>
    <div className="trapezoid">
        <h1 className='price-week'>${precioSemanal}</h1>
        <h6 className='price-week2'>semanal</h6>
    </div>
    
    <aside className='data-credit'>
        <div className='item-data-credit'>
            <span className='id-item-credit'>1</span>
            <span>Aplica a tu crédito!</span>
        </div>
        <hr />
        <div className='item-data-credit'>
            <span className='id-item-credit'>2</span>
            <span>Verifica tu compra</span>
        </div>
        <hr />
        <div className='item-data-credit'>
            <span className='id-item-credit'>3</span>
            <span>Disfruta tu compra</span>
        </div>
    </aside>
    </aside>
    <div className="to-credit">
    <Button className='want-credit'>
            LO QUIERO A CRÉDITO 
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="currentColor" className="bi bi-arrow-right-circle-fill" viewBox="0 0 16 16">
  <path d="M8 0a8 8 0 1 1 0 16A8 8 0 0 1 8 0M4.5 7.5a.5.5 0 0 0 0 1h5.793l-2.147 2.146a.5.5 0 0 0 .708.708l3-3a.5.5 0 0 0 0-.708l-3-3a.5.5 0 1 0-.708.708L10.293 7.5z"/>
</svg>
          </Button>
          </div>
    </>
  )
}
