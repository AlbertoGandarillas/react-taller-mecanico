import "./toolbar.scss";
import React, { useState } from "react";
import { Button, Modal, Form, Input, Select, InputNumber } from "antd";
import { AppstoreAddOutlined, FileExcelOutlined } from "@ant-design/icons";

export function CustomerToolbar() {
  const [isModalVisible, setIsModalVisible] = useState(false);

  const addCustomer = async (customer) => {
    try {
      await fetch("http://localhost:3000/customers", {
        method: "POST",
        body: JSON.stringify(customer),
        headers: {
          "Content-Type": "application/json",
        },
      });
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente denuevo");
    }
  };

  const onFinish = async (fieldsValue) => {
    const { key, name, lastName, phone, email, document } = fieldsValue;

    await addCustomer({
      key,
      name,
      lastName,
      phone,
      email,
      document,
    });
    // const responseTodo = await getTodo();
    // setTodo(responseTodo);
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };

  const showModal = () => {
    setIsModalVisible(true);
  };

  const handleOk = () => {
    setIsModalVisible(false);
  };

  const handleCancel = () => {
    setIsModalVisible(false);
  };
  const { Option } = Select;
  const prefixSelector = (
    <Form.Item name="prefix" noStyle>
      <Select style={{ width: 70 }}>
        <Option value="1">+1</Option>
        <Option value="01">+01</Option>
      </Select>
    </Form.Item>
  );
  return (
    <div className="customer-toolbar">
      <Button type="primary" icon={<AppstoreAddOutlined />} onClick={showModal}>
        Nuevo Cliente
      </Button>
      <Button type="primary" icon={<FileExcelOutlined />}>
        Exportar a Excel
      </Button>

      <Modal
        title="Agregar Nuevo Cliente"
        visible={isModalVisible}
        onOk={handleOk}
        onCancel={handleCancel}
      >
        <Form
          labelCol={{ span: 6 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
        >
          <Form.Item
            label="Nombres"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el nombre",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item 
            label="Apellidos"
            rules={[
              {
                required: true,
                message: "Por favor ingrese el apellido",
              },
            ]}            
            >
            <Input />
          </Form.Item>
          <Form.Item
            name="phone"
            label="Telefono"
            rules={[
              { required: true, message: "Por favor ingrese el nro. telefonico" },
            ]}
          >
            <Input addonBefore={prefixSelector} style={{ width: "100%" }} />
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
          >
            <Input />
          </Form.Item>
          <Form.Item label="Tipo Documento">
            <Select>
              <Select.Option value="demo">DNI</Select.Option>
              <Select.Option value="demo">Pasaporte</Select.Option>
            </Select>
          </Form.Item>
          <Form.Item label="Nro. Documento">
            <Form.Item name="input-number" noStyle>
              <InputNumber min={1} max={10} />
            </Form.Item>
          </Form.Item>
        </Form>
      </Modal>
    </div>
  );
}
