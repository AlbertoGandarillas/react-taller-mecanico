import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm, Breadcrumb, Cascader } from "antd";
import { Button, Modal, Form, Input, Select, InputNumber } from "antd";

/* Importar Iconos de Ant */
import { UsergroupAddOutlined, HomeOutlined } from "@ant-design/icons";
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";
import { Row, Col, Checkbox, AutoComplete } from "antd";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function ShowUsers() {
  const [users, setUsers] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [user, setuser] = useState([
    {
      id: "",
      username: "",
      name: "",
      lastName: "",
      password: "",
      profileId: "",
      profile: "",
      email: "",
      cellPhone: "",
      identificationDocumentId: "",
      identificationDocument: "",
      documentNumber: "",
      status: "",
    },
  ]);

  /* Insertar user en JSON */
  const addUser = async (user) => {
    let method = user.id ? "UPDATE" : "POST";
    // console.log(method);
    // console.log(customer.id);
    try {
      if (method == "POST") {
        await fetch("http://localhost:3000/systemUsers", {
          method: "POST",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`http://localhost:3000/systemUsers/${user.id}`, {
          method: "PUT",
          body: JSON.stringify(user),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("err", err);
      alert("No se pudo registrar intente de nuevo");
    }
  };

  const [form] = Form.useForm();

  /* Al llenar el formulario enviar los datos del formulario */
  const onFinish = async (fieldsValue) => {
    const {
      id,
      username,
      name,
      lastName,
      password,
      profile,
      email,
      cellPhone,
      identificationDocument,
      documentNumber,
      status,
    } = fieldsValue;
    console.log(fieldsValue);
    await addUser({
      id,
      username,
      name,
      lastName,
      password,
      profile,
      email,
      cellPhone,
      identificationDocument,
      documentNumber,
      status,
    });
    setIsModalVisible(false);
    const response = await getUsers();
    setUsers(response);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  /* Mostrar / Ocultar modal del user */
  const showModal = () => {
    setIsModalVisible(true);
  };

  /* Cuando hace cancel o cierran el modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* Obtener users del JSON */
  const getUsers = async () => {
    try {
      const response = await fetch("http://localhost:3000/systemUsers");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar user de JSON */
  const deleteUser = async (user) => {
    try {
      console.log(user);
      await fetch(`http://localhost:3000/systemUsers/${user.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Obtener perfiles del JSON */
  const getProfilesAsync = async () => {
    try {
      const response = await fetch("http://localhost:3000/profiles");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  const getProfiles = [
    {
      label: "Super Admin",
      value: "Super Admin",
    },
    {
      label: "Admin",
      value: "Admin",
    },
    {
      label: "Other",
      value: "Other",
    },
  ];


  /* Obtener tipos de documento de identidad */
  const getIdentificationDocument = [
    {
      label: "DNI",
      value: "DNI",
    },
    {
      label: "RUC",
      value: "RUC",
    },
    {
      label: "Otros",
      value: "Otros",
    },
  ];

  // [
  //     {
  //       "id": 1,
  //       "profile": "Super Admin",
  //       "status": true,
  //       "visibility": false
  //     },
  //     {
  //       "id": 2,
  //       "profile": "Admin",
  //       "status": true,
  //       "visibility": true
  //     },
  //     {
  //       "id": 3,
  //       "profile": "Other",
  //       "status": true,
  //       "visibility": false
  //     }
  //   ]

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

  /* Evento para borrar un user */
  const handleDelete = async (user) => {
    await deleteUser(user);
    const response = await getUsers();
    setUsers(response);
  };

  const handleEdit = async (user) => {
    const {
      id,
      username,
      name,
      lastName,
      password,      
      profile,
      email,
      cellPhone,      
      identificationDocument,
      documentNumber,
      status,
    } = user;
    setuser(user);
    form.setFieldsValue({
      id: id,
      username: username,
      name: name,
      lastName: lastName,
      password: password,      
      profile: profile,
      email: email,
      cellPhone: cellPhone,      
      identificationDocument: identificationDocument,
      documentNumber: documentNumber,
      status: status,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de users */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Username",
      dataIndex: "username",
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
      sorter: (a, b) => a.username - b.username,
    },
    {
      title: "Nombres",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Apellidos",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName - b.lastName,
    },
    {
      title: "Password",
      dataIndex: "password",
      sorter: (a, b) => a.password - b.password,
    },
    {
      title: "Perfil",
      dataIndex: "profile",
      sorter: (a, b) => a.profile - b.profile,
    },
    {
      title: "Correo",
      dataIndex: "email",
      sorter: (a, b) => a.email - b.email,
    },
    {
      title: "Nro. Celular",
      dataIndex: "cellPhone",
      sorter: (a, b) => a.cellPhone - b.cellPhone,
    },
    {
      title: "Tipo Doc.",
      dataIndex: "identificationDocument",
      sorter: (a, b) => a.identificationDocument - b.identificationDocument,
    },
    {
      title: "Nro. Doc.",
      dataIndex: "documentNumber",
      sorter: (a, b) => a.documentNumber - b.documentNumber,
    },
    {
      title: "Estado",
      dataIndex: "status",
      //   sorter: (a, b) => a.status - b.status,
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
          title={"¿Está seguro que desea eliminar este usuario?"}
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

  /* Cargar users al abrir el componente */
  useEffect(() => {
    getUsers().then((response) => {
      setUsers(response);
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
          Nuevo usuario
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table columns={columns} dataSource={users} />

      <Modal     
        title="Agregar/Editar usuario"
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
            <Form.Item name="id" noStyle initialValues={user.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Username :"
            name="username"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese username",
                message: "",
              },
            ]}
            hasFeedback
            InitialValues={user.username}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nombre :"
            name="name"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese nombre",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.name}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Apellidos :"
            name="lastName"
            rules={[
              {
                // required: true,
                // message: "Por favor ingrese apellidos",
                message: "",
              },
            ]}
            initialValues={user.lastName}
            // hasFeedback
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Password :"
            name="password"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese password",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.password}
          >
            <Input.Password />
          </Form.Item>
          <Form.Item
            label="Perfil :"
            name="profile"
            rules={[
              {
                // type: "array",
                required: true,
                // message: "Por favor ingrese perfil",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.profile}
            // value={user.profile}
          >
            <Select options={getProfiles} />
          </Form.Item>
          <Form.Item
            label="Email :"
            name="email"
            rules={[
              {
                type: "email",
                message: "Formato de correo incorrecto",
              },
              {
                required: true,
                // message: "Por favor ingrese email",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.email}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Nro. Celular :"
            name="cellPhone"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese nro. celular",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.cellPhone}
          >
            <Input />
          </Form.Item>          
          <Form.Item
            label="Tipo Doc. :"
            name="identificationDocument"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese tipo documento",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.identificationDocument}
            // value ={user.identificationDocument}
          >
            <Select options={getIdentificationDocument} />
          </Form.Item>
          <Form.Item
            label="Nro. Doc. :"
            name="documentNumber"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese nro. documento",
                message: "",
              },
            ]}
            hasFeedback
            initialValues={user.documentNumber}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Estado :"
            name="status"
            rules={[
              {
                required: true,
                // message: "Por favor ingrese estado",
                message:""
              },
            ]}
            hasFeedback
            initialValues={user.status}
            // valuePropName="checked"
          >
            <Select>
            <Select.Option value="Habilitado">Habilitado</Select.Option>
            <Select.Option value="Deshabilitado">Deshabilitado</Select.Option>
            </Select>
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
