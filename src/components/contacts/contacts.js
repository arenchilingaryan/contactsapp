import React, { useState, useEffect, useCallback } from 'react'
import {
  SortDescendingOutlined
} from '@ant-design/icons'
import { Input } from 'antd'
import { connect } from 'react-redux'
import { setContacts, setSearch } from '../../reducers/user-reducer'
import AddContact from './add-contact/add-contact'
import axios from 'axios'
import './contacts.scss'
import ContactsElements from './contacts-elements/contacts-elements'




function ContactsPage(props) {
  const [search, setSearch] = useState('')
  

  const initialData = useCallback (async () => {
    try {
      const res = await axios.get(`http://localhost:5000/contacts?name=${props.user.name}`)
      props.setContacts(res.data)
      props.setSearch(res.data)
    } catch (e) {
      throw new Error(e)
    }
},[])

  useEffect(() => {
    initialData()
  }, [initialData])

  const sortDescendingOutlined = () => {
    const sort = props.user.search.sort((a, b) => a.age > b.age ? 1 : -1)
    props.setSearch(sort)
  }

  useEffect(() => {
    if (props.user.contacts) {
      let result = props.user.contacts.filter((item) => {
        return item.contactName.toLowerCase().indexOf(search.toLowerCase()) > -1;
      })
      props.setSearch(result)
    }
  }, [search])

  const changeSearch = (e) => {
    const term = e.target.value
    setSearch(term)
    if (term.length === 0) {
      return props.user.contacts
    }
  }

  return (
    <div className="contacts__wrapper">

      <h1 className="contacts__title">Contacts</h1>
      <AddContact setSearching={setSearch}/>
      <Input.Search onChange={changeSearch} placeholder="search" enterButton className="contacts__search" />
      <SortDescendingOutlined className="sorting__icon" onClick={sortDescendingOutlined} />
      <ContactsElements />
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
    setContacts: data => dispatch(setContacts(data)),
    setSearch: data => dispatch(setSearch(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(ContactsPage)