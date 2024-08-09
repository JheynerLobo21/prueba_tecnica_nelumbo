import "/src/css/footer.css";
import { Input } from "antd";
import {
  FacebookFilled,
  InstagramOutlined,
  LinkedinFilled,
  WhatsAppOutlined,
} from "@ant-design/icons";

export const Footer = () => {
  return (
    <div className="wave-container">
      <div className="wave"></div>
      <div className="content">
        <div className="content-1">
          <h3 style={{ color: "#0047BB", fontSize: "12px", marginTop: "15px" }}>
            OFERTAS Y PROMOCIONES
          </h3>
          <h2 style={{ color: "#082149" }}>No te pierdas</h2>
          <br />
          <h2 style={{ marginTop: "-40px", color: "#082149" }}>
            Nuestras ofertas!
          </h2>
          <Input
            placeholder="Tú dirección de correo electrónico"
            suffix={
              <img src="/public/paper-plane-solid.svg" alt="" width="24px"/>
            }
            className="input-email"
          />
          <div className="data-adicional">
            <img
              style={{ borderRadius: "5px", color: "black" }}
              src="/public/macropay_logo.png"
              alt=""
            />
            <div className="data-1">
              <span>Envíos y devoluciones</span>
              <br />
              <span>Preguntas Frecuentes</span>
            </div>
            <div className="data-2">
              <span>Aviso de publicidad</span>
              <br />
              <span>Términos y condiciones</span>
            </div>
          </div>
        </div>
        <div className="content-2">
          <img className="smile" src="/public/smile.png" alt="smile" />
        </div>
        <div className="content-3">
          <h2>Convercemos!</h2>
          <span>Lorem ipsum dolor sit amet</span>
          <div className="redes">
            <FacebookFilled />
            <InstagramOutlined />
            <LinkedinFilled />
            <WhatsAppOutlined />
          </div>
        </div>
      </div>
    </div>
  );
};
