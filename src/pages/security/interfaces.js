import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    ApiOutlined,
    HomeOutlined
  } from "@ant-design/icons";
export function Interfaces() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <ApiOutlined />
          <span>Interfaces</span>
        </Breadcrumb.Item>
      </Breadcrumb>
    </Fragment>
  );
}
