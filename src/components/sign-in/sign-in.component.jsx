import React from 'react'
import './sign-in.styles.scss'
import { connect } from 'react-redux'
import FormInput from '../form-input/form-input.component'
import CustomButton from '../custom-button/custom-button.component'
import { googleSignInStart, emailSignInStart } from '../../redux/user/user.actions' 

const SignIn = ({emailSignInStart, googleSignInStart}) => {
  const [userCredentials, setCredentials] = React.useState({
    email: '',
    password: ''
  })
  const {email, password} = userCredentials

  const handleSubmit = async event => {
    event.preventDefault()
    emailSignInStart(email, password)
  }

  const handleChange = event => {
    const {value, name} = event.target
    setCredentials({...userCredentials, [name]: value})
  }

  return (
    <div className="sign-in">
      <h2>I already have an account</h2>
      <span>Sign in with your email</span>
      <form onSubmit={handleSubmit}>
        <FormInput 
          name='email' 
          type='email' 
          value={email} 
          handleChange={handleChange}
          label='Email'
          required
        />
        <FormInput 
          name='password' 
          type='password' 
          value={password} 
          handleChange={handleChange}
          label='Password'
          required 
        />

        <div className="buttons">
          <CustomButton type='submit'>Sign in</CustomButton>
          <CustomButton 
            type='button' 
            onClick={googleSignInStart} 
            isGoogleSignIn
          >Signin with google</CustomButton>
        </div>
      </form>
    </div>
  )
  
}

const mapDispatchToProps = dispatch => ({
  googleSignInStart: () => dispatch(googleSignInStart()),
  emailSignInStart: (email, password) => dispatch(emailSignInStart({email, password}))
})

export default connect(null, mapDispatchToProps)(SignIn)