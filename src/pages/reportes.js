import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    FilePdfOutlined,
    HomeOutlined
  } from "@ant-design/icons";
export function Reportes() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <FilePdfOutlined />
          <span>Reportes</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Fragment>
  );
}
