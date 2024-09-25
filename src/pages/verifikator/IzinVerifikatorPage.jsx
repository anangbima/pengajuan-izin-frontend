import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axios-client';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

const IzinVerifikatorPage = () => {
  const {user} = useAuth();

  const [izin, setIzin] = useState([]);

  useEffect(() => {
    getIzin()
  }, [])

  const getIzin = () => {
    axiosClient.get('/izin', {
      headers: {
        'Authorization' : 'Bearer ' + user.token
      }
    }).then(({data}) => {
      setIzin(data.izin)
      console.log(data.izin)
    }).catch((error) => {
      const response = error.response;
      console.log(response)
    })
  }

  return (
    <div>
      <h3>Data Izin</h3>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Judul</TableCell>
              <TableCell align="right">Jenis</TableCell>
              <TableCell align="right">Isi</TableCell>
              <TableCell align="right">Status</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {izin.map((izin) => (
              <TableRow
                key={izin.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {izin.user.name}
                </TableCell>
                <TableCell align="right">{izin.judul}</TableCell>
                <TableCell align="right">{izin.jenis}</TableCell>
                <TableCell align="right">{izin.isi}</TableCell>
                <TableCell align="right">{izin.status}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default IzinVerifikatorPage