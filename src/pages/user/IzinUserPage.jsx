import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axios-client';
import { Box, Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField, Typography } from '@mui/material';
import IzinForm from '../../components/forms/IzinForm';
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";
import { FaX } from "react-icons/fa6";
import { grey, pink, red } from '@mui/material/colors';

const IzinUserPage = () => {
  const {user} = useAuth();

  const [maxWidth, setMaxWidth] = useState('sm');
  const [fullWidth, setFullWidth] = useState(true);

  const [izin, setIzin] = useState([]);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [detailDialog, setDetailDialog] = useState(false);
  const [cancelDialog, setCancelDialog] = useState(false);

  const [detailIzin, setDetailIzin] = useState([]);
  const [detailIzinUser, setDetailIzinUser] = useState([]);
  const [detailIzinKomentar, setDetailIzinKomentar] = useState([]);
  const [id, setId] = useState('');

  const [judulValue, setJudulValue] = useState('');
  const [jenisValue, setJenisValue] = useState('');
  const [isiValue, setIsiValue] = useState('');

  const [judulError, setJudulError] = useState('');
  const [jenisError, setJenisError] = useState('');
  const [isiError, setIsiError] = useState('');

  useEffect(() => {
    getIzin()
  }, [])

   // Handle buka modal tambah
	const handleAddDialog = () => {
    setAddDialog(!addDialog);
	};

  const handleEditDialog = (id) => {
    // setEditDialog(!editDialog);
    setId(id)
    // getDetailIzin(id)
    if (editDialog === true) {
      setEditDialog(false)
    }else{
      getDetailIzin(id, 'forUpdate')
    }
	};

  const handleDetailDialog = (idValue) => {
    setId(idValue)

    if (detailDialog === true) {
      setDetailDialog(false)
    }else{
      getDetailIzin(idValue, 'forDetail')
    }
  }

  const handltDeleteDialog = (id) => {
    setDeleteDialog(!deleteDialog);
    setId(id)
	};

  const handltCancelDialog = (id) => {
    setCancelDialog(!cancelDialog);
    setId(id)
	};

  const getIzin = () => {
    axiosClient.get('/izin-user/'+user.user.id, {
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

  const getDetailIzin = (id, _for) => {
    // console.log('iddIzin', id)
    axiosClient.get('/izin/'+id, {
      headers: {
        'Authorization' : 'Bearer ' + user.token
      }
    }).then(({data}) => {

      setDetailIzin(data.izin)
      setDetailIzinUser(data.izin.user)
      setDetailIzinKomentar(data.izin.komentar)

      // setId(data.izin.id)
      setJudulValue(data.izin.judul)
      setJenisValue(data.izin.jenis)
      setIsiValue(data.izin.isi)

      // console.log('judul', data.izin.judul)
      if(_for == 'forUpdate'){
        setEditDialog(true);
      }else{
        setDetailDialog(true);
      }

    }).catch((error) => {
      const response = error.response;
      console.log(response)
    })
  }

  return (
    <div>
      <h1>Data Izin</h1>
      <br />
      <div>Lorem ipsum dolor sit, amet consectetur adipisicing elit. Molestias rerum placeat cumque similique. Tempora tenetur veritatis itaque placeat repellendus omnis.</div>
      <br />

      <Button
        variant='outlined'
        onClick={handleAddDialog}
      >
        Add Izin
      </Button>

      {/* Dialog Tambah Izin */}
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
              judul: formJson.judul,
              isi: formJson.isi,
              jenis: formJson.jenis,
              user_id: user.user.id
            }

            // proses menambah data berita
            axiosClient.post('/izin', payload, {
              headers:{
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              }
            })
              .then(({data}) => {
                // menutup dialog
                handleAddDialog();

                // refresh data
                getIzin()
              })
              .catch((error) => {
                const response = error.response;

                if (response.status == 422) {
                  const message = error.response.data.errors;

                  setJudulError(message.judul)
                  setJenisError(message.jenis)
                  setIsiError(message.isi)
                }
              })
          }
        }}
      >
        <DialogTitle>
          Tambah Izin
        </DialogTitle>

        <DialogContent>
          <IzinForm
            judulError={judulError}
            jenisError={jenisError}
            isiError={isiError}
          />
        </DialogContent>

        <DialogActions>
					<Button onClick={handleAddDialog}>Cancel</Button>
					<Button type="submit">Add</Button>
				</DialogActions>
      </Dialog>

      {/* Dialog hapus Izin */}
      <Dialog
        open={deleteDialog}
        onClose={handltDeleteDialog}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();

            axiosClient.delete('/izin/'+id, {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              },
            })
              .then(({data}) => {
                // menutup dialog
                handltDeleteDialog();

                // merefresh data
                getIzin();
              })
              .catch((error) => {
                const response = error.response;
                console.log(response)
              })
          },
        }}
      >
        <DialogTitle>Hapus Izin</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Apakah Yakin Ingin Menghapus Izin ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handltDeleteDialog}>Cancel</Button>
          <Button type="submit">Yes</Button>
        </DialogActions>
      </Dialog>

      {/* Dialog Edit Izin */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={maxWidth}
        open={editDialog}
				onClose={handleEditDialog}
        PaperProps={{
          component: 'form',
          onSubmit: (e) => {
            e.preventDefault();

            // Get Value
						const formData = new FormData(e.currentTarget);
						const formJson = Object.fromEntries(formData.entries()); // Transform ke bentuk Json

            const payload = {
              judul: formJson.judul,
              isi: formJson.isi,
              jenis: formJson.jenis,
              user_id: user.user.id
            }

            // proses menambah data berita
            axiosClient.post('/update-izin/'+id, payload, {
              headers:{
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              }
            })
              .then(({data}) => {
                // menutup dialog
                handleEditDialog();

                // refresh data
                getIzin()
              })
              .catch((error) => {
                // menampilkan validasi
                if (error.response && error.response.status === 422) {
                  const message = error.response.data.message;
                }
              })
          }
        }}
      >
        <DialogTitle>
          Edit Izin
        </DialogTitle>

        <DialogContent>
          <IzinForm
            judulError={judulError}
            jenisError={jenisError}
            isiError={isiError}
            judulValue={judulValue}
            jenisValue={jenisValue}
            isiValue={isiValue}
          />
        </DialogContent>

        <DialogActions>
					<Button onClick={handleEditDialog}>Cancel</Button>
					<Button type="submit">Edit</Button>
				</DialogActions>
      </Dialog>

      {/* Dialog detail Izin */}
      <Dialog
        fullWidth={fullWidth}
        maxWidth={'lg'}
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
        </DialogContent>

      </Dialog>

      {/* Dialog cancel izin */}
      <Dialog
        open={cancelDialog}
        onClose={handltCancelDialog}
        PaperProps={{
          component: "form",
          onSubmit: (e) => {
            e.preventDefault();

            const payload = {
              status : 'dibatalkan' 
            }

            axiosClient.post('/update-status-izin/'+id, payload, {
              headers: {
                "Content-Type": "multipart/form-data",
                'Authorization': 'Bearer ' + user.token
              },
            })
              .then(({data}) => {
                // menutup dialog
                handltCancelDialog();

                // merefresh data
                getIzin();
              })
              .catch((error) => {
                const response = error.response;
                console.log(response)
              })
          },
        }}
      >
        <DialogTitle>Cancel Izin</DialogTitle>

        <DialogContent>
          <DialogContentText sx={{ mb: 3 }}>
            Apakah Yakin Ingin Meembatalkan Pengajuan Izin ?
          </DialogContentText>
        </DialogContent>

        <DialogActions>
          <Button onClick={handltCancelDialog}>Cancel</Button>
          <Button type="submit">Yes</Button>
        </DialogActions>
      </Dialog>

      <TableContainer sx={{mt: 3}}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
              <TableCell align="right">Jenis</TableCell>
              <TableCell align="right">Isi</TableCell>
              <TableCell align="right">Status</TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {izin.map((izin) => (
              <TableRow
                key={izin.id}
                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
              >
                <TableCell >{izin.judul}</TableCell>
                <TableCell align="right">{izin.jenis}</TableCell>
                <TableCell align="right">{izin.isi}</TableCell>
                <TableCell align="right">{izin.status}</TableCell>
                <TableCell align="right">
                  <IconButton onClick={() => handleDetailDialog(izin.id)}>
                    <FaRegEye />
                  </IconButton>
                </TableCell>
                <TableCell align="right">
                  {izin.status != 'belum diproses' || 
                    izin.status == 'direvisi' ||
                    <IconButton onClick={() => handleEditDialog(izin.id)}>
                      <CiEdit />
                    </IconButton>
                  }
                  
                  <IconButton onClick={() => handltDeleteDialog(izin.id)}>
                    <MdOutlineDeleteOutline />
                  </IconButton>
                </TableCell>
                <TableCell>
                  {izin.status != 'belum diproses' ||
                    izin.status == 'dibatalkan' ||
                    
                      <IconButton onClick={() => handltCancelDialog(izin.id)}>
                      <FaX size={16} />
                      </IconButton>
                    
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

export default IzinUserPage