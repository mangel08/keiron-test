import React, { useState } from 'react'
import { Button, Form, Card } from 'antd'
import API from '../../util/api'
import form from './form'

import CustomForm from '../../components/CustomForm/';

import "./styles.css"

console.log(form)

const api = new API();

const Login = () => {

  const [loading, setLoading] = useState(false)

  const onFinish = async (values) => {
    
    try {
      console.log(values)
      setLoading(true)
      const response = await api.post("auth/login", values)
      console.log(response)
      setLoading(false)
    } catch (error) {
      console.log(error)
      setLoading(false)
    }

  }

  const onFinishFailed = (error) => {
    console.error(error)
  }

  return (
    <div className="container-login">
      <Card title="Login" bordered={false} className="login-card">
        <CustomForm 
          titleCard="Login"
          formName="form-login"
          onFinish={onFinish}
          onFinishFailed={onFinishFailed}
          items={form}
          loading={loading}
        >
          <div style={{ display: 'flex', alignItems: "center", justifyContent: "center", marginTop: "5px"}}>
            <a href="" style={{ color: "#000" }}> or register now!</a>
          </div>
        </CustomForm>
      </Card>
    </div>
  )
}

export default Login
