import React, { Fragment } from "react";
import { Link, withRouter } from "react-router-dom";
import { Layout, Typography, Button } from "antd";
import { PoweroffOutlined } from "@ant-design/icons";
import { authServices } from "../../services/";
import logo from "./logo.svg";
import "./style.css";

const { Header, Content, Footer } = Layout;

const { Title } = Typography;

const LayoutContainer = (props) => {
  const redirectLogout = async () => {
    const response = await authServices.logout();
    props.history.push("/login");
  };
  const enableLogoutButton = () => {
    if (authServices.isLoggedIn()) {
      return (
        <Fragment>
          <Button
            type="danger"
            id="logout-button"
            onClick={() => redirectLogout()}
            shape="circle"
            title="Cerrar Sesión"
            icon={<PoweroffOutlined />}
            size="large"
          />
        </Fragment>
      );
    }
  };

  return (
    <Layout className="layout">
      <Header className="header" style={{ background: "#FFF" }}>
        <div className="flex-container">
          <Title className="main-title" className="header-brand-logo">
            <img src={logo} alt="Keiron Logo" width="100" />
          </Title>
          {enableLogoutButton()}
        </div>
      </Header>

      <Content id="content">{props.children}</Content>

      <Footer style={{ textAlign: "center" }}>Keiron Test ©2020 Creado por Miguelangel Palma</Footer>
    </Layout>
  );
};

export default withRouter(LayoutContainer);
