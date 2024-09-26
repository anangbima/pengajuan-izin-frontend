import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Card, Divider, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const IndexUserPage = () => {
  const {user} = useAuth();

  return (
    <div>
      <h1>Selamat Datang Kembali, {user.user.name}</h1>

      <Card
        sx={{ mt: 5, p: 3, width: 500}}
      >
        <Typography mb={3} variant='h5'>Izin</Typography>
        <Divider/>
        <div style={{marginTop: 20}}>
          <Link to='/user/izin'>Lihat Selengkapnya</Link>
        </div>
      </Card>
    </div>
  )
}

export default IndexUserPage