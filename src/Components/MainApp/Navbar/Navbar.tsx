import { Button } from 'antd';
import '/src/App.css'
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
export const Navbar = () => {
  return (
    <div className='navbar'>
        <img src="/public/macropay_logo.png" alt="logo_macropay" className='logo' />
        <div className='group-btn-access'>
            <Button className='btn-create-account'>Crea Tu Cuenta</Button>
            <Button className='btn-login'>Iniciar Sesión</Button>
            <ShoppingCartIcon className='icon-cart'/>
        </div>
    </div>
  )
}
