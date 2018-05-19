import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Radio from '@material-ui/core/Radio';



const styles = {
  
};

class ValAppBar extends React.Component {
  state = {braut: 'Félagsfræðibraut'}
  handleChange = event => {
    this.setState({braut: event.target.value});
    this.props.change(event.target.value);

  };

  render() {
  return (
      <AppBar position="static" style={{height: '60px', paddingTop: '1%', paddingBottom: '1%', paddingLeft: '5%'}}>
        <div>
        <Radio
          checked={this.state.braut === 'Félagsfræðibraut'}
          onChange={this.handleChange}
          value="Félagsfræðibraut"
          name="radio-button-demo"
          aria-label="Félagsfræðibraut"
        />
        <Radio
          checked={this.state.braut === 'Náttúrufræðibraut'}
          onChange={this.handleChange}
          value="Náttúrufræðibraut"
          name="radio-button-demo"
          aria-label="Náttúrufræðibraut"
        />
        <Radio
          checked={this.state.braut === 'Viðskipta- og hagfræðibraut'}
          onChange={this.handleChange}
          value="Viðskipta- og hagfræðibraut"
          name="radio-button-demo"
          aria-label="Viðskipta- og hagfræðibraut"
          
        />
        
        
      </div>
      </AppBar>
      
  );
  }
}


export default ValAppBar;
