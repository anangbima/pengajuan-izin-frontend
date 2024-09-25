import { Box, Button, TextField, Typography } from '@mui/material'
import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axiosClient from '../../api/axios-client'
import { useAuth } from '../../context/AuthContext'
import UserForm from '../../components/forms/UserForm'

const SignUpPage = () => {
  const { user, setUser, csrfToken } = useAuth();
  const navigate = useNavigate();

  const _handleSignUp = async (e) => {
    e.preventDefault();

    const {name, username, email, password, password_confirmation} = e.target.elements;

    const payload = {
      name : name.value,
      username : username.value,
      email : email.value,
      password : password.value,
      password_confirmation : password_confirmation.value,
      role : 'user',
      status : 'not verify'
    }

    axiosClient.post('/sign-up', payload)
      .then(({data}) => {
        // setUser(data.user)
        navigate('/not-verify');
      })
      .catch((error) => {
        const response = error.response;
      })
  }

  return (
    <div >
      <Typography
        variant='h4'
        mb={4}
      >
        Sign Up
      </Typography>

      <form onSubmit={_handleSignUp}>
        <UserForm/>

        <Button
          fullWidth
          variant='contained'
          sx={{
            mt: 2
          }}
          type='submit'
        >
          Submit
        </Button>

        <Box 
          fullWidth 
          mt={3}
          textAlign={'center'}
        >
          <Typography>Already have an account ? <Link to={'/sign-in'}>Sign in</Link></Typography>
        </Box>
      </form>
    </div>
  )
}

export default SignUpPage