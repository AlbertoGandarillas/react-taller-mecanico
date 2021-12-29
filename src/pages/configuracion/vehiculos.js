import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    CarOutlined,
    HomeOutlined
  } from "@ant-design/icons";

  import {ListarVehiculos} from '../../modules/vehiculos';

export function Vehiculos() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <CarOutlined />
          <span>Vehiculos</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <ListarVehiculos/>
    </Fragment>
  );
}
