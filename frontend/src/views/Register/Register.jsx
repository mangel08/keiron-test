import React, { useState } from "react";
import { Card } from "antd";
import { withRouter, Link } from "react-router-dom";
import form from "./form";
import { authServices } from "../../services/";
import CustomForm from "../../components/CustomForm/";

const Register = (props) => {
  const [loading, setLoading] = useState(false);

  const onFinish = async (values) => {
    setLoading(true);
    try {
      if (values.email !== null && values.name !== null && values.password !== null) {
        const response = await authServices.register(values);
        RegisterSuccess(response.data);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const RegisterSuccess = (user) => {
    localStorage.setItem("user", JSON.stringify(user));
    setTimeout(() => {
      setLoading(false);
      props.history.push("home");
    }, 2500);
  };

  const onFinishFailed = (error) => {
    console.error(error);
  };

  return (
    <div className="container-login">
      <Card title="Register" bordered={false} width="350" className="custom-card">
        <CustomForm
          formName="form-register"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          items={form}
          loading={loading}
        >
          <Link
            to="/login"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              marginTop: "5px",
            }}
          >
            <span style={{ color: "#000" }}> ¿Tienes cuenta? Inicia sesión </span>
          </Link>
        </CustomForm>
      </Card>
    </div>
  );
};

export default withRouter(Register);
