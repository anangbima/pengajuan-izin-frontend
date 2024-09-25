import React, { useContext, useState } from 'react'
import './css/Header.scss'
import { Breadcrumbs, Link, Typography, useTheme } from '@mui/material'
import { SidebarAdminContext } from '../context/SidebarAdminContext'
import Navbar from './Navbar'

const Header = ({
  page,
}) => {
  const {sidebarStatus, setSidebarStatus} = useContext(SidebarAdminContext)
	const theme = useTheme()

	const [isBarOpen, setIsBarOpen] = useState(false);
  const [isNavShow, setIsNavShow] = useState(false);

	// handle open side panel
  const handleOpenBtn = () => {
    // setIsNavShow(true);
    setSidebarStatus(true)
    setIsBarOpen(true);

    if(isBarOpen == true){
      // setIsNavShow(false);
      setSidebarStatus(false)
      setIsBarOpen(false);
    }
  }
	
  return (
    <div className='header-admin'>

      <div>
        <div className='header-responsive'>
          <div 
            className="openbtn" 
            onClick={handleOpenBtn}
          >
            <div className={isBarOpen == false ? 'hamburger-menu' : 'hamburger-menu open'}>
              <span style={{ background: theme.palette.text.primary}}></span>
              <span style={{ background: theme.palette.text.primary}}></span>
              <span style={{ background: theme.palette.text.primary}}></span>
            </div>
          </div>
        </div>
        
        <div className='title'>
          <h1>{page}</h1>

          <Breadcrumbs
            aria-label="breadcrumb"
            className='breadcrumb'
          >
            <Link
              underline='hover'
              color='inherit'
            >
              Home
            </Link>
            <Typography color={theme.palette.primary.main}>{page}</Typography>
          </Breadcrumbs>
        </div>
      </div>

      <div className='header-nav'>
				<Navbar/>
			</div>
    </div>
  )
}

export default Header