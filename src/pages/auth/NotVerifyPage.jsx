import { Box, Typography } from '@mui/material'
import React from 'react'
import { Link } from 'react-router-dom'

const NotVerifyPage = () => {
  return (
    <div style={{ miWidth: 500 }}>
      <Typography variant='h4' mt={5} mb={5}>Your account not verified</Typography>
      <Typography>Lorem ipsum dolor sit amet consectetur adipisicing elit. Iusto, iste. Quam, aperiam! Ad blanditiis possimus vero pariatur temporibus minus. Aperiam!</Typography>
      <Typography mt={5}>Try another account <Link to={'/sign-in'}>Sign in</Link></Typography>
    </div>
  )
}

export default NotVerifyPage