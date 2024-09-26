import React, { useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from '@mui/material';
import { Navigate } from 'react-router';
import axiosClient from '../../api/axios-client';

const ProfilUserPage = () => {
  const {user} = useAuth();

  const [updatePassDialog, setUpdatePassDialog] = useState(false);

  const [passwordError, setPasswordError] = useState('');
  const [passwordOldError, setPasswordOldError] = useState('');
  const [passwordConfirmationError, setPasswordConfirmationError] = useState('');

  const handleUpdatePassword = () => {
    setUpdatePassDialog(!updatePassDialog)
  }

  return (
    <div>
      <Dialog
        fullWidth={true}
        maxWidth={'sm'}
        open={updatePassDialog}
				onClose={handleUpdatePassword}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // Get Value
						const formData = new FormData(e.currentTarget);
						const formJson = Object.fromEntries(formData.entries()); // Transform ke bentuk Json

            const payload = {
              password: formJson.password,
              password_old: formJson.password_old,
              password_confirmation: formJson.password_confirmation,
            }

            // proses menambah data berita
            axiosClient.post('/update-password/'+user.user.id, payload, {
              headers:{
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              }
            })
              .then(({data}) => {
                // menutup dialog
                handleUpdatePassword();
                localStorage.removeItem('user')
              })
              .catch((error) => {
                const response = error.response;

                if (response.status == 422) {
                  const message = error.response.data.errors;

                  setPasswordError(message.password)
                  setPasswordOldError(message.password_old)
                  setPasswordConfirmationError(message.password_confirmation)
                }
              })
          }
        }}
      >
        <DialogTitle>
          Update Password
        </DialogTitle>

        <DialogContent>

          <TextField
            fullWidth
            name='password_old'
            id='password_old'
            label='Password Old'
            variant='outlined'
            sx={{
              mb: 3,
              mt: 3
            }}
            type='password'
            autoComplete='on'
            error={passwordOldError ? true : false}
            helperText={passwordOldError || ""}
          />

          <TextField
            fullWidth
            name='password'
            id='password'
            label='Password New'
            variant='outlined'
            sx={{
              mb: 3,
            }}
            type='password'
            autoComplete='on'
            error={passwordError ? true : false}
            helperText={passwordError || ""}
          />

          <TextField
            fullWidth
            name='password_confirmation'
            id='password_confirmation'
            label='Password New Confirmation'
            variant='outlined'
            sx={{
              mb: 3
            }}
            type='password'
            autoComplete='on'
            error={passwordConfirmationError ? true : false}
            helperText={passwordConfirmationError || ""}
          />
        </DialogContent>

        <DialogActions>
					<Button onClick={handleUpdatePassword}>Cancel</Button>
					<Button type="submit">Update</Button>
				</DialogActions>
      </Dialog>

      <table>
        <tr>
          <td width={200}>Name</td>
          <td width={40}>:</td>
          <td>{user.user.name}</td>
        </tr>
        <tr>
          <td width={200}>Username</td>
          <td width={40}>:</td>
          <td>{user.user.username}</td>
        </tr>
        <tr>
          <td width={200}>Email</td>
          <td width={40}>:</td>
          <td>{user.user.email}</td>
        </tr>
      </table>
      <br />
      <div>
        <Button variant='outlined' onClick={handleUpdatePassword}>Update Password</Button>
      </div>
    </div>
  )
}

export default ProfilUserPage