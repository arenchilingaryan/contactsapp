import React from 'react'
import { Route, Redirect } from 'react-router-dom'
import LoginPage from './components/auth/login'
import RegisterPage from './components/auth/register'
import ContactsPage from './components/contacts/contacts'
import Header from './components/header/header'
import SelectButtons from './components/auth/select-buttons'
import { connect } from 'react-redux'

function App(props) {
  if (props.user.name) {
    return (
      <div className="App">
        <Header />
        <Route path="/contacts" component={ContactsPage} />
        <Redirect to="/contacts" />
      </div>
    )
  }
  return (
    <div className="App">
      <Header/>
      <Route exact path="/" component={SelectButtons} />
      <Route path="/login" component={LoginPage} />
      <Route path="/register" component={RegisterPage} />
      <Redirect to="/" />
    </div>
  );
}

function mapStateToProps(state) {
  return {
    user: state.user
  }
}

export default connect(mapStateToProps)(App)
