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
import ExpandLessIcon from '@mui/icons-material/ExpandLess';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import NewspaperIcon from '@mui/icons-material/Newspaper';
import PhotoLibraryIcon from '@mui/icons-material/PhotoLibrary';
import GroupsIcon from '@mui/icons-material/Groups';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import PolylineIcon from '@mui/icons-material/Polyline';
import InfoIcon from '@mui/icons-material/Info';
import ContactPhoneIcon from '@mui/icons-material/ContactPhone';
import Box from '@mui/material/Box';
import MenuIcon from '@mui/icons-material/Menu';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import { SidebarAdminContext } from '../context/SidebarAdminContext';
// import logo from "./desa-kanca.png"
// import { SidebarAdminContext } from '../../../context/SidebarAdminContext';

const Sidebar = () => {
  const theme = useTheme()
  const {sidebarStatus, setSidebarStatus} = useContext(SidebarAdminContext)

  const [pageActive, setPageActive] = useState('dashboard')
  const [lembagaOpen, setLembagaOpen] = useState(false); //lembaga collapse
  const [informasiOpen, setInformasiOpen] = useState(false); //lembaga collapse

  const handleLembaga = () => {
    setLembagaOpen(!lembagaOpen)
    setPageActive('lembaga')
  }

  const handleInformasi = () => {
    setInformasiOpen(!informasiOpen)
    setPageActive('informasi')
  }

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
    }else if (url == '/admin/penduduk' || url == '/admin/struktur-desa' || url == '/admin/berita' || url == '/admin/galeri' || url == '/admin/apbdes'){
      setPageActive('informasi')
    }else if (url == '/admin/lembaga' || url == '/admin/rt-rw' || url == '/admin/karang-taruna' || url == '/admin/posyandu' || url == '/admin/pkk' || url == '/admin/linmas' || url == '/admin/lembaga-adat' || url == '/admin/lpmd' || url == '/admin/bumdes'  ){
      setPageActive('lembaga')
    }else if (url == '/admin/about'){
      setPageActive('about')
    }else if (url == '/admin/kontak'){
      setPageActive('kontak')
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
            to='/admin'
            sx={ pageActive === 'dashboard' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('dashboard'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <DashboardIcon/>
            </ListItemIcon>
            <ListItemText primary="Dashboard" />
          </ListItemButton>
        </List>

        <List 
          sx={sidebarStatus == false ? styleSidebarListNotActive : styleSidebarListActive}
          component='nav'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader' sx={sidebarStatus == false ? styleSidebarWrapNotActive : styleSidebarWrapActive}>
              Master Data
            </ListSubheader>
          }
        >
           {/* Tombol collapse untuk Informasi */}
          <ListItemButton onClick={handleInformasi} sx={ pageActive === 'informasi' ? NavIsActive : NavIsNotActive }>
            <ListItemIcon sx={{ minWidth: 46 }}>
              <NewspaperIcon/>
            </ListItemIcon>
            <ListItemText primary="Informasi" />
            {lembagaOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          {/* Collapse informasi */}
          <Collapse in={informasiOpen} timeout="auto" unmountOnExit>
            {/* List collapse untuk organisasi */}
            <List component="div" disablePadding>

              <ListItemButton
                component={Link}
                to='/admin/penduduk'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Penduduk" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/struktur-desa'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Struktur Desa" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/galeri'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Galeri" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/berita'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Berita" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/apbdes'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="APBDes" />
              </ListItemButton>

            </List>

          </Collapse>

          {/* Tombol collapse untuk lembaga */}
          <ListItemButton onClick={handleLembaga} sx={ pageActive === 'lembaga' ? NavIsActive : NavIsNotActive }>
            <ListItemIcon sx={{ minWidth: 46 }}>
              <GroupsIcon/>
            </ListItemIcon>
            <ListItemText primary="Lembaga" />
            {lembagaOpen ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </ListItemButton>
          {/* Collapse organnisasi */}
          <Collapse in={lembagaOpen} timeout="auto" unmountOnExit>
            {/* List collapse untuk organisasi */}
            <List component="div" disablePadding>

              <ListItemButton 
                component={Link}
                to='/admin/rt-rw'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Rt / Rw" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/karang-taruna'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Karang Taruna" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/posyandu'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Posyandu" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/pkk'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="PKK" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/linmas'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Linmas" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/lembaga-adat'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="Lembaga Adat" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/lpmd'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="LPMD" />
              </ListItemButton>

              <ListItemButton
                component={Link}
                to='/admin/bumdes'
                sx={{ 
                  pl: 10,
                  borderRadius: 2,
                }}
                onClick={() => setSidebarStatus(false)}
              >
                <ListItemText primary="BUMDes" />
              </ListItemButton>

            </List>

          </Collapse>
        </List>

        <List 
          sx={sidebarStatus == false ? styleSidebarListNotActive : styleSidebarListActive}
          component='nav'
          subheader={
            <ListSubheader component='div' id='nested-list-subheader' sx={sidebarStatus == false ? styleSidebarWrapNotActive : styleSidebarWrapActive}>
              Setting
            </ListSubheader>
          }
        >

          <ListItemButton
            component={Link}
            to='/admin/about'
            sx={ pageActive === 'about' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('about'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <InfoIcon/>
            </ListItemIcon>
            <ListItemText primary="About" />
          </ListItemButton>

          <ListItemButton
            component={Link}
            to='/admin/kontak'
            sx={ pageActive === 'kontak' ? NavIsActive : NavIsNotActive }
            onClick={() => {setPageActive('kontak'); setSidebarStatus(false)}}
          >
            <ListItemIcon sx={{ minWidth: 46 }}>
              <ContactPhoneIcon/>
            </ListItemIcon>
            <ListItemText primary="Kontak" />
          </ListItemButton>
        </List>
      </Box>

    </Box>
  )
}

export default Sidebar