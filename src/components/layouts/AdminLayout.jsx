import React from 'react'
import { Navigate, Outlet } from 'react-router'
import { useAuth } from '../../context/AuthContext';

const AdminLayout = () => {
  const {user} = useAuth();

  if (!user) {
    return <Navigate to='/'/>
  }

  return (
    <div>
      Admin
      <Outlet/>
    </div>
  )
}

export default AdminLayout