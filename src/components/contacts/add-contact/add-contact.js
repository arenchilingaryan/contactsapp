import React, { useState } from 'react'
import { PlusSquareOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'
import { addContact } from '../../../reducers/user-reducer'
import axios from 'axios'
import './add-contact.scss'

function AddContact(props) {
  const [addContact, setAddContact] = useState(false)
  const [form, setForm] = useState({
    username: '',
    age: '',
    phone: ''
  })


  const changeAddContactHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const addContactHandler = async (e) => {
    try {
      const body = {
        name: props.user.name,
        id: "",
        contactName: form.username,
        contactAge: form.age,
        phone: form.phone,
        edit: false
      }
      const data = await axios.post(`http://localhost:5000/contacts`, body)
      props.addContact(data.data)
      setAddContact(false)
      props.setSearching('')
      setForm({
        username: '',
        age: '',
        phone: ''
      })
    } catch (e) {
      throw new Error(e)
    }
  }
  return (
    <div className="addContact__wrapper">
      <div className="contacts__edit-container" style={addContact ? { display: 'block' } : { display: 'none' }}>
        <Form
          className="contacts__add"
          name="basic"
          initialValues={{ remember: true }}>
          <h1>Add Contact</h1>
          <Form.Item label="Username" name="username" >
            <Input name="username" onChange={changeAddContactHandler} />
          </Form.Item>
          <Form.Item label="Age" name="age" >
            <Input name="age" onChange={changeAddContactHandler} />
          </Form.Item>
          <Form.Item label="Phone number" name="phone" >
            <Input name="phone" onChange={changeAddContactHandler} />
          </Form.Item>
          <div className="contacts__edit-btn-container">
            <button onClick={addContactHandler} className="contacts__edit-btn">Add</button>
            <button onClick={() => setAddContact(false)} className="contacts__edit-btn">Cancel</button>
          </div>
        </Form>
      </div>
      <PlusSquareOutlined className="contacts__icon-plus" onClick={() => setAddContact(!addContact)} />
    </div>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    addContact: data => dispatch(addContact(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddContact)