import { Menu } from "antd";
import {
  UsergroupAddOutlined,
  CarOutlined,
  ReconciliationOutlined,
  FileDoneOutlined,
  ControlOutlined,
  ToolOutlined,
  ShopOutlined,
  TeamOutlined,
  ApiOutlined,
  SettingOutlined,
  DollarCircleOutlined,
  SolutionOutlined,
  KeyOutlined,
  FilePdfOutlined,
} from "@ant-design/icons";
import { Link } from "react-router-dom";

const { SubMenu } = Menu;

export function NavBar(props) {
  const { mode } = props;
  return (
    <Menu theme="dark" mode={mode}>
      <Menu.Item key="recepcion" icon={<ReconciliationOutlined />}>
        <Link to={"/recepcion"}>Recepcion Vehiculo</Link>
      </Menu.Item>
      <Menu.Item key="cotizacion" icon={<FileDoneOutlined />}>
        <Link to={"/cotizacion"}>Cotizacion</Link>
      </Menu.Item>
      {/* <Menu.Item key="orden-repacion" icon={<ToolOutlined />}>
      <Link to={"/ordenReparacion"}>Orden Repacion</Link>
      </Menu.Item>       */}
      <Menu.Item key="locales" icon={<ShopOutlined />}>
        <Link to={"/locales"}>Locales</Link>
      </Menu.Item>
      <Menu.Item key="citas" icon={<SolutionOutlined />}>
        <Link to={"/citas"}>Citas</Link>
      </Menu.Item>
      {/* <Menu.Item key="facturacion" icon={<DollarCircleOutlined />}>
      <Link to={"/facturacion"}>Facturacion</Link>
      </Menu.Item>                        */}

      <SubMenu
        key="configuracion"
        icon={<ControlOutlined />}
        title="Configuracion"
      >
        <Menu.Item key="clientes" icon={<UsergroupAddOutlined />}>
          <Link to={"/clientes"}>Clientes</Link>
        </Menu.Item>
        <Menu.Item key="vehiculos" icon={<CarOutlined />}>
          <Link to={"/vehiculos"}>Vehiculos</Link>
        </Menu.Item>
        <Menu.Item key="servicios" icon={<CarOutlined />}>
          <Link to={"/servicios"}>Servicios</Link>
        </Menu.Item>
        <Menu.Item key="repuestos" icon={<SettingOutlined />}>
          <Link to={"/repuestos"}>Repuestos</Link>
        </Menu.Item>
      </SubMenu>
      <SubMenu key="seguridad" icon={<KeyOutlined />} title="Seguridad">
        <Menu.Item key="users" icon={<TeamOutlined />}>
          <Link to={"/usuarios"}>Usuarios</Link>
        </Menu.Item>
        {/* <Menu.Item key="interfaces" icon={<ApiOutlined />}><Link to={"/interfaces"}>Interfaces</Link></Menu.Item> */}
      </SubMenu>
      {/* <Menu.Item key="Reportes" icon={<FilePdfOutlined />}>
      <Link to={"/reportes"}>Reportes</Link>
      </Menu.Item> */}
      <Menu.Item key="SeguimientoCliente" icon={<FilePdfOutlined />}>
        <Link to={"/seguimientoCliente"}>Gestión de Cliente</Link>
      </Menu.Item>
    </Menu>
  );
}
