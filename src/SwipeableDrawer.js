import * as React from 'react';
import Box from '@mui/material/Box';
import SwipeableDrawer from '@mui/material/SwipeableDrawer';
import Button from '@mui/material/Button';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';

import MenuIcon from '@mui/icons-material/Menu';
import HomeIcon from '@mui/icons-material/Home';
import DomainVerificationIcon from '@mui/icons-material/DomainVerification';
import BarChartIcon from '@mui/icons-material/BarChart';
import InfoIcon from '@mui/icons-material/Info';
import { Link } from 'react-router-dom';



export default function SwipeableTemporaryDrawer() {
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
      // <Divider />
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
