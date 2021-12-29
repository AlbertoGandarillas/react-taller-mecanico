import "./App.css";
import "antd/dist/antd.css"; // or 'antd/dist/antd.less'
import logo from "./images/logo-small.png";
import React, { useState } from "react";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import { Customers } from "./modules/customers/index";
import {
  Login,
  Recepcion,
  Facturacion,
  Reportes,
  OrdenReparacion,
  Cotizacion,
  Citas,
  SeguimientoCliente,
  Servicios,
  Repuestos,
  Vehiculos,
  Locales,
  Dashboard,
  Interfaces,
  Usuarios,
} from "./pages/index";

import { NotFound } from "./pages/notfound";

import { NavBar } from "./components/nav/index";
import { DisplayUser } from "./components/user/index";
import { Layout, Dropdown, Menu } from "antd";

import { UserOutlined, LogoutOutlined, FormOutlined } from "@ant-design/icons";
import { Redirect } from 'react-router-dom';

const { Header, Content, Footer, Sider } = Layout;

function App() {
  const [collapsed, setCollapsed] = useState(false);
  const [isAuth, setIsAuth] = useState(true);
  const year = new Date().getFullYear();

  const menuLoggedIn = (
    <Menu theme="dark">
      <Menu.Item key="1" icon={<UserOutlined />}>
        Mi Perfil
      </Menu.Item>
      <Menu.Item key="2" icon={<FormOutlined />}>
        Feedback
      </Menu.Item>
      <Menu.Item key="3" icon={<LogoutOutlined />} onClick={() => {
        setIsAuth(false)
      }}>
        Salir
      </Menu.Item>
    </Menu>
  );
  const menuLoggedOut = (
    <Menu theme="dark">
      <Menu.Item key="1" icon={<UserOutlined />} onClick={() => {
          setIsAuth(true)
      }}>
        Login
      </Menu.Item>
      <Menu.Item key="2" icon={<FormOutlined />}>
        Registrarse
      </Menu.Item>
    </Menu>
  );   

  return (
    <Router>
      <div className="wrapper">
        <Layout style={{ minHeight: "100vh" }}>
          <Sider
            collapsible
            collapsed={collapsed}
            onCollapse={() => {
              setCollapsed(!collapsed);
            }}
          >
            <div className="logo">
              <img src={logo} alt="Logo" />
            </div>
            <NavBar mode="inline" />
          </Sider>
          <Layout className="site-layout">
            <Header className="header">
              {/* <NavBar mode="horizontal" /> */}
              <DisplayUser userName="Alberto Gandarillas" />
              <Dropdown.Button
                className="user-menu"
                overlay={isAuth?menuLoggedIn:menuLoggedOut}
                placement="bottomCenter"
                icon={<UserOutlined />}
              ></Dropdown.Button>
            </Header>
            <Content className="main">
              <div className="site-layout-background">
                <Switch>
                  <Route path="/clientes"
                  exact
                    render={() => (isAuth ? <Customers /> : <Login />)}
                  />
                  <Route path="/login">
                    <Login />
                  </Route>
                  <Route path="/recepcion"
                    exact
                    render={() => (isAuth ? <Recepcion /> : <Login />)}
                  />
                  <Route path="/facturacion"
                    exact
                    render={() => (isAuth ? <Facturacion /> : <Login />)}
                  />
                  <Route path="/reportes"
                  exact
                  render={() => (isAuth ? <Reportes /> : <Login />)}
                />
                  <Route
                    path="/cotizacion"
                    exact
                    render={() => (isAuth ? <Cotizacion /> : <Login />)}
                  />
                  <Route path="/citas"
                  exact
                  render={() => (isAuth ? <Citas /> : <Login />)}
                />
                 <Route path="/seguimientoCliente"
                    exact
                    render={() => (isAuth ? <SeguimientoCliente /> : <Login />)}
                  />
                  <Route path="/ordenReparacion"
                  exact
                  render={() => (isAuth ? <OrdenReparacion /> : <Login />)}
                />
                  <Route path="/servicios"
                  exact
                  render={() => (isAuth ? <Servicios /> : <Login />)}
                />
                  <Route path="/vehiculos"
                  exact
                  render={() => (isAuth ? <Vehiculos /> : <Login />)}
                />
                  <Route path="/repuestos"
                  exact
                    render={() => (isAuth ? <Repuestos /> : <Login />)}
                  />
                  <Route path="/interfaces"
                  exact
                  render={() => (isAuth ? <Interfaces /> : <Login />)}
                />
                  <Route path="/usuarios"
                  exact
                  render={() => (isAuth ? <Usuarios /> : <Login />)}
                />
                  <Route path="/locales"
                  exact
                  render={() => (isAuth ? <Locales /> : <Login />)}
                />
                  <Route path="/" exact>
                    {/* <h1>Bienvenidos al Sistema de Getion de Talleres</h1> */}
                    <Dashboard/>
                  </Route>
                  <Route path="*">
                    <NotFound />
                  </Route>
                </Switch>
              </div>
            </Content>
            <Footer className="footer">
              Desarrollado por Grupo B - codiGO © {year}
            </Footer>
          </Layout>
        </Layout>
      </div>
    </Router>
  );
}

export default App;
