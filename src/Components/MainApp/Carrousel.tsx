import React from 'react';
import { Carousel } from 'antd';

const contentStyle: React.CSSProperties = {
  height: '300px',
  color: '#fff',
  textAlign: 'center',
  background: '#364d79',
  width:"100%",
  marginBottom:"20px",
  borderRadius:"5px"
};

export const Carrousel: React.FC = () => (
  <>
    <Carousel arrows infinite={true} >
      <div>
        <img style={contentStyle} src="https://www.cashfresh.es/wp-content/uploads/2023/03/bbll-de-los-superdescuentos-de-cash-fresh-bollullos-par-del-condado-2-845x321.jpg" alt="" />
      </div>
    
      <div>
        <img style={contentStyle} src="https://macropay.mx/wp-content/uploads/2024/07/Portada-blog-julio-macro-1024x356.png" alt="img-1" />
      </div>
      <div>
        <img style={contentStyle} src="https://apps-prestamos.mx/wp-content/uploads/2023/10/image2-1.png" alt="img-2" />
      </div>
      
    </Carousel>
  </>
);