import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    ReconciliationOutlined,
    HomeOutlined
  } from "@ant-design/icons";

import {MostrarRecepcion} from '../modules/recepcion';

export function Recepcion() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <ReconciliationOutlined />
          <span>Recepcion de Vehiculos</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MostrarRecepcion/>
    </Fragment>
  );
}
