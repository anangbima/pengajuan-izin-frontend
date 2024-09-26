import { FormControl, InputLabel, MenuItem, Select, TextField } from '@mui/material'
import React from 'react'

const IzinForm = ({
  judulError,
  isiError,
  jenisError,
  judulValue,
  isiValue,
  jenisValue,
}) => {
  return (
    <>
      <TextField
        fullWidth
        name='judul'
        id='judul'
        label='Judul'
        variant='outlined'
        sx={{
          mb: 3,
          mt: 3
        }}
        type='text'
        defaultValue={judulValue ? judulValue : ''}
        error={judulError ? true : false}
        helperText={judulError || ""}
      />

      <TextField
        fullWidth
        name='isi'
        id='isi'
        label='Isi'
        variant='outlined'
        sx={{
          mb: 3
        }}
        type='text'
        multiline
        rows={4}
        maxRows={10}
        defaultValue={isiValue ? isiValue : ''}
        error={isiError ? true : false}
        helperText={isiError || ""}
      />

      <FormControl
        fullWidth
        sx={{
          mb: 3
        }}
      >
        <InputLabel id='jenis-label'>Jenis</InputLabel>
        <Select
          required
          labelId='jenis-label'
          id='jenis'
          name='jenis'
          label='jenis'
          defaultValue={jenisValue ? jenisValue : 'cuti'}
          error={jenisError ? true : false}
          helperText={jenisError || ""}
          // onChange={}
        >
          <MenuItem value='cuti'>Cuti</MenuItem>
          <MenuItem value='sakit'>Sakit</MenuItem>
          <MenuItem value='lainnya'>Lainnya</MenuItem>
        </Select>
      </FormControl>
    </>
  )
}

export default IzinForm