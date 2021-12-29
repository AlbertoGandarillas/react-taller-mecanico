import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import { SettingOutlined, HomeOutlined } from "@ant-design/icons";
import { MostrarRepuestos } from "../../modules/configuracion";

export function Repuestos() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <SettingOutlined />
          <span>Repuestos</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MostrarRepuestos />
    </Fragment>
  );
}
