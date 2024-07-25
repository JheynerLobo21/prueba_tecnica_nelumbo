import {  Modal, Divider, Button } from 'antd'
import React, { useState } from 'react'
import { Product } from '../../../Constants/Constants';
import '/src/css/modal.css'

interface ModalProductProps {
  producto: Product;
  precioFinal: number;
  precioSemanal:number
  onClose: () => void;
}

export const ModalProduct:React.FC<ModalProductProps> = ({ producto, precioFinal, precioSemanal, onClose }) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
   
<Modal
        style={{ top: 20, padding:0}}
        open={modalOpen}
        closable={false}
        onOk={() => setModalOpen(false)}
        onCancel={() => onClose() }
      >
       <img src="/public/banner-modal.png" alt="banner" className='img-banner'/>
       <div className='basic-data'>
        <img src="/public/redmiNote11-2.png" alt={producto.nombre} className='img-product-modal' />
        <aside className='description-product'>
        <span style={{position:"absolute", right:"18px", color:"#0047BB", fontWeight:"bold"}}>{`$${precioFinal} x 1`}</span>
        <span style={{fontWeight:"bold", width:"60%", lineHeight:"1", marginTop:"17px"}}>{producto.nombre}</span>
        <div style={{display:"flex"}}>
        <label>Color seleccionado: </label>
        <label style={{textTransform:"capitalize", marginLeft:"3px"}}>{ producto.color}</label>
        </div>
        </aside>
       </div>
       <Divider style={{marginBottom:"10px"}}/>
        <span style={{marginLeft:"20px"}}>1 ítem en tu carrito</span>
        <label style={{position:"absolute", right:"85px"}}>Subtotal</label>
        <label style={{position:"absolute", right:"18px", color:"#0047BB", fontWeight:"bold" }}>{`${precioFinal} x 1`}</label>
       <Divider style={{marginTop:"10px"}}/>
       <div className='tipe-buy'>
       <img src="/public/check.png" alt="icono check" className='img-check'/>
       <span>Te vas a llevar este {producto.tipo} por solo</span>
       
       <span style={{marginBottom:"10px"}}>{`$ ${precioSemanal} p/semana!`}</span>
       <Button className='credit-buy'>COMPRAR A CRÉDITO </Button>
       </div>
       <Divider plain> O puedes</Divider>
       <span className='contado'>Comprar a contado</span>
      </Modal>
    </>
  )
}