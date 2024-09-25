import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axios-client';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserForm from '../../components/forms/UserForm';

const UserAdminPage = () => {
  const {user} = useAuth();

  const [maxWidth, setMaxWidth] = useState('sm');
  const [fullWidth, setFullWidth] = useState(true);

  const [userData, setUserData] = useState([])
  const [addDialog, setAddDialog] = useState(false); // Manage modal tambah

  useEffect(() => {
    getUser()
  }, [])

  // Handle buka modal tambah
	const handleAddDialog = () => {
    setAddDialog(!addDialog);
	};

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
      <h3>Data User</h3>

      <Button
        variant='outlined'
        onClick={handleAddDialog}
      >
        Add User
      </Button>

      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={addDialog}
				onClose={handleAddDialog}
      >
        <DialogTitle>
          Tambah User Verifikator
        </DialogTitle>

        <DialogContent>
          <UserForm/>
        </DialogContent>

        <DialogActions>
					<Button onClick={handleAddDialog}>Cancel</Button>
					<Button type="submit">Add</Button>
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
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default UserAdminPage