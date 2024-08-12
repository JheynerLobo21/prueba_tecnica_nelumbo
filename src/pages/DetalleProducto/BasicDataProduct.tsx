import { useContext } from "react";
import { ProductContext } from "../../Contexts/ProductContext";
import { useFavorites } from "../../Contexts/FavoriteContext";
import "/src/css/description.css";
import { Button, FloatButton, Rate, Slider, Tabs, TabsProps } from "antd";
import { CheckOutlined, HeartOutlined, HeartFilled } from "@ant-design/icons";
import { Credito } from "./Credito";
import { InformationProduct } from "./InformationProduct";
import { Especifications } from "./Especifications";
import { Products } from "../MainApp/Products/Products";

export const BasicDataProduct = () => {
  const { selectedProduct, precioFinal, precioMensual, precioSemanal } = useContext(ProductContext);
  const { favoriteProducts, toggleFavorite } = useFavorites();
  
  if (!selectedProduct) {
    return <div>No product selected</div>;
  }

  const onChange = (key: string) => {
    console.log(key);
  };

  const items: TabsProps["items"] = [
    {
      key: "1",
      label: "Otras especificaciones",
      children: <Especifications />,
    },
    {
      key: "2",
      label: "Reviews",
      children: "Datos de los reviews",
    },
  ];

  const isFavorite = favoriteProducts.has(selectedProduct.id);

  return (
    <div>
      <div className="basic-data">
        <div className="imgs-test">
          {selectedProduct.images.map((image, index) => (
            <div className="catalog-img" key={index}>
              <img className="imgs-products" src={image} alt="image product"
              onError={(e) => {
                (e.target as HTMLImageElement).onerror = null;
                (e.target as HTMLImageElement).src =
                  "https://media.istockphoto.com/id/1128826884/es/vector/ning%C3%BAn-s%C3%ADmbolo-de-vector-de-imagen-falta-icono-disponible-no-hay-galer%C3%ADa-para-este-momento.jpg?s=612x612&w=0&k=20&c=9vnjI4XI3XQC0VHfuDePO7vNJE7WDM8uzQmZJ1SnQgk=";
              }} />
            </div>
          ))}
        </div>
        <div className="img-principal">
            {isFavorite ? (
              <HeartFilled
                className="favorite"
                onClick={() => toggleFavorite(selectedProduct.id)}
                style={{ fontSize: "28px", color: "skyblue" }}
              />
            ) : (
              <HeartOutlined
                className="favorite"
                onClick={() => toggleFavorite(selectedProduct.id)}
                style={{ fontSize: "28px" }}
              />
            )}
          <img
            className="main-img"
            alt="example"
            src={selectedProduct.images[0]}
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                "https://media.istockphoto.com/id/1128826884/es/vector/ning%C3%BAn-s%C3%ADmbolo-de-vector-de-imagen-falta-icono-disponible-no-hay-galer%C3%ADa-para-este-momento.jpg?s=612x612&w=0&k=20&c=9vnjI4XI3XQC0VHfuDePO7vNJE7WDM8uzQmZJ1SnQgk=";
            }}
          />
          {selectedProduct.promocion !== 0 && (
            <FloatButton
              className="floating-button-description"
              icon={`${selectedProduct.promocion}%`}
            />
          )}
        </div>
        <aside className="aside-data">
          <div className="data-price">
            <div className="first-data">
              <h2>{selectedProduct.title}</h2>
              <Rate
                allowHalf
                defaultValue={selectedProduct.reviews}
                disabled
                style={{ marginTop: "-10px", fontSize: "22px" }}
              />
            </div>
            <div className="second-data">
              <h2 style={{ marginBottom: "0px" }}>{`$${precioFinal}`}</h2>
              <span style={{ textDecoration: "line-through" }}>
                {selectedProduct.promocion !== 0 && selectedProduct.price}
              </span>
              <br />
              <div className="payment-images">
                <img src="/public/mastercard.png" alt="mastercard" />
                <img src="/public/visa.png" alt="visa" />
                <img src="/public/mastercard.png" alt="mastercard" />
                <img src="/public/visa.png" alt="visa" />
              </div>
            </div>
          </div>
          <p className="description-product" style={{fontSize:"12px", fontFamily:"sans-serif"}}>{selectedProduct.description}</p>
          <label className="see-more">- ver más -</label>
          <div className="buy-security">
            <img
              src="/public/shield.png"
              alt="icon-escudo"
              className="shield"
            />
            <div>
              <span>Compra segura con Macropay Protect</span>
              <br />
              <span style={{ fontSize: "10px" }}>
                Devolución gratis (30 días) / 12 meses de garantía de fábrica
              </span>
            </div>
          </div>
          <span className="end-promo">La promoción vence en 24d 12h:43m</span>
          <Credito />
        </aside>
      </div>
      <br />
      <h5 style={{ marginLeft: "60px" }}>Información Detallada del Producto</h5>
      <br />
      <div style={{ display: "flex", marginTop: "-30px", marginLeft: "-10px" }}>
        <InformationProduct selectedProduct={selectedProduct} />
        <section className="credit" style={{ marginLeft: "30px" }}>
          <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
          <section className="card-credit">
            <img
              src="/public/icono-credito.png"
              alt="background"
              className="background-image"
            />
            <div className="content">
              <div style={{ width:"400px" }}>
                <h3 style={{ fontStyle: "italic" }}>
                  Lleva este {selectedProduct.tipo}
                </h3>
                <h3 style={{ marginTop: "-20px", fontStyle: "italic" }}>
                  a Crédito!
                </h3>
                <p style={{ color: "gold" }}>¿Qué necesitas?</p>
                <CheckOutlined style={{ color: "limegreen" }} />
                <label>Tu cuenta de facebook</label>
                <br />
                <CheckOutlined style={{ color: "limegreen" }} />
                <label>Tu INE vigente</label>
                <br />
                <CheckOutlined style={{ color: "limegreen" }} />
                <label>Correo electrónico</label>
                <br />
              </div>
              <div className="card-info-credit">
                <img src="/public/smile2.png" alt="" />
                <h3 style={{ fontSize: "12px" }}>¿Te falta una lanita?</h3>
                <label style={{ fontSize: "10px" }}>
                  ENGANCHE ${precioMensual}
                </label>
                <br />
                <label style={{ fontSize: "10px", marginTop: "-20px" }}>
                  PAGO SEMANAL ${precioSemanal}
                </label>
                <Slider
                  className="slider"
                  defaultValue={15}
                  tooltip={{ open: true, formatter: (value) => `${value}%` }}
                  disabled
                />
                <p style={{ fontSize: "10px", marginRight: "90px" }}>
                  Enganche
                </p>
                <Button className="btn-credit">Aplica Ahora</Button>
              </div>
            </div>
          </section>
        </section>
      </div>
      <h5 className="title-related">Productos relacionados</h5>
      <div className="related-products" style={{marginLeft:"20px", marginRight:"60px"}}>
        <Products cantidad={null}/>
      </div>
    </div>
  );
};
