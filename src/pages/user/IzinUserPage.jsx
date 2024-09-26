import React, { useEffect, useState } from 'react'
import { useAuth } from '../../context/AuthContext';
import axiosClient from '../../api/axios-client';
import { Button, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, TextField } from '@mui/material';
import IzinForm from '../../components/forms/IzinForm';
import { CiEdit } from "react-icons/ci";
import { FaRegEye } from "react-icons/fa6";
import { MdOutlineDeleteOutline } from "react-icons/md";

const IzinUserPage = () => {
  const {user} = useAuth();

  const [maxWidth, setMaxWidth] = useState('sm');
  const [fullWidth, setFullWidth] = useState(true);

  const [izin, setIzin] = useState([]);
  const [addDialog, setAddDialog] = useState(false);
  const [editDialog, setEditDialog] = useState(false);
  const [deleteDialog, setDeleteDialog] = useState(false);
  const [id, setId] = useState('');

  const [judulValue, setJudulValue] = useState('');
  const [jenisValue, setJenisValue] = useState('');
  const [isiValue, setIsiValue] = useState('');

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
    // getIzinbyId(id)
    if (editDialog === true) {
      setEditDialog(false)
    }else{
      getIzinbyId(id)
    }
	};

  const handltDeleteDialog = (id) => {
    setDeleteDialog(!deleteDialog);
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

  const getIzinbyId = (id) => {
    // console.log('iddIzin', id)
    axiosClient.get('/izin/'+id, {
      headers: {
        'Authorization' : 'Bearer ' + user.token
      }
    }).then(({data}) => {

      // setId(data.izin.id)
      setJudulValue(data.izin.judul)
      setJenisValue(data.izin.jenis)
      setIsiValue(data.izin.isi)

      // console.log('judul', data.izin.judul)

      setEditDialog(true);

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
                // menampilkan validasi
                if (error.response && error.response.status === 422) {
                  const message = error.response.data.message;
                }
              })
          }
        }}
      >
        <DialogTitle>
          Tambah Izin
        </DialogTitle>

        <DialogContent>
          <IzinForm/>
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
            axiosClient.put('/izin/'+id, payload, {
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

      <TableContainer>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Judul</TableCell>
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
                <TableCell >{izin.judul}</TableCell>
                <TableCell align="right">{izin.jenis}</TableCell>
                <TableCell align="right">{izin.isi}</TableCell>
                <TableCell align="right">{izin.status}</TableCell>
                <TableCell align="right">
                  <IconButton >
                    <FaRegEye />
                  </IconButton>

                  <IconButton onClick={() => handleEditDialog(izin.id)}>
                    <CiEdit />
                  </IconButton>
                  
                  <IconButton onClick={() => handltDeleteDialog(izin.id)}>
                    <MdOutlineDeleteOutline />
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

export default IzinUserPage