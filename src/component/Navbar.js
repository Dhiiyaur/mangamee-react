// import React from 'react';
import { Link as RouterLink } from "react-router-dom"
// import {

//   AppBar,
//   Toolbar,
//   Typography,
//   Button,
//   Link,
//   IconButton,
//   makeStyles

// } from '@material-ui/core'
// import MenuIcon from '@material-ui/icons/Menu';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     flexGrow: 1,
//   },
//   menuButton: {
//     marginRight: theme.spacing(2),
//   },
//   title: {
//     flexGrow: 1,
//   },
// }));

// export default function ButtonAppBar() {
//   const classes = useStyles();

//   return (
//     <div className={classes.root}>
//       <AppBar position="sticky" style={{ backgroundColor: '#FE0A52', color:'white'}}>
//         <Toolbar>
//           <IconButton edge="start" className={classes.menuButton} color="inherit" aria-label="menu">
//             <MenuIcon />
//           </IconButton>
//           <Typography variant="h6" className={classes.title}>
//             Mangamee
//           </Typography>
//           <Button color="inherit">Login</Button>
//           <Button color="inherit"><Link to="">Home</Link></Button>
//           <Link underline='none' component={RouterLink} to="/search"><Button color="inherit">Search</Button></Link>
//           {/* <Button color="inherit"><Link to="/search">Search</Link></Button> */}
//           <Button color="inherit"><Link underline='none' component={RouterLink} to="/browse">Browse</Link></Button>
//         </Toolbar>
//       </AppBar>
//     </div>
//   );
// }

import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import MenuItem from '@material-ui/core/MenuItem';
import Menu from '@material-ui/core/Menu';
import AccountCircle from '@material-ui/icons/AccountCircle';
import SearchIcon from '@material-ui/icons/Search';
import MoreIcon from '@material-ui/icons/MoreVert';
import MenuBookIcon from '@material-ui/icons/MenuBook';
import HomeIcon from '@material-ui/icons/Home';

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
  const classes = useStyles();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = React.useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

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

  const menuId = 'primary-search-account-menu';
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{ vertical: 'top', horizontal: 'right' }}
      id={menuId}
      keepMounted
      transformOrigin={{ vertical: 'top', horizontal: 'right' }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
      <MenuItem onClick={handleMenuClose}>My account</MenuItem>
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
							        window.location.href='/'
						          }}>
        <IconButton color="inherit">
            <HomeIcon />
        </IconButton>
        <p>Home</p>
      </MenuItem>
      <MenuItem onClick={() => {
							        window.location.href='/browse'
						          }}>
        <IconButton color="inherit">
            <MenuBookIcon />
        </IconButton>
        <p>Browse Manga</p>
      </MenuItem>
      <MenuItem onClick={() => {
							        window.location.href='/search'
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

  return (
    <div className={classes.grow}>
      <AppBar position="static">
        <Toolbar>
          <Typography className={classes.title} variant="h6" noWrap>
            Mangamee
          </Typography>
          <div className={classes.grow} />
          <div className={classes.sectionDesktop}>
            <IconButton color="inherit">
                <HomeIcon 
                    onClick={() => {
							        window.location.href='/'
						      }}/>
            </IconButton>
            <IconButton color="inherit">
                <MenuBookIcon 
                    onClick={() => {
							        window.location.href='/browse'
						      }}/>
            </IconButton>
            <IconButton color="inherit">
                <SearchIcon 
                    onClick={() => {
							        window.location.href='/search'
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
              <MoreIcon />
            </IconButton>
          </div>
        </Toolbar>
      </AppBar>
      {renderMobileMenu}
      {renderMenu}
    </div>
  );
}
