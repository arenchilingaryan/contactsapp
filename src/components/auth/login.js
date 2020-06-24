import React, { useState } from 'react'
import { Form, Input, Button } from 'antd'
import axios from 'axios'
import { connect } from 'react-redux'
import { setUser } from '../../reducers/user-reducer'
import 'antd/dist/antd.css'
import './auth.scss'

function LoginPage(props) {
  const [form, setForm] = useState({
    username: '',
    password: ''
  })
  const [error, setError] = useState(false)

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

 
  const loginHandler = async () => {
    try {
      const data = await axios.get(`http://localhost:5000/users?name=${form.username}&password=${form.password}`)
      if (!data.data.length) {
        return setError(true)
      }
      setError(false)
      props.setUser(...data.data)
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <div className="auth__wrapper">
    <h1>Login</h1>
      <h1 className="auth__error" style={error ? { display: 'block' } : { display: 'none' }}>Incorrect Data</h1>
      <Form
        onSubmitCapture={loginHandler}
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
            Login
        </Button>
        </Form.Item>
      </Form>
    </div>
  )
}

function mapStateToProps(state) {
  return {

  }
}
function mapDispatchToProps(dispatch) {
  return {
    setUser: data => dispatch(setUser(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LoginPage)