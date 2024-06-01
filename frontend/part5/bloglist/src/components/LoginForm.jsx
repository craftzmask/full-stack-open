import { useContext } from "react";
import PropTypes from "prop-types";
import { Button, Form, Input } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import loginService from "../services/login";
import blogService from "../services/blogs";
import UserContext from "../reducers/UserReducer";

const LoginForm = ({ notify }) => {
  const [user, userDispatch] = useContext(UserContext)

  const login = async (values) => {
    const { username, password } = values
    try {
      const user = await loginService.login({ username, password });
      localStorage.setItem("user", JSON.stringify(user));
      userDispatch({ type: "SET", payload: user })
      blogService.setToken(user.token);
      notify("logged in successful", "success");
    } catch (error) {
      notify(error.response.data.error, "error");
    }
  };

  return (
    <Form
      style={{ minWidth: 400 }}
      onFinish={login}
    >
      <Form.Item
        name="username"
        rules={[
          {
            required: true,
            message: "Please input your username!"
          }
        ]}
      >
        <Input
          prefix={<UserOutlined className="site-form-item-icon" />}
          placeholder="Username"
          data-testid="username" />
      </Form.Item>

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: "Please input your password!"
          }
        ]}
      >
        <Input
          prefix={<LockOutlined className="site-form-item-icon" />}
          type="password"
          placeholder="Password"
          data-testid="password" />
      </Form.Item>

      <Form.Item>
        <Button type="primary" htmlType="submit" style={{ width: "100%" }}>
          Login
        </Button>
      </Form.Item>
    </Form>
  );
};

LoginForm.propTypes = {
  notify: PropTypes.func.isRequired,
};

export default LoginForm;
