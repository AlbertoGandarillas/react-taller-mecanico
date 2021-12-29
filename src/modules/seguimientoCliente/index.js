import React, {Fragment} from "react";
import "antd/dist/antd.css";

import { Steps, Divider } from "antd";

import "./seguimiento.scss";

import { Input, Carousel } from "antd";
import {AudioOutlined } from "@ant-design/icons";
import img1 from '../../images/image1.jpg'
import img2 from '../../images/image2.jpg'
import img3 from '../../images/image3.jpg'

const { Search } = Input;

const suffix = (
  <AudioOutlined
    style={{
      fontSize: 16,
      color: "#1890ff",
    }}
  />
);

const { Step } = Steps;

export function MostrarSeguimiento() {
  const contentStyle = {
    height: "330px",
    width: "100%",
    color: "#000",
    lineHeight: "160px",
    textAlign: "center",
    background: "#364d79",
  };

  return (
    <Fragment>

      <div className="seguimiento">
        <div>
          <Steps direction="vertical" current={2}>
            <Step title="Recepción de vehículo" description="Finalizado" />
            <Step title="Cotización" description="Finalizado" />
            <Step title="Orden de Reparación" description="En progreso" />
            <Step title="Salida de vehículo" description="En espera" />
          </Steps>
        </div>
        <div>
        <h2>Trabajo Realizado</h2>
        <Carousel className="carousel">
            <div>
              <h3 style={contentStyle}><img className="img-carousel" src={img1} alt="Seguimiento 1" /></h3>
            </div>
            <div>
              <h3 style={contentStyle}><img className="img-carousel" src={img2} alt="Seguimiento 1" /></h3>
            </div>
            <div>
              <h3 style={contentStyle}><img className="img-carousel" src={img3} alt="Seguimiento 1" /></h3>
            </div>
          </Carousel>
        </div>
      </div>

    </Fragment>
  );
}
