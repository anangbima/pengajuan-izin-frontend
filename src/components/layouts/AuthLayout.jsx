import React from 'react'
import { useAuth } from '../../context/AuthContext'
import { Navigate, Outlet } from 'react-router';
import '../css/AuthStyle.scss';
import { Card, CardContent, Grid2, Typography } from '@mui/material';
import { MdOutgoingMail } from "react-icons/md";

const AuthLayout = () => {
  const {user, setUser} = useAuth();

  if (user) {
    if (user) {
      if (user['role'] == 'admin') {
        return <Navigate to ='/admin'/>
      }

      if (user['role'] == 'verifikator') {
        return <Navigate to ='/verifikator'/>
      }

      if (user['role'] == 'user') {
        if (user['status'] == 'not verify') {
          return <Navigate to ='not-verify'/>
        }
        return <Navigate to ='/user'/>
      }
    }
  }

  return (
    <div className='auth'>
      <div className="content">
        <Card
          sx={{
            maxWidth: 500,
            p: 4
          }}
          variant='outlined'
        >
          <CardContent>
            <Grid2 container spacing={1} alignItems={'center'} mb={3} >
              <Grid2>
                <MdOutgoingMail />
              </Grid2>
              <Grid2>
                <Typography color="initial">Pengajuan Izin App</Typography>
              </Grid2>
            </Grid2>

            <Outlet/>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}

export default AuthLayout