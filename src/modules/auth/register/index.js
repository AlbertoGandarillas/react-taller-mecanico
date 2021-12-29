import { Fragment } from "react";
import { Form, Input, Button, Checkbox, Select } from "antd";
export function Register() {

  const { Option } = Select;

  const formItemLayout = {
    labelCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 8,
      },
    },
    wrapperCol: {
      xs: {
        span: 24,
      },
      sm: {
        span: 16,
      },
    },
  };
  const tailFormItemLayout = {
    wrapperCol: {
      xs: {
        span: 24,
        offset: 0,
      },
      sm: {
        span: 16,
        offset: 8,
      },
    },
  };

  const [form] = Form.useForm();

  const RegistrationForm = () => {
    const [form] = Form.useForm();
  };
  const onFinish = (values) => {
    console.log("Received values of form: ", values);
  };
  return (
    <Fragment>
      <Form
        {...formItemLayout}
        form={form}
        name="register"
        onFinish={onFinish}
        scrollToFirstError
      >
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
              message: "Por favor ingrese un E-mail!",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Password"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su password!",
            },
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Confirmar Password"
          dependencies={["password"]}
          hasFeedback
          rules={[
            {
              required: true,
              message: "Por favor confirme su password!",
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue("password") === value) {
                  return Promise.resolve();
                }

                return Promise.reject(
                  new Error("Los passwords que ha ingresado no coinciden!")
                );
              },
            }),
          ]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="phone"
          label="Telefono"
          rules={[
            {
              required: true,
              message: "Por favor ingrese su numero telefonico!",
            },
          ]}
          
        >
            <Input/>
        </Form.Item>

        <Form.Item
          name="gender"
          label="Genero"
          rules={[
            {
              required: true,
              message: "Por favor indique su genero!",
            },
          ]}
        >
          <Select placeholder="Seleccione su genero">
            <Option value="male">Masculino</Option>
            <Option value="female">Femenino</Option>
            <Option value="other">Other</Option>
          </Select>
        </Form.Item>

        <Form.Item
          name="agreement"
          valuePropName="checked"
          rules={[
            {
              validator: (_, value) =>
                value
                  ? Promise.resolve()
                  : Promise.reject(new Error("Debe aceptar el acuerdo")),
            },
          ]}
          {...tailFormItemLayout}
        >
          <Checkbox>
            He leido las <a href="">politicas</a> y estoy de acuerdo.
          </Checkbox>
        </Form.Item>
        <Form.Item {...tailFormItemLayout}>
          <Button type="primary" htmlType="submit">
            Registrar
          </Button>
        </Form.Item>
      </Form>
    </Fragment>
  );
}
