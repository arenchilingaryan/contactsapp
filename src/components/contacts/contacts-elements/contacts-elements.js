import React, { useState } from 'react'
import { EditOutlined, DeleteOutlined } from '@ant-design/icons'
import { Form, Input } from 'antd'
import { connect } from 'react-redux'
import { setEdit, deleteContact } from '../../../reducers/user-reducer'
import axios from 'axios'
import './contacts-elements.scss'

function ContactsElements(props) {
  const [form, setForm] = useState({
    username: '',
    age: '',
    phone: ''
  })

  const openEdit = (id) => {
    props.setEdit(id)
  }
  const deleteItem = async (id) => {
    await axios.delete(`http://localhost:5000/contacts/${id}`)
    props.deleteContact(id)
  }



  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value
    })
  }

  const editHandler = async (id) => {
    const body = {
      contactName: form.username,
      contactAge: form.age,
      phone: form.phone
    }

    await axios.patch(`http://localhost:5000/contacts/${id}`, body)
    props.setEdit(id)
    props.updateContact(body, id)

    setForm({
      username: '',
      age: '',
      phone: ''
    })
  }
  return (
    <ul className="contacts__container">
      <li className="contacts__item">
        <span>Name</span>
        <span>Age</span>
        <span>Phone</span>
      </li>
      <hr />
      {
        props.user.search
          ?
          props.user.search.map(el => {
            if (!el.edit) {
              return (
                <li key={el.id} className="contacts__item">
                  <span className="contact__name"> {el.contactName ? el.contactName : <div>null</div>} </span>
                  <span className="contact__age"> {el.contactAge ? el.contactAge : <div>null</div>} </span>
                  <span className="contact__age"> {el.phone ? el.phone : <div>null</div>} </span>
                  <EditOutlined className="contacts__icon-edit" onClick={() => openEdit(el.id)} />
                  <DeleteOutlined className="contacts__icon-delete" onClick={() => deleteItem(el.id)} />
                </li>
              )
            }
            return (
              <div key={el.id} className="contacts__edit-container">
                <Form
                  className="contacts__edit"
                  onSubmitCapture={() => editHandler(el.id)}
                  name="basic"
                  initialValues={{ remember: true, }}>
                  <Form.Item label="Username" name="username" >
                    <Input name="username" onChange={changeHandler} />
                  </Form.Item>
                  <Form.Item label="Age" name="age" >
                    <Input name="age" onChange={changeHandler} />
                  </Form.Item>
                  <Form.Item label="Phone number" name="phone" >
                    <Input name="phone" onChange={changeHandler} />
                  </Form.Item>
                  <div className="contacts__edit-btn-container">
                    <button className="contacts__edit-btn">Edit</button>
                    <button onClick={() => props.setEdit(el.id)} className="contacts__edit-btn">Cancel</button>
                  </div>
                </Form>
              </div>
            )
          })
          : null
      }
    </ul>
  )
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}
function mapDispatchToProps(dispatch) {
  return {
    setEdit: id => dispatch(setEdit(id)),
    deleteContact: id => dispatch(deleteContact(id))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsElements)