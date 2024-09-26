import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axios-client';
import Sidebar from '../Sidebar';
import '../css/AdminLayout.scss'

const AdminLayout = () => {
  const {user} = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const navigate = useNavigate()

  if (!user) {
    return <Navigate to='/'/>
  }

  useEffect(() => {
    if(setIsLoggedOut == true) {
      navigate('/')
    }
  }, [])

  return (
    <div className='admin-layout'>
      {/* <Link to={'/admin/user'}>User</Link>
      <br />
      <Link to={'/admin/izin'}>Izin</Link>
      <br />
      <Button onClick={handleLogout}>Logout</Button> */}

      <Sidebar role={'admin'}/>

      <div className='content-admin'>
        <Outlet/>
      </div>
    </div>
  )
}

export default AdminLayout