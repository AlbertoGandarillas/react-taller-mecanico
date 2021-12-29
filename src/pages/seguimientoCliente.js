import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import { MostrarSeguimiento } from "../modules/seguimientoCliente";
import {
    ToolOutlined,
    HomeOutlined
  } from "@ant-design/icons";
export function SeguimientoCliente() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <ToolOutlined />
          <span>Seguimiento de Cliente</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MostrarSeguimiento/>
    </Fragment>
  );
}
