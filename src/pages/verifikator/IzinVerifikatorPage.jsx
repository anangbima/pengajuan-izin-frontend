import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext'
import axiosClient from '../../api/axios-client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, IconButton, InputLabel, MenuItem, Select, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import Header from '../../components/Header';
import { FaRegEye } from "react-icons/fa6";


const IzinVerifikatorPage = () => {
  const {user} = useAuth();

  const [maxWidth, setMaxWidth] = useState('md');
  const [fullWidth, setFullWidth] = useState(true);

  const [izin, setIzin] = useState([]);
  const [detailIzin, setDetailIzin] = useState([]);
  const [detailIzinUser, setDetailIzinUser] = useState([]);
  const [detailIzinKomentar, setDetailIzinKomentar] = useState([]);

  const [id, setId] = useState('');
  const [detailDialog, setDetailDialog] = useState(false);

  const [isKomentar, setIsKomentar] = useState(false)

  useEffect(() => {
    getIzin()
  }, [])

  const handleDetailDialog = (idValue) => {
    setId(idValue)

    if (detailDialog === true) {
      setDetailDialog(false)
    }else{
      getDetailIzin(idValue)
    }
  }

  const getIzin = () => {
    axiosClient.get('/izin/', {
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

  const getDetailIzin = (idValue) => {
    axiosClient.get('/izin/'+idValue, {
      headers: {
        'Authorization' : 'Bearer ' + user.token
      }
    }).then(({data}) => {
      setDetailIzin(data.izin)
      setDetailIzinUser(data.izin.user)
      setDetailIzinKomentar(data.izin.komentar)
      console.log('setail',data.izin)
      setDetailDialog(true)
    }).catch((error) => {
      const response = error.response;
      console.log(response)
    })
  }

  const handleKomentar = (event) => {
    const value = event.target.value;
    if (value == 'ditolak' || value == 'direvisi'){
      setIsKomentar(!isKomentar);
    }
  }

  const handleResponseIzin = async (e) => {
    e.preventDefault();

    const { status, komentar } = e.target.elements;

    const payload = {
      status : status.value,
      komentar : komentar.value
    }

    axiosClient.post('/update-status-izin/'+id, payload, {
      headers: {
        "Content-Type": "multipart/form-data",
        'Authorization': 'Bearer ' + user.token
      },
    })
      .then(({data}) => {
        // menutup dialog
        handleDetailDialog();

        // merefresh data
        getIzin();
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  return (
    <div>
      <Header page='Izin'/>

      {/* Detail Dialog */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={detailDialog}
				onClose={handleDetailDialog}
      >
        <DialogTitle>
          Detail Izin
        </DialogTitle>

        <DialogContent>
          <div>
            {detailIzinUser.name}
          </div>
          <br />
          <br />
          <div>
            {detailIzin.judul}
          </div>
          <Box sx={{ p: 2, border: '1px solid grey', mt: 2 }}>
            {detailIzin.isi}
          </Box>
          <br />
          <br />
          <b>Komentar</b>
          {detailIzinKomentar.map((k) => (
            <Box sx={{ p: 2, mb: 3, background: '#F5F5F5', mt: 2 }}>
              <Typography color='#BEBEBE' variant='caption'>{k.created_at}</Typography>
              <Typography sx={{mt:1}}>{k.isi}</Typography>
            </Box>
          ))}
          {/* <Button variant='outlined' onClick={() => handleAccIzin(detailIzin.id)}>
            Accept
          </Button> */}
          {detailIzin.status == 'diterima' ||
            <>
              <b>Response</b>
              <br />
              <br />
              <form onSubmit={handleResponseIzin}>
                <FormControl
                  fullWidth
                  sx={{
                    mb: 3
                  }}
                >
                  <InputLabel id='status-label'>Response</InputLabel>
                  <Select
                    required
                    labelId='status-label'
                    id='status'
                    name='status'
                    label='status'
                    onChange={(e) => handleKomentar(e)}
                  >
                    <MenuItem value='ditolak'>Tolak</MenuItem>
                    <MenuItem value='diterima'>Terima</MenuItem>
                    <MenuItem value='direvisi'>Revisi</MenuItem>
                  </Select>

                  {isKomentar && 
                    <TextField
                      fullWidth
                      name='komentar'
                      id='komentar'
                      label='Komentar'
                      variant='outlined'
                      sx={{
                        mt: 3
                      }}
                      type='text'
                      multiline
                      rows={4}
                      maxRows={10}
                    />
                  }

                  <Button 
                    type='submit' 
                    variant='outlined'
                    sx={{
                      mt: 3
                    }}
                  >
                    Send
                  </Button>
                </FormControl>
              </form>
            </>
          }
        </DialogContent>

        {/* <DialogActions>
					<Button onClick={handleDetailDialog}>Cancel</Button>
					<Button type="submit">Add</Button>
				</DialogActions> */}
      </Dialog>

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell align="right">Judul</TableCell>
              <TableCell align="right">Jenis</TableCell>
              <TableCell align="right">Isi</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right">Action</TableCell>
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
                <TableCell align="right">
                  <IconButton onClick={() => handleDetailDialog(izin.id)}>
                    <FaRegEye />
                  </IconButton>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}

export default IzinVerifikatorPage