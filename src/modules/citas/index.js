import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm } from "antd";
import { Button, Modal, Form, Input, Select } from "antd";

/* Importar Iconos de Ant */
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
/*import "./toolbar.scss";*/

export function MostrarCitas() {
  const [citas, setCitas] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [cita, setCita] = useState([
    {
      idCustomer: "",
      name: "",
      lastName: "",
      phone: "",
      email: "",
      plate: "",
      mileage: "",
      brand: "",
      Local: "",
      date: "",
      hour: "",
      reason: "",
      state: "",
    },
  ]);

  /* Insertar cliente en JSON */
  const addCita = async (cita) => {
    let method = cita.id ? "UPDATE" : "POST";
    // console.log(method);
    // console.log(cita.id);
    try {
      if (method === "POST") {
        await fetch("http://localhost:3000/citas", {
          method: "POST",
          body: JSON.stringify(cita),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`http://localhost:3000/citas/${cita.id}`, {
          method: "PUT",
          body: JSON.stringify(cita),
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

  /* Al llenar el formulario enviar los datos del forulario */
  const onFinish = async (fieldsValue) => {
    const {
      idCustomer,
      name,
      lastName,
      phone,
      email,
      plate,
      mileage,
      brand,
      Local,
      date,
      hour,
      reason,
      state,
    } = fieldsValue;
    console.log(fieldsValue);
    await addCita({
      idCustomer,
      name,
      lastName,
      phone,
      email,
      plate,
      mileage,
      brand,
      Local,
      date,
      hour,
      reason,
      state,
    });
    setIsModalVisible(false);
    const response = await getCitas();
    setCitas(response);
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

  /* Obtener citas de JSON */
  const getCitas = async () => {
    try {
      const response = await fetch("http://localhost:3000/citas");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eliminar cita de JSON */
  const deleteCita = async (cita) => {
    try {
      console.log(cita);
      await fetch(`http://localhost:3000/citas/${cita.id}`, {
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
  const handleDelete = async (cita) => {
    await deleteCita(cita);
    const response = await getCitas();
    setCitas(response);
  };

  const handleEdit = async (cita) => {
    const {
      idCustomer,
      name,
      lastName,
      phone,
      email,
      plate,
      mileage,
      brand,
      Local,
      date,
      hour,
      reason,
      state,
    } = cita;
    setCita(cita);
    form.setFieldsValue({
      idCustomer: idCustomer,
      name: name,
      lastName: lastName,
      phone: phone,
      email: email,
      plate: plate,
      mileage: mileage,
      brand: brand,
      Local: Local,
      date: date,
      hour: hour,
      reason: reason,
      state: state,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de citas */
  const columns = [
    {
      title: "Id",
      dataIndex: "id",
    },
    {
      title: "RUC/DNI",
      dataIndex: "idCustomer",

      // specify the condition of filtering result
      // here is that finding the name started with `value`
      sorter: (a, b) => a.IdCustomer - b.IdCustomer,
    },
    {
      title: "Nombre",
      dataIndex: "name",
      sorter: (a, b) => a.name - b.name,
    },
    {
      title: "Apellidos",
      dataIndex: "lastName",
      sorter: (a, b) => a.lastName - b.lastName,
    },
    {
      title: "Telefono",
      dataIndex: "phone",
      sorter: (a, b) => a.phone.length - b.phone.length,
    },
    {
      title: "Email",
      dataIndex: "email",
      sorter: (a, b) => a.email.length - b.email.length,
    },
    {
      title: "Placa",
      dataIndex: "plate",
      sorter: (a, b) => a.plate.length - b.plate.length,
    },
    {
      title: "Kilometraje",
      dataIndex: "mileage",
      sorter: (a, b) => a.mileage.length - b.mileage.length,
    },
    {
      title: "Marca",
      dataIndex: "brand",
      sorter: (a, b) => a.brand.length - b.brand.length,
    },
    {
      title: "Local",
      dataIndex: "Local",
      sorter: (a, b) => a.local.length - b.local.length,
    },
    {
      title: "Fecha",
      dataIndex: "date",
      sorter: (a, b) => a.date.length - b.date.length,
    },
    {
      title: "Hora",
      dataIndex: "hour",
      sorter: (a, b) => a.hour.length - b.hour.length,
    },
    {
      title: "Motivo",
      dataIndex: "reason",
      sorter: (a, b) => a.reason.length - b.reason.length,
    },
    {
      title: "Estado",
      dataIndex: "state",
      sorter: (a, b) => a.state.length - b.state.length,
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
          title={"Estas seguro que deseas remover esta cita?"}
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
    getCitas().then((response) => {
      setCitas(response);
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
          Nueva cita
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>

      <Table columns={columns} dataSource={citas} />

      <Modal
        title="Agregar Nueva cita"
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
            <Form.Item name="id" noStyle initialValues={cita.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>

          <Form.Item
            label="RUC/DNI"
            name="idCustomer"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el indentificador",
              },
            ]}
            initialValues={cita.idCustomer}
          >
            <Input value={cita.idCustomer} defaulValue={cita.idCustomer} />
          </Form.Item>
          <Form.Item
            label="Nombre"
            name="name"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre",
              },
            ]}
            initialValues={cita.name}
          >
            <Input value={cita.name} defaulValue={cita.name} />
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
            initialValues={cita.lastName}
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
            initialValues={cita.phone}
          >
            <Input style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            name="email"
            label="E-mail"
            rules={[
              {
                type: "email",
                message: "No es cun correo valido!",
              },
              {
                required: true,
                message: "Por favor ingrese un correo.",
              },
            ]}
            initialValues={cita.email}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Placa"
            name="plate"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una placa vehicular",
              },
            ]}
            initialValues={cita.plate}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Kilometraje"
            name="mileage"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el kilometraje",
              },
            ]}
            initialValues={cita.mileage}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Marca"
            name="brand"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una marca",
              },
            ]}
            initialValues={cita.brand}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Local">
            <Select>
              <Select.Option value="LocalSanBorja">
                Local San Borja
              </Select.Option>
              <Select.Option value="LocalSurco">Local Surco</Select.Option>
              <Select.Option value="LocalMiraflores">
                Local Miraflores
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item
            label="Fecha"
            name="date"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una fecha",
              },
            ]}
            initialValues={cita.date}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Hora"
            name="hour"
            rules={[
              {
                required: true,
                message: "Por favor ingrese una hora",
              },
            ]}
            initialValues={cita.hour}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Motivo">
            <Select>
              <Select.Option value="ManteniminetoPreventivo">
                Mntto Preventivo
              </Select.Option>
              <Select.Option value="MantenimientoCorrectivo">
                Mntto Correctivo
              </Select.Option>
            </Select>
          </Form.Item>

          <Form.Item label="Estado">
            <Select>
              <Select.Option value="Nuevo">Nuevo</Select.Option>
              <Select.Option value="Reprogramado">Reprogramado</Select.Option>
              <Select.Option value="Atendido">Atendido</Select.Option>
              <Select.Option value="Cancelado">Cancelado</Select.Option>
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
