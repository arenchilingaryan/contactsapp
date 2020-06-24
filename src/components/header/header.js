import React, { Fragment } from 'react'
import { connect } from 'react-redux'
import { clearUser } from '../../reducers/user-reducer'
import { useHistory } from 'react-router-dom'
import { Button } from 'antd'
import './header.scss'

function Header(props) {
  const history = useHistory()

  const logoutHandler = () => {
    props.clearUser()
    history.push('/login')
  }

  return (
    <div className="header">
      {
        props.user.name
          ? <div className="header__auth">
            <div className="header__name"> {props.user.name} </div>
            <Button danger onClick={logoutHandler} className="logout">Logout</Button>
          </div>
          : <Fragment>
            <h2 className="header__wellcome">Wellcome To App</h2>
          </Fragment>
      }
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
    clearUser: () => dispatch(clearUser())
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(Header)
