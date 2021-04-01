import React, { useState, useEffect } from 'react';
import { makeStyles } from '@material-ui/core/styles';

import { 
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  MenuItem,
  Menu
 } from "@material-ui/core";

import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MenuIcon from '@material-ui/icons/Menu';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';
import useScrollTrigger from "@material-ui/core/useScrollTrigger";
import Slide from "@material-ui/core/Slide";

import {MuiThemeProvider, createMuiTheme } from '@material-ui/core'
import Cookies from 'universal-cookie';
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  grow: {
    flexGrow: 1,
  },

  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block',
    },
  },

  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex',
    },
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none',
    },
  },
}));



export default function PrimarySearchAppBar() {

  const trigger = useScrollTrigger();
  const cookies = new Cookies()
  const classes = useStyles();
  const history = useHistory();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const theme = createMuiTheme({
    palette:{

        type:'dark'
    }

  })
  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget);
  };

  const [isLoggedIn, setisLoggedIn] = useState(false)
  

  function tokenCheck(){

    let userToken = cookies.get("Mangamee_Login_Token");
    // console.log(cookies.get("Mangamee_Login_Token"))

    if(userToken !== undefined){

      setisLoggedIn(true)

    }else{

      setisLoggedIn(false)
    }

  }


  function deleteToken(){

    cookies.remove("Mangamee_Login_Token" ,{ path: '/' })
    cookies.remove("Mangamee_Temp_History" ,{ path: '/' })
    cookies.remove("Mangamee_Temp_Name" ,{ path: '/' })
    window.location.href='/'

  }



  const menuId = 'primary-search-account-menu';

  const renderMenuLogin = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >


      {isLoggedIn ? (

          <MenuItem onClick={deleteToken}>
          logout 
          </MenuItem>
      ): ( 

        // <MenuItem onClick={() => { window.location.href='/auth/signin'}}>
        <MenuItem onClick={() => history.push('/auth/signin')}>
        login  
        </MenuItem>

      )}

    </Menu>
  );

  const mobileMenuId = 'primary-search-account-menu-mobile';
  const renderMobileMenu = (
    <Menu
      anchorEl={mobileMoreAnchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={mobileMenuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMobileMenuOpen}
      onClose={handleMobileMenuClose}
    >
        <MenuItem onClick={() => {
							        // window.location.href='/'
                      history.push("/")
						          }}>
        <IconButton color="inherit">
            <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => {
							        // window.location.href='/browse'
                      history.push("/browse")
						          }}>
        <IconButton color="inherit">
            <MenuBookIcon />
        </IconButton>
        <p>Browse Manga</p>
      </MenuItem>
      <MenuItem onClick={() => {
							        // window.location.href='/search'
                      history.push("/search")
						          }}>
        <IconButton color="inherit">
            <SearchIcon />
        </IconButton>
        <p>Search</p>
      </MenuItem>
      <MenuItem onClick={handleProfileMenuOpen}>
        <IconButton
          aria-label="account of current user"
          aria-controls="primary-search-account-menu"
          aria-haspopup="true"
          color="inherit"
        >
          <AccountCircle />
        </IconButton>
        <p>Profile</p>
      </MenuItem>
    </Menu>
  );

  useEffect(() => {

    tokenCheck();

  }, [])

  return (

    <MuiThemeProvider theme={theme}>
    <div className={classes.grow}>
      <Slide appear={false} direction="down" in={!trigger}>
      <AppBar style={{ background: '#2E3B55' }}>
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Mangamee
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
                <HomeIcon 
                    onClick={() => {
							        // window.location.href='/'
                      history.push("/")
						      }}/>
            </IconButton>
            <IconButton color="inherit">
                <MenuBookIcon 
                    onClick={() => {
							        // window.location.href='/browse'
                      history.push("/browse")
						      }}/>
            </IconButton>
            <IconButton color="inherit">
                <SearchIcon 
                    onClick={() => {
							        // window.location.href='/search'
                      history.push("/search")
						          }}/>
            </IconButton>
            <IconButton
              edge="end"
              aria-label="account of current user"
              aria-controls={menuId}
              aria-haspopup="true"
              onClick={handleProfileMenuOpen}
              color="inherit"
            >
              <AccountCircle />
            </IconButton>
          </div>
          <div className={classes.sectionMobile}>
            <IconButton
              aria-label="show more"
              aria-controls={mobileMenuId}
              aria-haspopup="true"
              onClick={handleMobileMenuOpen}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      </Slide>
      {renderMobileMenu}
      {renderMenuLogin}
    </div>
    </MuiThemeProvider>
  );
}
