import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    DollarCircleOutlined,
    HomeOutlined
  } from "@ant-design/icons";
export function Facturacion() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <DollarCircleOutlined />
          <span>Facturacion</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Fragment>
  );
}
