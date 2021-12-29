import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm } from "antd";
import { Button, Modal, Form, Input } from "antd";

/* Importar Iconos de Ant */
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function ViewServicios() {
  const [servicios, setServicios] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [servicio, setServicio] = useState([
    {
      id: "",
      descripcion: "",
      precio: "",
    },
  ]);

  /* Insertar cliente en JSON */
  const urlBase="https://grupob-api1.herokuapp.com/"
  const addServicio = async (servicio) => {
    let method = servicio.id ? "UPDATE" : "POST";
    console.log(method);
    console.log(servicio.id);
    try {
      if (method == "POST") {
        await fetch(urlBase+"service", {
          method: "POST",
          body: JSON.stringify(servicio),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        //await fetch(`http://localhost:3000/servicios/${servicio.id}`, {
          await fetch(`${urlBase}service/${servicio.id}`, {
          method: "PUT",
          body: JSON.stringify(servicio),
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
    const { id, descripcion, precio } = fieldsValue;
    console.log(fieldsValue);
    await addServicio({
      id,
      descripcion,
      precio,
    });
    setIsModalVisible(false);
    const response = await getServicios();
    setServicios(response);
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
  const getServicios = async () => {
    try {
      const response = await fetch(`${urlBase}services`);
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar cliente de JSON */
  const deleteServicio = async (servicio) => {
    try {
      console.log(servicio);
      await fetch(`${urlBase}service/${servicio.id}`, {
      // await fetch(`http://localhost:3000/servicios/${servicio.id}`, {
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
  const handleDelete = async (servicio) => {
    await deleteServicio(servicio);
    const response = await getServicios();
    setServicios(response);
  };

  const handleEdit = async (servicio) => {
    const { id, descripcion, precio } = servicio;
    setServicio(servicio);
    form.setFieldsValue({
      id: id,
      descripcion: descripcion,
      precio: precio,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de clientes */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Servicios",
      dataIndex: "descripcion",
      filters: [
        {
          text: "Mantenimiento",
          value: "Mantenimiento",
        },
        {
          text: "Pintura",
          value: "Pintura",
        },
        {
          text: "Planchado",
          value: "Planchado",
        },
        {
          text: "Sistema de frenos",
          value: "Sistema de frenos",
        },
        {
          text: "Electricidad y electronica",
          value: "Electricidad y electronica",
        },
        {
          text: "Suspension y direccion",
          value: "Suspension y direccion",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.descrpcion.indexOf(value) === 0,
      sorter: (a, b) => a.descripcion - b.descripcion,
    },
    {
      title: "Precio",
      dataIndex: "precio",

      sorter: (a, b) => a.precio - b.precio,
    },

    {
      title: "Edit",
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
      title: "Delete",
      dataIndex: "operation",
      render: (_, record) => (
        <Popconfirm
          title={"Estas seguro que deseas remover este servicio?"}
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

  /* Cargar clientes al abrir el componente */
  useEffect(() => {
    getServicios().then((response) => {
      setServicios(response);
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
          Nuevo Servicio
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={servicios}
        // onChange={onChange}
      />

      <Modal
        title="Agregar Nuevo Servicio"
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
            <Form.Item name="id" noStyle initialValues={servicio.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Servicio"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre del servicio",
              },
            ]}
            initialValues={servicio.descripcion}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Precio"
            name="precio"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Precio del servicio",
              },
            ]}
            initialValues={servicio.precio}
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
