import React from 'react'
import { Navigate, Outlet, useNavigate } from 'react-router'
import { useAuth } from '../../context/AuthContext'
import { Link } from 'react-router-dom';
import { Button, Container, IconButton } from '@mui/material';
import axiosClient from '../../api/axios-client';
import '../css/UserLayout.scss'
import { IoMdLogOut } from "react-icons/io";

const UserLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/'/>
  }

  const navigate = useNavigate();

  const handleLogout = () => {
    axiosClient.post('/sign-out', {} ,{
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
      .then(({data}) => {
        localStorage.removeItem('user')
        window.location.reload()
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  return (
    <div className='user-layout'>
      {/* <Link to={'/user/izin'}>Izin</Link>
      <br />
      <Button onClick={handleLogout}>Logout</Button> */}
      
      <Container>
        <div className='navbar'>
          <h3>
            Pengajuan Izin App
          </h3>

          <div>
            <Link to={'/user/profil'}>{user.user.name}</Link>
            <IconButton onClick={handleLogout} sx={{marginLeft: 1}}>
              <IoMdLogOut />
            </IconButton>
          </div>
        </div>

        <Outlet/>
      </Container>
      
    </div>
  )
}

export default UserLayout