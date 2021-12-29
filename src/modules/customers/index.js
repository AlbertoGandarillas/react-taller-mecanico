import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm, Breadcrumb } from "antd";
import { Button, Modal, Form, Input, Select } from "antd";

/* Importar Iconos de Ant */
import { UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
import "./toolbar.scss";

export function Customers() {
  const [customers, setCustomers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cliente, setCliente] = useState([
    {
      id: "",
      firstName: "",
      lastName: "",
      phone: "",
      email: "",
      document: "",
    },
  ]);

  const base_url = "https://api-grupob-customers-login.herokuapp.com"
  /* Insertar cliente en JSON */
  const addCustomer = async (customer) => {
    let method = customer.id ? "UPDATE" : "POST";
    console.log(method);
    console.log(customer.id);
    try {
      if (method === "POST") {
        await fetch(`${base_url}/customers`, {
          method: "POST",
          body: JSON.stringify(customer),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`${base_url}/customer/${customer.id}`, {
          method: "PUT",
          body: JSON.stringify(customer),
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
    const { id, firstName, lastName, phone, email, document } = fieldsValue;
    console.log(fieldsValue);
    await addCustomer({
      id,
      firstName,
      lastName,
      phone,
      email,
      document,
    });
    setIsModalVisible(false);
    const response = await getCustomers();
    setCustomers(response);
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
  const getCustomers = async () => {
    try {
      const response = await fetch(`${base_url}/customers`);
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar cliente de JSON */
  const deleteCustomer = async (customer) => {
    try {
      console.log(customer);
      await fetch(`${base_url}/customer/${customer.id}`, {
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
  const handleDelete = async (customer) => {
    await deleteCustomer(customer);
    const response = await getCustomers();
    setCustomers(response);
  };

  const handleEdit = async (customer) => {
    const { id, firstName, lastName, phone, email, document } = customer;
    setCliente(customer);
    form.setFieldsValue({
      id: id,
      firstName: firstName,
      lastName: lastName,
      phone: phone,
      email: email,
      document: document,
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
      title: "Nombres",
      dataIndex: "firstName",
      filters: [
        {
          text: "Juan",
          value: "Juan",
        },
        {
          text: "Carolina",
          value: "Carolina",
        },
        {
          text: "Henry",
          value: "Henry",
        },
        {
          text: "Brunella",
          value: "Brunella",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.name.indexOf(value) === 0,
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Last Name",
      dataIndex: "lastName",
      filters: [
        {
          text: "Rojas",
          value: "Rojas",
        },
        {
          text: "Canelo",
          value: "Canelo",
        },
        {
          text: "Puerta",
          value: "Puerta",
        },
      ],
      onFilter: (value, record) => record.lastName.indexOf(value) === 0,
      sorter: (a, b) => a.lastName - b.lastName,
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      filters: [
        {
          text: "999326354",
          value: "999326354",
        },
        {
          text: "999235443",
          value: "999235443",
        },
        {
          text: "999237755",
          value: "999237755",
        },
        {
          text: "993245365",
          value: "993245365",
        },
      ],
      onFilter: (value, record) => record.phone.indexOf(value) === 0,
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      filters: [
        {
          text: "jbrown@att.com",
          value: "jbrown@att.com",
        },
        {
          text: "carolina@att.com",
          value: "carolina@att.com",
        },
        {
          text: "henry@att.com",
          value: "henry@att.com",
        },
        {
          text: "brune@att.com",
          value: "brune@att.com",
        },
      ],
      onFilter: (value, record) => record.email.indexOf(value) === 0,
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Document",
      dataIndex: "document",
      sorter: (a, b) => a.document > b.document,
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
          title={"Estas seguro que deseas remover este cliente?"}
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
    getCustomers().then((response) => {
      setCustomers(response);
    });
  }, []);

  return (
    <Fragment>
      <Breadcrumb>
        <Breadcrumb.Item href="">
          <HomeOutlined />
        </Breadcrumb.Item>
        <Breadcrumb.Item href="">
          <UsergroupAddOutlined />
          <span>Clientes</span>
        </Breadcrumb.Item>
      </Breadcrumb>

      {/* <CustomerToolbar /> */}

      <div className="customer-toolbar">
        <Button
          type="primary"
          icon={<AppstoreAddOutlined />}
          onClick={handleInsert}
        >
          Nuevo Cliente
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table
        columns={columns}
        dataSource={customers}
        // onChange={onChange}
      />

      <Modal
        title="Agregar Nuevo Cliente"
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
            <Form.Item name="id" noStyle initialValues={cliente.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Nombres"
            name="firstName"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre",
              },
            ]}
            initialValues={cliente.name}
          >
            <Input value={cliente.name} defaulValue={cliente.name} />
          </Form.Item>
          <Form.Item
            label="Apellidos"
            name="lastName"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el apellido",
              },
            ]}
            initialValues={cliente.lastName}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefono"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nro. telefonico",
              },
            ]}
            initialValues={cliente.phone}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "No es un correo valido!",
              },
              {
                required: true,
                message: "Por favor ingrese un correo.",
              },
            ]}
            initialValues={cliente.email}
          >
            <Input />
          </Form.Item>
          
          <Form.Item label="Tipo Documento">
            <Select>
              <Select.Option value="dni">DNI</Select.Option>
              <Select.Option value="pasaporte">Pasaporte</Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Nro. Documento">
            <Form.Item name="document" noStyle initialValues={cliente.document}>
              <Input />
            </Form.Item>
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
