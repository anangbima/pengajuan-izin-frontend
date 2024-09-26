import React, { useContext, useState } from 'react'
import './css/Navbar.scss'
import { 
  Avatar, 
  Box, 
  Button, 
  Divider, 
  IconButton, 
  ListItemIcon, 
  Menu, 
  MenuItem, 
  Tooltip 
} from '@mui/material'
// import { ThemeContext } from '../../../context/ThemeContext';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';
import PersonAdd from '@mui/icons-material/PersonAdd';
import Settings from '@mui/icons-material/Settings';
import Logout from '@mui/icons-material/Logout';
import { Link, useNavigate } from 'react-router-dom';
import { ThemeContext } from '@emotion/react';
import { useAuth } from '../context/AuthContext';
import axiosClient from '../api/axios-client';

const Navbar = () => {
  const {mode, setMode} = useContext(ThemeContext);
  const {user} = useAuth(); //state untuk mode theme

  const navigate = useNavigate();
  
  // state untuk dropdown profil
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

  // handle click untuk buka profil
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  // handle click untuk tutup profil
  const handleClose = () => {
    setAnchorEl(null);
  };

  // handle theme
  const handleTheme = () =>{
    setMode((currentMode) => (currentMode === 'light' ? 'dark' : 'light'));
  }

  // handle logout
  const handleLogout = () => {
    axiosClient.post('/sign-out', {} ,{
      headers: {
        'Authorization': 'Bearer ' + user.token
      }
    })
      .then(({data}) => {
        localStorage.removeItem('user')
        navigate('/sign-in')
      })
      .catch((error) => {
        const response = error.response;
        console.log(response)
      })
  }

  return (
    // <div className='navbar-admin'>
    //   <div></div>

      <div className='navbar-admin'>
        <Box
          sx={{
            display: 'flex',
            width: '100%',
            alignItems: 'center',
            justifyContent: 'center',
            bgcolor: 'background.default',
            color: 'text.primary',
            borderRadius: 1,
          }}
        >
          <IconButton sx={{ ml: 1 }} onClick={() => handleTheme()} color="inherit">
            {mode === 'light' ? <Brightness7Icon /> : <Brightness4Icon />}
          </IconButton>
        </Box>

        <div>
          {/* Avatar profil */}
          <Tooltip title="Account settings">
            <IconButton
              onClick={handleClick}
              size="small"
              sx={{ ml: 1 }}
              aria-controls={open ? 'account-menu' : undefined}
              aria-haspopup="true"
              aria-expanded={open ? 'true' : undefined}
            >
              <Avatar sx={{ width: 32, height: 32 }}>A</Avatar>
            </IconButton>
          </Tooltip>

          {/* Menu profile */}
          <Menu
            anchorEl={anchorEl}
            id="account-menu"
            open={open}
            onClose={handleClose}
            onClick={handleClose}
            PaperProps={{
              elevation: 0,
              sx: {
                overflow: 'visible',
                filter: 'drop-shadow(0px 2px 8px rgba(0,0,0,0.32))',
                mt: 1.5,
                '& .MuiAvatar-root': {
                  width: 32,
                  height: 32,
                  ml: -0.5,
                  mr: 1,
                },
                '&::before': {
                  content: '""',
                  display: 'block',
                  position: 'absolute',
                  top: 0,
                  right: 14,
                  width: 10,
                  height: 10,
                  bgcolor: 'background.paper',
                  transform: 'translateY(-50%) rotate(45deg)',
                  zIndex: 0,
                },
              },
            }}
            transformOrigin={{ horizontal: 'right', vertical: 'top' }}
            anchorOrigin={{ horizontal: 'right', vertical: 'bottom' }}
          >
            <MenuItem onClick={handleClose}>
              <Avatar /> Profile
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <Avatar /> My account
            </MenuItem>
            <Divider />
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <PersonAdd fontSize="small" />
              </ListItemIcon>
              Add another account
            </MenuItem>
            <MenuItem onClick={handleClose}>
              <ListItemIcon>
                <Settings fontSize="small" />
              </ListItemIcon>
              Settings
            </MenuItem>
            <MenuItem onClick={handleLogout}>
              <ListItemIcon>
                <Logout fontSize="small" />
              </ListItemIcon>
              Logout
            </MenuItem>
          </Menu>
        </div>

        {/* <Button size='small' variant="outlined" onClick={() => handleTheme()}>
          Mode : {mode}
        </Button> */}
      </div>
    // </div>
  )
}

export default Navbar