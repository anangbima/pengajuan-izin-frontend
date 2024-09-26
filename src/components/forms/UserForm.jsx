import { TextField } from '@mui/material'
import React from 'react'

const UserForm = ({
  usernameError,
  nameError,
  emailError,
  passwordError,
  passwordConfirmationError,
}) => {
  return (
    <>
      <TextField
          fullWidth
          name='name'
          id='name'
          label='Name'
          variant='outlined'
          sx={{
            mb: 3,
            mt: 3
          }}
          type='text'
          error={nameError ? true : false}
          helperText={nameError || ""}
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
          error={usernameError ? true : false}
          helperText={usernameError || ""}
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
          error={emailError ? true : false}
          helperText={emailError || ""}
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
          error={passwordError ? true : false}
          helperText={passwordError || ""}
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
          error={passwordConfirmationError ? true : false}
          helperText={passwordConfirmationError || ""}
        />
    </>
  )
}

export default UserForm