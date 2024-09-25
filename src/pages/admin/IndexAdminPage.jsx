import React from 'react'
import Header from '../../components/Header'
import { useAuth } from '../../context/AuthContext';

const IndexAdminPage = () => {
  const {user} = useAuth();

  return (
    <div>
      <Header page='Dashboard'/>

      <div>
        <h1>Selamat Datang Kembali {user.user.username}</h1>
      </div>
    </div>
  )
}

export default IndexAdminPage