import { Button, TextField } from '@mui/material'
import React from 'react'
import axiosClient from '../../api/axios-client';
import { useAuth } from '../../context/AuthContext';

const SignInPage = () => {
  const {user, setUser, csrfToken} = useAuth();

  const _handleSignIn = async(e) => {
    e.preventDefault();

    const {email, password} = e.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    }

    // csrfToken();
    // console.log('csrf token', csrfToken())

    axiosClient.post('/sign-in', payload)
      .then(({data}) => {
        console.log('response login ', data)
        setUser(data.user)
        
      })
      .catch((error) => {
        const response = error.response;
      })
  }

  return (
    <div style={{
      width: 500
    }}>
      <h1>Hai login dulu yuk</h1>
      
      <form onSubmit={_handleSignIn}>
        <TextField
          fullWidth
          name='email'
          id='email'
          label='Email'
          variant='outlined'
          sx={{
            mb: 3
          }}
          type='email'
        />

        <TextField
          fullWidth
          name='password'
          id='password'
          label='Password'
          variant='outlined'
          sx={{
            mb: 3
          }}
          type='password'
          autoComplete='on'
        />

          <Button
            fullWidth
            variant='contained'
            sx={{
              mt: 1
            }}
            type='submit'
          >
            Login
          </Button>
      </form>
    </div>
  )
}

export default SignInPage