import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    CarOutlined,
    HomeOutlined
  } from "@ant-design/icons";
import {ViewServicios} from '../../modules/servicios'
export function Servicios() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <CarOutlined />
          <span>Servicios</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      < ViewServicios/>
    </Fragment>
  );
}
