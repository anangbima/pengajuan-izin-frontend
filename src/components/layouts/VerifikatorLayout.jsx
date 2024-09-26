import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axiosClient from '../../api/axios-client';
import Sidebar from '../Sidebar';

const VerifikatorLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/'/>
  }

  return (
    <div className='admin-layout'>
      {/* <Link to={'/admin/user'}>User</Link>
      <br />
      <Link to={'/admin/izin'}>Izin</Link>
      <br />
      <Button onClick={handleLogout}>Logout</Button> */}

      <Sidebar role={'verifikator'}/>

      <div className='content-admin'>
        <Outlet/>
      </div>
    </div>
  )
}

export default VerifikatorLayout