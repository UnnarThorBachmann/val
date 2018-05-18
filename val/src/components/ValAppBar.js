import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';

//import boknamskjarni from '../data/boknamskjarni.js';


const styles = {
  
};

class ValAppBar extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
  return (
      <AppBar position="static" style={{height: '50px', paddingTop: '1%', paddingBottom: '1%', paddingLeft: '5%'}}>
        <Typography align="left" variant="title" color="inherit">
            Val
        </Typography>
      </AppBar>
      
  );
  }
}


export default withStyles(styles)(ValAppBar);
