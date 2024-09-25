import React, { useContext, useEffect, useState } from 'react'
import './css/Sidebar.scss'
import { 
  Collapse, 
  IconButton, 
  List, 
  ListItemButton, 
  ListItemIcon, 
  ListItemText, 
  ListSubheader, 
  useTheme 
} from '@mui/material'
import DashboardIcon from '@mui/icons-material/Dashboard';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import InfoIcon from '@mui/icons-material/Info';
import Box from '@mui/material/Box';
import { SidebarAdminContext } from '../context/SidebarAdminContext';
// import logo from "./desa-kanca.png"
// import { SidebarAdminContext } from '../../../context/SidebarAdminContext';

const Sidebar = ({
  role,
}) => {
  const theme = useTheme()
  const {sidebarStatus, setSidebarStatus} = useContext(SidebarAdminContext)

  const [pageActive, setPageActive] = useState('dashboard')

  const NavIsActive = {
    borderRadius: 2,
    mb: 1,
    background: theme.palette.action.hover
  }

  const NavIsNotActive = {
    borderRadius: 2,
    mb: 1,
  }

  useEffect(() => {
    const url = window.location.pathname;

    if (url == '/admin/') {
      setPageActive('dashboard')
    }else if (url == '/admin/izin'){
      setPageActive('izin')
    }else if (url == '/admin/user'){
      setPageActive('user')
    }
  })

  const styleSidebar = {
    backgroundColor: theme.palette.card
  }

  const styleSidebarWrapActive = {
    backgroundColor: theme.palette.card
  }

  const styleSidebarWrapNotActive = {
    backgroundColor: theme.palette.background.default
  }

  const styleSidebarListActive = {
    width: '100%', 
    maxWidth: 360,
    backgroundColor: theme.palette.card
  }

  const styleSidebarListNotActive = {
    width: '100%', 
    maxWidth: 360,
    backgroundColor: theme.palette.background.default
  }


  return (
    <Box
      sx={sidebarStatus && styleSidebar}
      className={sidebarStatus == false ? 'sidebar-admin' : 'sidebar-admin show'}
    >

      <div className='header'>
        <div className='header-sidebar'>
          Pengajuan Izin App
        </div>

        {/* <IconButton color='inherit'>
          <MenuIcon/>
        </IconButton> */}
      </div>

      {/* sidebar menu item */}
      <Box className="list-wrapper" sx={sidebarStatus == false ? styleSidebarWrapNotActive : styleSidebarWrapActive}>
        <List 
          sx={sidebarStatus == false ? styleSidebarListNotActive : styleSidebarListActive}
          component='nav'
        >

          <ListItemButton
            component={Link}
            to={role == 'admin' ? '/admin' : '/verifikator'}
            sx={ pageActive === 'dashboard' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('dashboard'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to={role == 'admin' ? '/admin/izin' : '/verifikator/izin'}
            sx={ pageActive === 'izin' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('izin'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <InfoIcon />
            </ListItemIcon>
            <ListItemText primary="Izin" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to={role == 'admin' ? '/admin/user' : '/verifikator/user'}
            sx={ pageActive === 'user' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('user'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <PersonIcon/>
            </ListItemIcon>
            <ListItemText primary="User" />
          </ListItemButton>
        </List>
      </Box>

    </Box>
  )
}

export default Sidebar