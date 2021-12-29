import { Fragment, useEffect, useState } from "react";
import { Table, Button, Popconfirm } from "antd";
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

export function Cotizaciones() {

  const [cotizaciones, setCotizaciones] = useState([]);
  const [detalleCotizacion, setDetalleCotizacion] = useState([]);

  const getCotizaciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/cotizaciones");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  }

  const getDetalleCotizacion = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/detalle-cotizacion/${id}`);
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  }

  useEffect(() => { 
    getCotizaciones();
    getDetalleCotizacion(1);
  },[]);

  const expandedRowRender = () => {
    const columns = [
      { title: "Tipo", dataIndex: "tipo", key: "tipo" },
      { title: "Codigo", dataIndex: "codigo", key: "codigo" },
      { title: "Actividad", dataIndex: "actividad", key: "actividad" },
      { title: "Descripcion", dataIndex: "descripcion", key: "descripcion" },
      { title: "Medidad", dataIndex: "medida", key: "medida" },
      { title: "Cantidad", dataIndex: "cantidad", key: "cantidad" },
      { title: "Precio", dataIndex: "precio", key: "precio" },
      { title: "Total", dataIndex: "total", key: "total" },
      ,
      {
        title: "Editar",
        dataIndex: "operation",
        render: (_, record) => (
          <Button
          type="secondary"

        >
          Editar
        </Button>
        ),
      },
      ,
      {
        title: "Eliminar",
        dataIndex: "operation",
        render: (_, record) => (
          <Popconfirm
            title={"Estas seguro que deseas remover este item?"}
            okText="Aceptar"
            cancelText="Cancelar"
          >
            <Button type="secondary">Eliminar</Button>
          </Popconfirm>
        ),
      },
    ];

    const data = [
      {
        key: 1,
        tipo: "Repuesto",
        codigo: "0001",
        actividad: "Cambio",
        descripcion: "Logo tapa maletera",
        medida: "Unidad",
        cantidad: 1,
        precio: 10,
        total: 10,
      },
      {
        key: 2,
        tipo: "Mano Obra",
        codigo: "0002",
        actividad: "Traccionar",
        descripcion: "Traccionamiento Posterior",
        medida: "HHPL",
        cantidad: 3,
        precio: 15,
        total: 45,
      },
    ];
    return <Table columns={columns} dataSource={data} pagination={false} />;
  };

  const columns = [
    { title: "ID", dataIndex: "id", key: "id" },
    { title: "Numero", dataIndex: "numero", key: "numero" },
    { title: "Fecha", dataIndex: "fecha", key: "fecha" },
    { title: "Placa", dataIndex: "placa", key: "placa" },
    { title: "Marca", dataIndex: "marca", key: "marca" },
    { title: "Modelo", dataIndex: "modelo", key: "modelo" },
    { title: "$ M/O", dataIndex: "manoObra", key: "manoObra" },
    { title: "$ Rptos", dataIndex: "rptos", key: "rptos" },
    { title: "Seguro", dataIndex: "seguro", key: "seguro" },
    { title: "Descripcion", dataIndex: "descripcion", key: "descripcion" },
    {
      title: "Editar",
      key: "operation",
      render: () => <Button type="primary">Editar</Button>,
    },
  ];

  const data = [
    {
      key: 1,
      numero: "21060",
      fecha: "2014-12-24 23:12:00",
      placa: "BJD947",
      marca: "Citroen",
      modelo: "Berlingo",
      manoObra: 970,
      rptos: 0,
      seguro: "Rimac",
      descripcion: "Choque lateral izquierdo",
    },
    {
      key: 2,
      numero: "21061",
      fecha: "2014-12-25 23:12:00",
      placa: "C9X075",
      marca: "Chevrolet",
      modelo: "Cruze",
      manoObra: 462,
      rptos: 20,
      seguro: "Mapfre",
      descripcion: "Despiste Delantero Izquierdo",
    },
    {
      key: 3,
      numero: "21062",
      fecha: "2014-12-26 23:12:00",
      placa: "ACC099",
      marca: "Great Wall",
      modelo: "Voleex C30",
      manoObra: 132,
      rptos: 0,
      seguro: "Pacifico",
      descripcion: "Choque Posterior",
    },
  ];

  const handleInsert = async () => {
    // form.resetFields();
    // showModal();
  };

  return (
    <Fragment>
      {cotizaciones.map((cotizacion, idx) => (<p key={idx}>{cotizacion.modelo}</p>))}
      <div className="customer-toolbar">
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={handleInsert}
        >
          Nueva Cotizacion
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>
      <Table
        className="components-table-demo-nested"
        columns={columns}
        expandable={{ expandedRowRender }}
        dataSource={data}
      />
    </Fragment>
  );
}
