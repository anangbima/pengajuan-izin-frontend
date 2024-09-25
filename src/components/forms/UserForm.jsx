import { TextField } from '@mui/material'
import React from 'react'

const UserForm = () => {
  return (
    <>
      <TextField
          fullWidth
          name='name'
          id='name'
          label='Name'
          variant='outlined'
          sx={{
            mb: 3
          }}
          type='text'
        />

        <TextField
          fullWidth
          name='username'
          id='username'
          label='Username'
          variant='outlined'
          sx={{
            mb: 3
          }}
          type='text'
        />

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

        <TextField
          fullWidth
          name='password_confirmation'
          id='password_confirmation'
          label='Password Confirmation'
          variant='outlined'
          sx={{
            mb: 3
          }}
          type='password'
          autoComplete='on'
        />
    </>
  )
}

export default UserForm