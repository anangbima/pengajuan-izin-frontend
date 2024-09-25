import React, { useEffect, useState } from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext';
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axiosClient from '../../api/axios-client';

const AdminLayout = () => {
  const {user} = useAuth();
  const [isLoggedOut, setIsLoggedOut] = useState(false);

  const navigate = useNavigate()

  const handleLogout = () => {
    axiosClient.post('/sign-out', {} ,{
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
      .then(({data}) => {
        localStorage.removeItem('user')
        navigate('/')
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  if (!user) {
    return <Navigate to='/'/>
  }

  useEffect(() => {
    if(setIsLoggedOut == true) {
      navigate('/')
    }
  }, [])

  return (
    <div>
      <Link to={'/admin/user'}>User</Link>
      <br />
      <Link to={'/admin/izin'}>Izin</Link>
      <br />
      <Button onClick={handleLogout}>Logout</Button>
      <Outlet/>
    </div>
  )
}

export default AdminLayout