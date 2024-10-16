import * as React from 'react';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';

import { TodoContext } from './TodoContext';
import axios from 'axios';


export default function SwipeableTemporaryDrawer() {

  const [,,,,,,,,isLogin, setIsLogin] = React.useContext(TodoContext);

  async function checkLogin() {
    await axios.get(process.env.REACT_APP_Backend_Url + '/login', {
      withCredentials: true,
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded'
      }})
    .then((res) => {
      console.log(res.data)
        if (res.data === true) {
            setIsLogin(true);
        } else {
          setIsLogin(false);
        }
    }).catch((err) =>{
        console.log(err)
    })
  }

  const logout = async () => {
    await axios.post(process.env.REACT_APP_Backend_Url + '/logout', 
      {withCredentials: true,
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      })
    .then((res) => {
      console.log(res.status)

    }).catch((err) =>{
        console.log(err)
    })
    // temp solution self destroy cookie
    localStorage.clear();
  }

  React.useEffect(()=>{
    checkLogin()
  },[logout])

  const [state, setState] = React.useState({
    // top: false,
    left: false,
    // bottom: false,
    // right: false,
  });

  const toggleDrawer = (anchor, open) => (event) => {
    if (
      event &&
      event.type === 'keydown' &&
      (event.key === 'Tab' || event.key === 'Shift')
    ) {
      return;
    }

    setState({ ...state, [anchor]: open });
  };

  const renderIcon = (index) => {
    switch (index) {
        case 0:
            return <HomeIcon />;
        case 1:
            return <DomainVerificationIcon />;
        case 2:
            return <BarChartIcon />;
        case 3:
            return <InfoIcon />;
    }
  }

  

  const list = (anchor) => (
    // <Box
    //   sx={{ width: anchor === 'top' || anchor === 'bottom' ? 'auto' : 250 }}
    //   role="presentation"
    //   onClick={toggleDrawer(anchor, false)}
    //   onKeyDown={toggleDrawer(anchor, false)}
    // >
    <>
      <List>
        {['Home', 'Done Today', 'Data Analyze', 'About'].map((text, index) => (
          <Link key={text} to={'/' + text.replaceAll(" ","")}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>
                  {renderIcon(index)}
                </ListItemIcon>
                <ListItemText primary={text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      {/* <Divider /> */}
      {isLogin && <button onClick={logout}>Logout</button>}
      {!isLogin && 
      <a href={process.env.REACT_APP_Backend_Url + '/login/google'}>
        Login with Google
      </a>}
      </>
    // </Box>
  );

  return (
    <div>
      {['left'].map((anchor) => (
        <React.Fragment key={anchor}>
          <div onClick={toggleDrawer(anchor, true)}>
            <MenuIcon id='menuBtn'/>
            </div>
          <SwipeableDrawer
            anchor={anchor}
            open={state[anchor]}
            onClose={toggleDrawer(anchor, false)}
            onOpen={toggleDrawer(anchor, true)}
          >
            {list(anchor)}
          </SwipeableDrawer>
        </React.Fragment>
      ))}
    </div>
  );
}
