import { useEffect, useState, Fragment } from "react";
/* Importar librerias de Ant */
import { Table, Popconfirm } from "antd";
import { Button, Modal, Form, Input, DatePicker } from "antd";
import moment from "moment";

/* Importar Iconos de Ant */
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

/* Si el toolbar hubiera sido un compnente , esta seria la importacion */
// import { CustomerToolbar } from "./toolbar";
//import "./toolbar.scss";

export function ListarVehiculos() {
  const [vehiculos, setVehiculos] = useState([]);
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [vehiculo, setVehiculo] = useState([
    {
      id: "",
      marca: "",
      modelo: "",
      fabricacion: "",
      kms: "",
      ultimavisita: "",
      cliente: "",
    },
  ]);
  const dateFormat = "YYYY-MM-DD";

  /* Insertar vehiculo en JSON */
  const addVehiculo = async (vehiculo) => {
    let method = vehiculo.id ? "UPDATE" : "POST";
    // console.log(method);
    // console.log(vehiculo.id);
    try {
      if (method === "POST") {
        await fetch("http://localhost:3000/vehiculos", {
          method: "POST",
          body: JSON.stringify(vehiculo),
          headers: {
            "Content-Type": "application/json",
          },
        });
      } else {
        await fetch(`http://localhost:3000/vehiculos/${vehiculo.id}`, {
          method: "PUT",
          body: JSON.stringify(vehiculo),
          headers: {
            "Content-Type": "application/json",
          },
        });
      }
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente Nuevamente");
    }
  };

  const [form] = Form.useForm();

  /* Al llenar el formulario enviar los datos del forulario */
  const onFinish = async (fieldsValue) => {
    const { id, marca, modelo, fabricacion, kms, ultimavisita , cliente } = fieldsValue;
    /*console.log(fieldsValue);*/
    await addVehiculo({
      id,
      marca,
      modelo,
      fabricacion,
      kms,
      ultimavisita,
      cliente,
    });
    setIsModalVisible(false);
    const response = await getVehiculos();
    setVehiculos(response);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  /* Mostrar / Ocultar modal de vehiculo */
  const showModal = () => {
    setIsModalVisible(true);
  };

  /* Cuando hace cancel o cierran el modal */
  const handleCancel = () => {
    setIsModalVisible(false);
  };

  /* Obtener vehiculos de JSON */
  const getVehiculos = async () => {
    try {
      const response = await fetch("http://localhost:3000/vehiculos");
      return response.json();
    } catch (err) {
      alert("no se pudo obtener los datos, intente nuevamente");
    }
  };

  /* Eliminar vehiculo de JSON */
  const deleteVehiculo = async (vehiculo) => {
    try {
      console.log(vehiculo);
      await fetch(`http://localhost:3000/vehiculos/${vehiculo.id}`, {
        method: "DELETE",
      });
    } catch (err) {
      alert("no se pudo obtener los datos, intenta nuevamente");
    }
  };

  /* Eventos de la tabla vehiculos paginado, filtros , orden */
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

  /* Evento para borrar un vehiculo */
  const handleDelete = async (vehiculo) => {
    await deleteVehiculo(vehiculo);
    const response = await getVehiculos();
    setVehiculos(response);
  };

  const handleEdit = async (vehiculo) => {
    const { id, marca, modelo, fabricacion, kms, ultimavisita, cliente } =
      vehiculo;
    setVehiculo(vehiculo);
    form.setFieldsValue({
      id: id,
      marca: marca,
      modelo: modelo,
      fabricacion: fabricacion,
      kms: kms,
      ultimavisita: moment(vehiculo.ultimavisita, dateFormat) ,
      cliente: cliente,
    });
    setIsModalVisible(true);
  };

  /* Definicion de columnas de la tabla de vehiculos */
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
    },
    {
      title: "Marca",
      dataIndex: "marca",
      filters: [
        {
          text: "KIA",
          value: "KIA",
        },
        {
          text: "TOYOTA",
          value: "TOYOTA",
        },
        {
          text: "MITSUBISHI",
          value: "MITSUBISHI",
        },
      ],
      // specify the condition of filtering result
      // here is that finding the name started with `value`
      onFilter: (value, record) => record.marca.indexOf(value) === 0,
      sorter: (a, b) => a.marca - b.marca,
    },
    {
      title: "Modelo",
      dataIndex: "modelo",
      filters: [
        {
          text: "SPORTAGE",
          value: "SPORTAGE",
        },
        {
          text: "YARIS",
          value: "YARIS",
        },
        {
          text: "L200",
          value: "L200",
        },
      ],
      onFilter: (value, record) => record.modelo.indexOf(value) === 0,
      sorter: (a, b) => a.modelo - b.modelo,
    },
    {
      title: "Año de Fabricación",
      dataIndex: "fabricacion",
      sorter: (a, b) => a.fabricacion.length - b.fabricacion.length,
    },
    {
      title: "Kilometraje",
      dataIndex: "kms",
      sorter: (a, b) => a.kms.length - b.kms.length,
    },
    {
      title: "Ultima Visita",
      dataIndex: "ultimavisita",
      sorter: (a, b) => a.ultimavisita > b.ultimavisita,
    },
    {
      title: "Propietario",
      dataIndex: "cliente",
      sorter: (a, b) => a.cliente > b.cliente,
    },
    {
      title: "Editar",
      dataIndex: "operation",
      render: (_, record) => (
        <Button
          type="primary"
          onClick={() => {
            console.log("edit!!!");
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
          title={"Estas seguro que deseas remover este Vehiculo?"}
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

  /* Cargar vehiculos al abrir el componente */
  useEffect(() => {
    getVehiculos().then((response) => {
      setVehiculos(response);
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
          Nuevo Vehiculo
        </Button>
        <Button type="primary" icon={<FileExcelOutlined />}>
          Exportar a Excel
        </Button>
      </div>
      <Table
        columns={columns}
        dataSource={vehiculos}
        // onChange={onChange}
      />

      <Modal
        title="Agregar Nuevo Vehiculo"
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
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item style={{ display: "none" }}>
            <Form.Item name="id" noStyle initialValues={vehiculo.id}>
              <Input type="hidden" />
            </Form.Item>
          </Form.Item>
          <Form.Item
            label="Marca"
            name="marca"
            rules={[
              {
                required: true,
                message: "Por favor ingrese la marca del Vehículo",
              },
            ]}
            initialValues={vehiculo.marca}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Modelo"
            name="modelo"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Modelo del Vehículo",
              },
            ]}
            initialValues={vehiculo.modelo}
          >
            <Input />
          </Form.Item>
          <Form.Item
            name="fabricacion"
            label="Año de Fabricación"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Año de Fabricación del Vehículo",
              },
            ]}
            initialValues={vehiculo.fabricacion}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="Kilometraje"
            name="kms"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el kilometraje del vehículo.",
              },
            ]}
            initialValues={vehiculo.kms}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Ultima Visita"
            name="ultimavisita"
            rules={[
              /*{
                type: "date",
                message: "No es una fecha válida!",
              },*/
              {
                required: true,
                message:
                  "Por favor ingrese la fecha de la última visita al taller.",
              },
            ]}
            initialValues={vehiculo.ultimavisita}
            /*value = {vehiculo.ultimavisita}*/
          >
            <DatePicker 
            defaultValue={moment(vehiculo.ultimavisita, dateFormat)} format={dateFormat}
            /*
            defaultvalue = {
              !!vehiculo.ultimavisita?.length
              ? moment(vehiculo.ultimavisita,dateFormat)
              :""
            }
            format={dateFormat}
            */
            />
          </Form.Item>

          <Form.Item
            label="Propietario"
            name="cliente"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el Propietario del vehículo.",
              },
            ]}
            initialValues={vehiculo.cliente}
          >
            <Input />
          </Form.Item>
          <Form.Item
            wrapperCol={{
              offset: 12,
              span: 26,
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
