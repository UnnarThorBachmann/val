import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';



const styles = {
  
};

class ValAppBar extends React.Component {
  state = {braut: 'Félagsfræðibraut'}
  

  render() {
  return (
      <AppBar position="static" style={{height: '60px', paddingTop: '1%', paddingBottom: '1%', paddingLeft: '5%'}}>
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-end', paddingLeft: '5%', paddingRight: '5%'}}>
          <div>
            <Button variant="outlined" color="secondary">
              Áfram
            </Button>
          </div>
      </div>
      </AppBar>
      
  );
  }
}


export default ValAppBar;
