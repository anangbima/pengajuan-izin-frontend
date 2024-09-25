import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { Button } from '@mui/material';
import axiosClient from '../../api/axios-client';

const UserLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/'/>
  }

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

  return (
    <div>
      <Link to={'/user/izin'}>Izin</Link>
      <br />
      <Button onClick={handleLogout}>Logout</Button>
      <Outlet/>
    </div>
  )
}

export default UserLayout