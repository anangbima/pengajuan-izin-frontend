import React from 'react'
import { useAuth } from '../../context/AuthContext'
import Header from '../../components/Header';

const IndexVerifikatorPage = () => {
  const {user} = useAuth();

  return (
    <div>
      <Header page={'Dashboard'}/>

      <div>
        <h1>Selamat Datang Kembali {user.user.username}</h1>
      </div>
    </div>
  )
}

export default IndexVerifikatorPage