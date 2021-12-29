import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    ToolOutlined,
    HomeOutlined
  } from "@ant-design/icons";
export function OrdenReparacion() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <ToolOutlined />
          <span>Orden de Reparación</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Fragment>
  );
}
