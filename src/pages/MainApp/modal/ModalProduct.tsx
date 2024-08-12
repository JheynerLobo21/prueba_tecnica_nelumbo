import { Modal, Divider, Button } from "antd";
import React, { useState } from "react";
import { AdaptedProduct } from "../../../types/InterfacesProducts";
import "/src/css/modal.css";

interface ModalProductProps {
  producto: AdaptedProduct;
  precioOriginal: number;
  precioSemanal: number;
  onClose: () => void;
}

export const ModalProduct: React.FC<ModalProductProps> = ({
  producto,
  precioOriginal,
  precioSemanal,
  onClose,
}) => {
  const [modalOpen, setModalOpen] = useState(true);
  return (
    <>
      <Modal
        style={{ top: 20, padding: 0 }}
        open={modalOpen}
        closable={false}
        onOk={() => setModalOpen(false)}
        onCancel={() => onClose()}
      >
        <img
          src="/public/banner-modal.png"
          alt="banner"
          className="img-banner"
        />
        <div className="basic-data">
          <img
            src={producto.images[0]}
            alt={producto.title}
            className="img-product-modal"
            onError={(e) => {
              (e.target as HTMLImageElement).onerror = null;
              (e.target as HTMLImageElement).src =
                "https://media.istockphoto.com/id/1128826884/es/vector/ning%C3%BAn-s%C3%ADmbolo-de-vector-de-imagen-falta-icono-disponible-no-hay-galer%C3%ADa-para-este-momento.jpg?s=612x612&w=0&k=20&c=9vnjI4XI3XQC0VHfuDePO7vNJE7WDM8uzQmZJ1SnQgk=";
            }}
          />
          <aside className="description-prod">
            <span
              style={{
                position: "absolute",
                right: "18px",
                color: "#0047BB",
                fontWeight: "bold",
              }}
            >{`$${precioOriginal} x 1`}</span>
            <span
              style={{
                fontWeight: "bold",
                width: "60%",
                lineHeight: "1",
                marginTop: "17px",
              }}
            >
              {producto.title}
            </span>
            <div style={{ display: "flex" }}>
              <label>Color seleccionado: </label>
              <label style={{ textTransform: "capitalize", marginLeft: "3px" }}>
                {producto.color}
              </label>
            </div>
          </aside>
        </div>
        <Divider style={{ marginBottom: "10px" }} />
        <span style={{ marginLeft: "20px" }}>1 ítem en tu carrito</span>
        <label style={{ position: "absolute", right: "85px" }}>Subtotal</label>
        <label
          style={{
            position: "absolute",
            right: "18px",
            color: "#0047BB",
            fontWeight: "bold",
          }}
        >{`${precioOriginal} x 1`}</label>
        <Divider style={{ marginTop: "10px" }} />
        <div className="tipe-buy">
          <img
            src="/public/check.png"
            alt="icono check"
            className="img-check"
          />
          <span>Te vas a llevar este {producto.tipo} por solo</span>

          <span
            style={{ marginBottom: "10px" }}
          >{`$ ${precioSemanal} p/semana!`}</span>
          <Button className="credit-buy">COMPRAR A CRÉDITO </Button>
        </div>
        <Divider plain> O puedes</Divider>
        <span className="contado">Comprar a contado</span>
      </Modal>
    </>
  );
};
