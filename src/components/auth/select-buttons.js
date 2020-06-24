import React from 'react'
import { NavLink } from 'react-router-dom'
import './auth.scss'

function SelectButtons() {
  return (
    <div className="select__wrapper">
        <NavLink to="/login"><button className="select__button select__login">Login</button></NavLink>
        <NavLink to="/register"><button className="select__button select__register">Register</button></NavLink>
    </div>
  )
}

export default SelectButtons