import { Button } from 'antd';
import '/src/App.css'
export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src="/public/macropay_logo.png" alt="logo_macropay" className='logo' />
        <div className='group-btn-access'>
            <Button className='btn-create-account'>Crea Tu Cuenta</Button>
            <Button className='btn-login'>Iniciar Sesión</Button>
           <div className='icon-cart'>
            <img src="/public/shopping_cart.png" alt="" width="24px" height="24px"/>
           </div>
        </div>
        <div className='circle-buy'>
          <p className='buy-credit'>COMPRAR A</p>
          <p className='buy-credit2'>CRÉDITO</p>
        </div>
    </div>
  )
}
