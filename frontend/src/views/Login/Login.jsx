import React, { useState } from "react";
import { withRouter, Link } from "react-router-dom";
import { Card, message } from "antd";
import form from "./form";
import { authServices } from "../../services/";
import CustomForm from "../../components/CustomForm/";

import "./styles.css";

const Login = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (values.email !== null && values.password !== null) {
        const response = await authServices.login(values);
        LoginSuccess(response.data);
      }
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const LoginSuccess = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      props.history.push("home");
      setLoading(false);
    }, 2500);
  };

  const onFinishFailed = (error) => {
    console.error(error);
  };

  return (
    <div className="container-login">
      <Card title="Login" bordered={false} width="350" className="custom-card">
        <CustomForm
          titleCard="Login"
          formName="form-login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          items={form}
          loading={loading}
        >
          <Link
            to="/register"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <span style={{ color: "#000" }}> ¿No tienes cuenta? Registrate</span>
          </Link>
        </CustomForm>
      </Card>
    </div>
  );
};

export default withRouter(Login);
