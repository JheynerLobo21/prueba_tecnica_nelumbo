import { Carousel } from "antd";
import '/src/css/main-page.css';

const contentStyle: React.CSSProperties = {
  height: "400px",
  color: "#fff",
  textAlign: "center",
  background: "#364d79",
  width: "100%",
  marginBottom: "20px",
  borderRadius: "8px",
  margin:"auto"
};
export const Offerts = () => {
  return (
    <div className="carrousel">
      <h3 style={{ textAlign: "center", margin:"40px 0 30px 0" }}>Ofertas y Promociones</h3>
      <div className="carrusel">
      <Carousel arrows infinite={true} dots={true} autoplay={true}>
        <div>
          <img
            style={contentStyle}
            src="https://www.cashfresh.es/wp-content/uploads/2023/03/bbll-de-los-superdescuentos-de-cash-fresh-bollullos-par-del-condado-2-845x321.jpg"
            alt="img-0"
          />
        </div>

        <div>
          <img
            style={contentStyle}
            src="https://macropay.mx/wp-content/uploads/2024/07/Portada-blog-julio-macro-1024x356.png"
            alt="img-1"
          />
        </div>
        <div>
          <img
            style={contentStyle}
            src="https://apps-prestamos.mx/wp-content/uploads/2023/10/image2-1.png"
            alt="img-2"
          />
        </div>
      </Carousel>
      </div>
    </div>
  );
};
