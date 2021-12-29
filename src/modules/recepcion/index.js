import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm, Breadcrumb } from "antd";
import { Button, Modal, Form, Input, Select, InputNumber } from "antd";

/* Importar Iconos de Ant */
import { UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function MostrarRecepcion() {
  const [recepciones, setRecepciones] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [recepcion, setRecepcion] = useState([
    {
      id: "",
      vehiculo: "",
      cliente: "",
      fecha: "",
      seguro: "",
      vinopor: "",
      recepcionado: "",
    },
  ]);

  /* Insertar Recepción en JSON */
  const addRecepcion = async (recepcion) => {
    let method = recepcion.id ? "UPDATE" : "POST";
    try {
      if ( method == "POST" )  {
        await fetch("http://localhost:3000/recepcion", {
          method: "POST",
          body: JSON.stringify(recepcion),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`http://localhost:3000/recepcion/${recepcion.id}`, {
          method: "PUT",
          body: JSON.stringify(recepcion),
          headers: {
            "Content-Type": "application/json",
          },
        });       
      }
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente denuevo");
    }
  };

  const [form] = Form.useForm();

  /* Al llenar el formulario enviar los datos del forulario */
  const onFinish = async (fieldsValue) => {
    const { id, vehiculo, cliente, fecha, seguro, vinopor, recepcionado} = fieldsValue;
      
    /*console.log(fieldsValue);*/
    await addRecepcion({
      id,vehiculo, cliente, fecha, seguro, vinopor, recepcionado,
    });
    setIsModalVisible(false);
    const response = await getRecepciones();
    setRecepciones(response);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  /* Mostrar / Ocultar modal de recepcion */
  const showModal = () => {
    setIsModalVisible(true);
  };

  /* Cuando hace cancel o cierran el modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* Obtener recepcion de JSON */
  const getRecepciones = async () => {
    try {
      const response = await fetch("http://localhost:3000/recepcion");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intente nuevamente");
    }
  };

  /* Eliminar recepcion de JSON */
  const deleteRecepcion = async (recepcion) => {
    try {
      console.log(recepcion);
      await fetch(`http://localhost:3000/recepcion/${recepcion.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eventos de la tabla clientes paginado, filtros , orden */
  // function onChange(pagination, filters, sorter, extra) {
  //   console.log("params", pagination, filters, sorter, extra);
  // }

  // const handleOk = () => {
  //   onFinish();
  // };

  const handleInsert = async () => {
    form.resetFields();
    showModal();
  };

  /* Evento para borrar una recepcion */
  const handleDelete = async (recepcion) => {
    await deleteRecepcion(recepcion);
    const response = await getRecepciones();
    setRecepciones(response);
  };

  const handleEdit = async (recepcion) => {
    const {  id,vehiculo, cliente, fecha, seguro, vinopor, recepcionado } = recepcion;
    setRecepcion(recepcion);
    form.setFieldsValue({
      id: id,
      vehiculo: vehiculo,
      cliente: cliente,
      fecha: fecha,
      seguro: seguro,
      vinopor: vinopor,
      recepcionado: recepcionado,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de recepciones */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
        title: "Vehículo",
        dataIndex: "vehiculo",
    },
    {
        title: "Cliente",
        dataIndex: "cliente",
    },
    {
        title: "Fecha",
        dataIndex: "fecha",
    },
    {
      title: "Cia de Seguro",
      dataIndex: "seguro",
      filters: [
        {
          text: "Rimac",
          value: "Rimac",
        },
        {
          text: "La positiva",
          value: "La positiva",
        },
        {
          text: "Pacifico",
          value: "Pacifico",
        }
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.seguro - b.seguro,
    },
    {
        title: "Visito el Taller Por",
        dataIndex: "vinopor",
        filters: [
          {
            text: "Mantenimiento",
            value: "Mantenimiento",
          },
          {
            text: "Siniestro o Choque",
            value: "Siniestro o Choque",
          },
          {
            text: "Inspección",
            value: "Inspección",
          },
          {
            text: "Planchado y Pintura",
            value: "Planchado y Pintura",
          },
          {
            text: "Reclamo",
            value: "Reclamo",
          }
        ],
        // specify the condition of filtering result
        // here is that finding the name started with `value`
        onFilter: (value, record) => record.name.indexOf(value) === 0,
        sorter: (a, b) => a.vinnopor - b.vinopor,
    },
    {
      title: "Recepcionado Por",
      dataIndex: "recepcionado",
      sorter: (a, b) => a.recepcionado - b.recepcionado,
    },
 
    {
      title: "Editar",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            handleEdit(record);
          }}
        >
          Editar
        </Button>
      ),
    },
    {
      title: "Eliminar",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title={"Estas seguro que deseas remover este Registro de Recepción?"}
          onConfirm={() => {
            handleDelete(record);
          }}
          okText="Aceptar"
          cancelText="Cancelar"
        >
          <Button type="secondary">Eliminar</Button>
        </Popconfirm>
      ),
    },
  ];

  // useEffect(() => {
  //   fetch("http://localhost:3000/customers")
  //     .then((response) => response.json())
  //     .then((customers) => setCustomers(customers));
  // }, []);

  /* Cargar recepciones al abrir el componente */
  useEffect(() => {
    getRecepciones().then((response) => {
      setRecepciones(response);
    });
  }, []);

  return (
    <Fragment>

    <div className="customer-toolbar">
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={handleInsert}
        >
          Nueva Recepción
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={recepciones}
      />

      <Modal
        title="Agregar Nueva Recepción"
        visible={isModalVisible}
        onCancel={handleCancel}
        footer={[
          // <Button key="submit" type="primary" onClick={handleOk}>
          //   Enviar
          // </Button>,
          <Button key="back" onClick={handleCancel}>
            Cancelar
          </Button>,
        ]}
      >
        <Form
          form={form}
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item style={{ display: 'none' }}>
            <Form.Item name="id" noStyle initialValues={recepcion.id}>
              <Input type="hidden"/>
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Placa del Vehículo"
            name="vehiculo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la placa del hevículo",
              },
            ]}
            InitialValues={recepcion.vehiculo}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Cliente"
            name="cliente"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el cliente del vehículo",
              },
            ]}
            initialValues={recepcion.cliente}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fecha"
            label="Fecha"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la fecha de recepción",
              },
            ]}
            initialValues={recepcion.fecha}
          >
              <Input />
          </Form.Item>

          <Form.Item
            name="seguro"
            label="Compañia de Seguro"
           
            initialValues={recepcion.seguro}
            >
            <Select>
              <Select.Option value="Rimac">Rimac</Select.Option>
              <Select.Option value="La Positiva">La Positiva</Select.Option>
              <Select.Option value="Pacifico">Pacifico</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            name="vinopor"
            label="Visita el Taller Por"
            initialValues={recepcion.fecha}
            >
            <Select>
              <Select.Option value="Mantenimiento">Mantenimiento</Select.Option>
              <Select.Option value="Inspección">Inspección</Select.Option>
              <Select.Option value="Siniestro o Choque">Siniestro o Choque</Select.Option>
              <Select.Option value="Planchado y Pintura">Planchado y Pintura</Select.Option>
              <Select.Option value="Reclamo">Reclamo</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            name="recepcionado"
            label="Recepcionado Por"
            rules={[
              {
                required: true,
                message: "Por favor ingrese quien recepcionó el vehículo",
              },
            ]}
            initialValues={recepcion.recepcionado}
          >
              <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 8,
              span: 16,
            }}
          >
            <Button type="primary" htmlType="submit">
              Enviar
            </Button>
          </Form.Item>
        </Form>
      </Modal>
    </Fragment>
  );
}