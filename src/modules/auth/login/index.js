import { useState,Fragment } from "react";
import { Form, Input, Button } from "antd";
import axios from "axios";
export function AuthLogin() {
  const [user, setUser] = useState([
    {
      username: "",
      password: "",
    },
  ]);
  const base_url = "https://api-grupob-customers-login.herokuapp.com/login"
  /* Insertar cliente en JSON */
  const authUser = async (user) => {
    try {
      axios.post(base_url, user).then(function(response) {
        console.log(response);
        console.log(response.data);
      }).catch(function(error) {
        console.log('Error on Authentication');
      });
    } catch (err) {
      console.log("err", err);
      alert("no se pudo registrar intente denuevo");
    }
  };  
  const [form] = Form.useForm();
  const onFinish = async (fieldsValue) => {
    const { username, password } = fieldsValue;
    console.log(fieldsValue);
    await authUser({
      username,
      password
    });
  };
  const onFinishFailed = (err) => {
    console.log("err", err);
  };
  return (
    <Fragment>
      <div className="container">
        <div className="login">
          <Form
            form={form}
            name="basic"
            labelCol={{ span: 8 }}
            wrapperCol={{ span: 16 }}
            initialValues={{ remember: true }}
            autoComplete="off"
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
          >
            <Form.Item
              label="Usuario"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
              initialValues={user.username}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
              initialValues={user.password}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
              <Button type="primary" htmlType="submit">
                Ingresar
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </Fragment>
  );
}
