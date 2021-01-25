import React, { lazy, Suspense } from 'react'
import './App.css'
import { Switch, Route, Redirect } from 'react-router-dom'
import Header from './components/header/header.component'
import Spinner from './components/spinner/spinner.component'
import { connect } from 'react-redux'
import { selectCurrentUser } from './redux/user/user.selector'
import { createStructuredSelector } from 'reselect'
import { selectCollectionForPreview } from './redux/shop/shop.selector'
import { checkUserSession } from './redux/user/user.actions'
import ErrorBoundary from './components/error-boundary/error-boundary.component'

const HomePage = lazy(() => import('./pages/homepage/homepage.component'))
const ShopPage = lazy(() => import('./pages/shop/shop.component'))
const Checkout = lazy(() => import('./pages/checkout/checkout.component'))
const SignInAndSignUp = lazy(() => import('./pages/sign-in-and-sign-up/sign-in-and-sign-up.component'))

const App = ({checkUserSession, currentUser}) => {

  React.useEffect(() => {
    checkUserSession()
  }, [checkUserSession])

  return (
    <>
      <Header />
      <Switch>
        <ErrorBoundary>
          <Suspense fallback={<Spinner />}>
            <Route exact path='/' component={HomePage} />
            <Route path='/shop' component={ShopPage} />
            <Route exacth path='/checkout' component={Checkout} />
            <Route exact path='/signin' render={() => currentUser ? <Redirect to='/' /> : <SignInAndSignUp /> } />
          </Suspense>
        </ErrorBoundary>
      </Switch>
    </>
  )
}

const mapStateToProps = createStructuredSelector ({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

export default connect(mapStateToProps, mapDispatchToProps)(App) 