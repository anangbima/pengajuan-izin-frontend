import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React, { useState } from 'react'
import axiosClient from '../../api/axios-client';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { user, setUser, csrfToken } = useAuth();
  const navigate = useNavigate();

  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');

  const _handleSignIn = async (e) => {
    e.preventDefault();

    const { email, password } = e.target.elements;

    const payload = {
      email: email.value,
      password: password.value,
    }

    // csrfToken();
    // console.log('csrf token', csrfToken())

    axiosClient.post('/sign-in', payload)
      .then(({ data }) => {
        console.log('response login ', data)
        if(data.user['status'] != 'not verify') {
          setUser(data)
        }else{
          navigate('/not-verify')
        }
      })
      .catch((error) => {
        const response = error.response;

        if (response.status == 422) {
          const message = error.response.data.errors;

          setEmailError(message.email)
          setPasswordError(message.password)
        }
      })
  }

  return (
    <div >
      <Typography
        variant='h4'
        mb={4}
      >
        Sign In
      </Typography>

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
          error={emailError ? true : false}
          helperText={emailError || ''}
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
          error={passwordError || false}
          helperText={passwordError || ''}
        />

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
          <Typography>Dont have an account ? <Link to={'/sign-up'}>Sign up</Link></Typography>
        </Box>
      </form>
    </div>
  )
}

export default SignInPage