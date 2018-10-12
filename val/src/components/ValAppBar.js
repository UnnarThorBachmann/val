import React from 'react';

import AppBar from '@material-ui/core/AppBar';
import Button from '@material-ui/core/Button';
import {Link} from 'react-router-dom';



class ValAppBar extends React.Component {
  
  render() {
  return (
      <AppBar position="static" style={{height: '60px', paddingTop: '1%', paddingBottom: '1%', paddingLeft: '5%'}}>
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-end', paddingLeft: '5%', paddingRight: '5%'}}>
          <div>
          <Link to="/annad">
            <Button variant="outlined" color="secondary">
              Áfram
            </Button>
          </Link>
          </div>
      </div>
      </AppBar>
      
  );
  }
}


export default ValAppBar;
