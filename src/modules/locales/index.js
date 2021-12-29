import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm } from "antd";
import { Button, Modal, Form, Input } from "antd";

/* Importar Iconos de Ant */

import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function MostrarLocales() {
  const [locales, setLocales] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [local, setLocal] = useState([
    {
      id: "",
      descripcion: "",
      direccion: "",
      telefono: "",
    },
  ]);

  /* Url Base del API desplegado en Heroku */
  const urlBase ="https://grupob-api1.herokuapp.com/"

  /* Insertar cliente en JSON */
  const addLocal = async (local) => {
    let method = local.id ? "UPDATE" : "POST";
    // console.log(method);
    // console.log(customer.id);
    try {
      if (method === "POST") {
        // await fetch("http://localhost:5000/local", {
          await fetch(urlBase + "local", {
          method: "POST",
          body: JSON.stringify(local),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        // await fetch(`http://localhost:5000/local/${local.id}`, {
          await fetch(`${urlBase}local/${local.id}`, {
          method: "PUT",
          body: JSON.stringify(local),
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
    const { id, descripcion, direccion, telefono } = fieldsValue;
    console.log(fieldsValue);
    await addLocal({
      id,
      descripcion,
      direccion,
      telefono,
    });
    setIsModalVisible(false);
    const response = await getLocales();
    setLocales(response);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  /* Mostrar / Ocultar modal de cliente */
  const showModal = () => {
    setIsModalVisible(true);
  };

  /* Cuando hace cancel o cierran el modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* Obtener clientes de JSON */
  const getLocales = async () => {
    try {
      // const response = await fetch("http://localhost:5000/locales");
      const response = await fetch(urlBase + "locales");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar cliente de JSON */
  const deleteLocal = async (local) => {
    try {
      console.log(local);
      // await fetch(`http://localhost:5000/local/${local.id}`, {
        await fetch(`${urlBase}local/${local.id}`, {
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

  /* Evento para borrar un cliente */
  const handleDelete = async (local) => {
    await deleteLocal(local);
    const response = await getLocales();
    setLocales(response);
  };

  const handleEdit = async (local) => {
    const { id, descripcion, direccion, telefono } = local;
    setLocal(local);
    form.setFieldsValue({
      id: id,
      descripcion: descripcion,
      direccion: direccion,
      telefono: telefono,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de locales */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Local",
      dataIndex: "descripcion",
      filters: [
        {
          text: "Local Miraflores",
          value: "Local Miraflores",
        },
        {
          text: "Local Surco",
          value: "Local Surco",
        },
        {
          text: "Local San Borja",
          value: "Local San Borja",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.descripcion - b.descripcion,
    },
    {
      title: "Direccion Local",
      dataIndex: "direccion",
      sorter: (a, b) => a.direccion - b.direccion,
    },
    {
      title: "Telefono",
      dataIndex: "telefono",
      sorter: (a, b) => a.telefono.length - b.telefono.length,
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
          title={"Estas seguro que deseas remover este local?"}
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

  /* Cargar locales al abrir el componente */
  useEffect(() => {
    getLocales().then((response) => {
      setLocales(response);
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
          Nuevo Local
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table columns={columns} dataSource={locales} />

      <Modal
        title="Agregar Nuevo Local"
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
          <Form.Item style={{ display: "none" }}>
            <Form.Item name="id" noStyle initialValues={local.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Nombre de Local"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del local",
              },
            ]}
            InitialValues={local.descripcion}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Direccion de Local"
            name="direccion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la direccion del local",
              },
            ]}
            initialValues={local.direccion}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="telefono"
            label="Telefono"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nro. de telefono",
              },
            ]}
            initialValues={local.telefono}
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
