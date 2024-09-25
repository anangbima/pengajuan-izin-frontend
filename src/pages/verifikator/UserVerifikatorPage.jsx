import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axios-client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import Header from '../../components/Header';

const UserVerifikatorPage = () => {
  const {user} = useAuth();

  const [userData, setUserData] = useState([])
  const [verifikasiDialog, setVerifikasiDialog] = useState(false); 
  const [id, setId] = useState(0);

  const handleVerifikasiDialog = (id) => {
    setVerifikasiDialog(!verifikasiDialog)
    setId(id)
  }

  useEffect(() => {
    getUser()
  }, [])

  const getUser = () => {
    axiosClient.get('/user', {
      headers: {
        'Authorization' : 'Bearer ' + user.token
      }
    }).then(({data}) => {
      setUserData(data.user)
      console.log(data.user)
    }).catch((error) => {
      const response = error.response;
      console.log(response)
    })
  }

  return (
    <div>
      <Header page='User'/>

      {/* Verifikasi Dialog */}
      <Dialog
        open={verifikasiDialog}
        onClose={handleVerifikasiDialog}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();

            const payload = {
              status : 'verify'
            }

            axiosClient.post('/verifikasi-user/'+id, payload, {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              },
            })
              .then(({data}) => {
                // menutup dialog
                handleVerifikasiDialog();

                // merefresh data
                getUser();
              })
              .catch((error) => {
                const response = error.response;
                console.log(response)
              })
          },
        }}
      >
        <DialogTitle>Verifikasi User</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Apakah Yakin Ingin Verifikasi User ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleVerifikasiDialog}>Cancel</Button>
          <Button type="submit">Yes</Button>
        </DialogActions>
      </Dialog>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right">Email</TableCell>
              <TableCell align="right">Username</TableCell>
              <TableCell align="right">Role</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {userData.map((user) => (
              <TableRow
                key={user.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {user.name}
                </TableCell>
                <TableCell align="right">{user.email}</TableCell>
                <TableCell align="right">{user.username}</TableCell>
                <TableCell align="right">{user.role}</TableCell>
                <TableCell align="right">{user.status}</TableCell>
                <TableCell align='right'>
                  {user.status == 'not verify' 
                    ? <Button onClick={() => handleVerifikasiDialog(user.id)} variant='outlined'>Verifikasi</Button>
                    : <div></div>
                  }
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserVerifikatorPage