import { Box, Button, Stack, TextField, Typography } from '@mui/material'
import React from 'react'
import axiosClient from '../../api/axios-client';
import { useAuth } from '../../context/AuthContext';
import { Link, useNavigate } from 'react-router-dom';

const SignInPage = () => {
  const { user, setUser, csrfToken } = useAuth();
  const navigate = useNavigate();

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