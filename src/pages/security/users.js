import React, { Fragment } from "react";
import { Breadcrumb } from "antd";
import {
    TeamOutlined,
    HomeOutlined
  } from "@ant-design/icons";
  import { ShowUsers } from "../../modules/security/users";
export function Usuarios() {
  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
        <TeamOutlined />
          <span>Usuarios</span>
        </Breadcrumb.Item>
      </Breadcrumb>
      <ShowUsers />
    </Fragment>
  );
}
