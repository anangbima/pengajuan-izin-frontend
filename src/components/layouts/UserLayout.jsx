import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext'

const UserLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/'/>
  }

  return (
    <div>
      
      <Outlet/>
    </div>
  )
}

export default UserLayout