import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
import afangar from '../data/gogn.js';
import HelpIcon from '@material-ui/icons/Help';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from 'react-redux';
import {addAfangi,deleteAfangi} from '../actions'; 
import Switch from '@material-ui/core/Switch';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';

const styles = {
  
};


class Flokkur2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afangar: props.afangar
    };
  }
  

  handleChange = name => event => {
    const {dispatch} = this.props;
    
    if (event.target.checked )
      dispatch(addAfangi({heiti: name, valinn: true, feiningar: afangar[name].feiningar, threp: afangar[name].threp}))
    else
      dispatch(deleteAfangi(name))
  };

  handleDisable = (name)=> {
    
    if (afangar[name] && afangar[name].undanfarar.indexOf('*') !== -1) {
      for (const a of afangar[name].undanfarar.split('*')) {
        if (!this.state.afangar[a]) {
          return true;
        }
      } 
      return false;
    }
    else if (afangar[name] && afangar[name].undanfarar.indexOf('/') !== -1) {
      for (const a of afangar[name].undanfarar.split('/')) {
        if (this.state.afangar[a]) {
          return false;
        }
      } 
      return true;
    }
    else if (afangar[name] && afangar[name].undanfarar === 'null')
      return false
    else if (afangar[name] && afangar[name].undanfarar !== 'null')
      if (this.state.afangar[afangar[name].undanfarar])
        return false;
      else
        return true;
    else
      return true;
  }
  
  componentWillReceiveProps(nextProps) {
    this.setState({afangar: nextProps.afangar});
  }
  componentWillMount() {
    
    this.setState({afangar: this.props.afangar});
  }
  render() {
  const {flokkur,heiti} = this.props;
  
  return (
    
      <div style={{padding: '5%'}}>
        <div style={{width: '100%', borderStyle: 'solid', borderWidth: '2px', padding: '2%'}}>
        <h4>{heiti}</h4>
              {
            Object.keys(flokkur).map(tegund=> 
            <div key={`${tegund}`}>
            <List
              component="nav"
              subheader={<ListSubheader component="div">{`${tegund}`}</ListSubheader>}
            >
             {
                flokkur[tegund].map(afangi =>
                  <ListItem> 
                    <ListItemText inset primary={`${afangi}`} />
                  </ListItem>
                )
            }
            </List>
            
            </div>
            )
          }
        </div>
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
    afangar: state.afangar,
});

export default connect(mapStateToProps)(Flokkur2)
