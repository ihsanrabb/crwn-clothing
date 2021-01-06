import React from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Homepage from './pages/homepage/homepage.component'
import ShopPage from './pages/shop/shop.component'
import Header from './components/header/header.component'
import SignInAndSignUp from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component'
import Checkout from './pages/checkout/checkout.component'

import { connect } from 'react-redux'
import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
import { selectCollectionForPreview } from './redux/shop/shop.selector'
import { checkUserSession } from './redux/user/user.actions'

class App extends React.Component {

  unsubscribeFromAuth = null

  componentDidMount() {
    const { checkUserSession } = this.props
    checkUserSession()
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth()
  }

  render() {
    return (
      <>
        <Header />
        <Switch>
          <Route exact path='/' component={Homepage} />
          <Route path='/shop' component={ShopPage} />
          <Route exacth path='/checkout' component={Checkout} />
          <Route exact path='/signin' render={() => this.props.currentUser ? <Redirect to='/' /> : <SignInAndSignUp /> } />
        </Switch>
      </>
    )
  }
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App) 