import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    SolutionOutlined,
    HomeOutlined
  } from "@ant-design/icons";
import {MostrarCitas} from '../modules';
export function Citas() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <SolutionOutlined />
          <span>Citas</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <MostrarCitas/>
    </Fragment>
  );
}
