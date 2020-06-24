import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import 'antd/dist/antd.css'
import './auth.scss'

function RegisterPage(props) {
  const history = useHistory()
  const [error, setError] = useState(false)
  const [form, setForm] = useState({
    username: '',
    password: ''
  })

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const registerHandler = async () => {
    const candidate = await axios.get(`http://localhost:5000/users?name=${form.username}&password=${form.password}`)
    if (candidate.data.length) {
      return setError(true)
    }
    const body = {
      id: "",
      name: form.username,
      password: form.password,
      contacts: [
          
      ]
  }
    await axios.post(`http://localhost:5000/users`, body)
    history.push('/login')
  }

  return (
    <div className="auth__wrapper">
    <h1>Registeration</h1>
    <h2 className="auth__error" style={error ? {display: 'block'} : {display: 'none'}} >Username is occupied</h2>
      <Form
        onSubmitCapture={registerHandler}
        name="basic"
        initialValues={{
          remember: true,
        }}
      >
        <Form.Item
          label="Username"
          name="username"
          rules={[
            {
              required: true,
              message: 'Please input your username!',
            },
          ]}
        >
          <Input name="username" onChange={changeHandler} />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[
            {
              required: true,
              message: 'Please input your password!',
            },
          ]}
        >
          <Input.Password name="password" onChange={changeHandler} />
        </Form.Item>

        <Form.Item>
          <Button type="primary" htmlType="submit">
            Register
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

export default RegisterPage