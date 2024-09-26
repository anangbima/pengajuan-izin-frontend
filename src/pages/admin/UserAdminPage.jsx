import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axios-client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Paper, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import UserForm from '../../components/forms/UserForm';
import Header from '../../components/Header';

const UserAdminPage = () => {
  const {user} = useAuth();

  const [maxWidth, setMaxWidth] = useState('sm');
  const [fullWidth, setFullWidth] = useState(true);

  const [userData, setUserData] = useState([])
  const [addDialog, setAddDialog] = useState(false); // Manage modal tambah
  const [roleDialog, setRoleDialog] = useState(false); 
  const [id, setId] = useState(0);

  const [nameError, setNameError] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  useEffect(() => {
    getUser()
  }, [])

  // Handle buka modal tambah
	const handleAddDialog = () => {
    setAddDialog(!addDialog);
	};

  const handleRoleDialog = (id) => {
    setRoleDialog(!roleDialog)
    setId(id)
  }

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

      <Button
        variant='outlined'
        onClick={handleAddDialog}
      >
        Add User Verifikator
      </Button>

      {/* Dialog Tambah */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={addDialog}
				onClose={handleAddDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // Get Value
						const formData = new FormData(e.currentTarget);
						const formJson = Object.fromEntries(formData.entries()); // Transform ke bentuk Json

            const payload = {
              name: formJson.name,
              username: formJson.username,
              email: formJson.email,
              password: formJson.password,
              password_confirmation: formJson.password_confirmation,
              role : 'verifikator',
              status : 'verify'
            }

            // proses menambah data berita
            axiosClient.post('/sign-up', payload, {
              headers:{
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              }
            })
              .then(({data}) => {
                // menutup dialog
                handleAddDialog();

                // refresh data
                getUser()
              })
              .catch((error) => {
                const response = error.response;

                if (response.status == 422) {
                  const message = error.response.data.errors;

                  setNameError(message.name)
                  setUsernameError(message.username)
                  setEmailError(message.email)
                  setPasswordError(message.password)
                  setPasswordConfirmationError(message.password_confirmation)
                }
              })
          }
        }}
      >
        <DialogTitle>
          Tambah User Verifikator
        </DialogTitle>

        <DialogContent>
          <UserForm
            nameError={nameError}
            usernameError={usernameError}
            emailError={emailError}
            passwordError={passwordError}
            passwordConfirmationError={passwordConfirmationError}
          />
        </DialogContent>

        <DialogActions>
					<Button onClick={handleAddDialog}>Cancel</Button>
					<Button type="submit">Add</Button>
				</DialogActions>
      </Dialog>

      {/* Dialog Change Role */}
      <Dialog
        open={roleDialog}
        onClose={handleRoleDialog}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();

            axiosClient.post('/change-role/'+id, {}, {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              },
            })
              .then(({data}) => {
                // menutup dialog
                handleRoleDialog();

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
        <DialogTitle>Change Role</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Apakah Yakin Ingin Mengubah Role User ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleRoleDialog}>Cancel</Button>
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
                  {user.role == 'user' 
                    ? <Button onClick={() => handleRoleDialog(user.id)} variant='outlined'>Change to Verifikator</Button>
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

export default UserAdminPage