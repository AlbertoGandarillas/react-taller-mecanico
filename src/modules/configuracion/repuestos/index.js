import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm } from "antd";
import { Button, Modal, Form, Input } from "antd";

/* Importar Iconos de Ant */

import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function MostrarRepuestos() {
  const [repuestos, setRepuestos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [repuesto, setRepuesto] = useState([
    {
      id: "",
      descripcion: "",
      stock: "",
      precio: "",
    },
  ]);

  /* Insertar repuesto en JSON */
  const addRepuesto = async (repuesto) => {
    let method = repuesto.id ? "UPDATE" : "POST";
    // console.log(method);
    // console.log(customer.id);
    try {
      if (method === "POST") {
        await fetch("http://localhost:3000/repuestos", {
          method: "POST",
          body: JSON.stringify(repuesto),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`http://localhost:3000/repuestos/${repuesto.id}`, {
          method: "PUT",
          body: JSON.stringify(repuesto),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente de nuevo");
    }
  };

  const [form] = Form.useForm();

  /* Al llenar el formulario enviar los datos del formulario */
  const onFinish = async (fieldsValue) => {
    const { id, descripcion, stock, precio } = fieldsValue;
    console.log(fieldsValue);
    await addRepuesto({
      id,
      descripcion,
      stock,
      precio,
    });
    setIsModalVisible(false);
    const response = await getRepuestos();
    setRepuestos(response);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  /* Mostrar / Ocultar modal del repuesto */
  const showModal = () => {
    setIsModalVisible(true);
  };

  /* Cuando hace cancel o cierran el modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* Obtener repuestos del JSON */
  const getRepuestos = async () => {
    try {
      const response = await fetch("http://localhost:3000/repuestos");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar repuesto de JSON */
  const deleteRepuesto = async (repuesto) => {
    try {
      console.log(repuesto);
      await fetch(`http://localhost:3000/repuestos/${repuesto.id}`, {
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

  /* Evento para borrar un repuesto */
  const handleDelete = async (repuesto) => {
    await deleteRepuesto(repuesto);
    const response = await getRepuestos();
    setRepuestos(response);
  };

  const handleEdit = async (repuesto) => {
    const { id, descripcion, stock, precio } = repuesto;
    setRepuesto(repuesto);
    form.setFieldsValue({
      id: id,
      descripcion: descripcion,
      stock: stock,
      precio: precio,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de repuestos */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Descripción",
      dataIndex: "descripcion",
      // filters: [
      //   {
      //     text: "Batería",
      //     value: "Batería",
      //   },
      //   {
      //     text: "Bujía",
      //     value: "Bujía",
      //   },
      //   {
      //     text: "Limpia Parabrisa",
      //     value: "Limpia Parabrisa",
      //   }
      // ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.descripcion - b.descripcion,
    },
    {
      title: "Stock",
      dataIndex: "stock",
      sorter: (a, b) => a.stock - b.stock,
    },
    {
      title: "Precio S/",
      dataIndex: "precio",
      sorter: (a, b) => a.precio - b.precio,
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
          title={"¿Estas seguro que deseas eliminar este repuesto?"}
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

  /* Cargar repuestos al abrir el componente */
  useEffect(() => {
    getRepuestos().then((response) => {
      setRepuestos(response);
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
          Nuevo repuesto
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table columns={columns} dataSource={repuestos} />

      <Modal
        title="Agregar nuevo repuesto"
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
            <Form.Item name="id" noStyle initialValues={repuesto.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Descripción :"
            name="descripcion"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el descripción del repuesto",
              },
            ]}
            initialValues={repuesto.descripcion}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Stock :"
            name="stock"
            rules={[
              {
                required: true,
                message: "Por favor ingrese stock actual",
              },
            ]}
            initialValues={repuesto.stock}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Precio S/ :"
            name="precio"
            rules={[
              {
                required: true,
                message: "Por favor ingrese precio unitario en soles",
              },
            ]}
            initialValues={repuesto.precio}
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
