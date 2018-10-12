import React from 'react';

import afangar from '../data/gogn.js';
import IconButton from '@material-ui/core/IconButton';
import Tooltip from '@material-ui/core/Tooltip';
import {connect} from 'react-redux';

import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListSubheader from '@material-ui/core/ListSubheader';
import ListItemText from '@material-ui/core/ListItemText';
import Check from '@material-ui/icons/Report';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import Avatar from '@material-ui/core/Avatar';
import FolderIcon from '@material-ui/icons/Folder';
import ListItemSecondaryAction from '@material-ui/core/ListItemSecondaryAction';



class Flokkur2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      afangar: props.afangar
    };
  }
  

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
                  <ListItem key={afangi}>
                    <Tooltip id="tooltip-icon" title={`Undanfarar: ${afangar[afangi].athugasemdir}`}>
                     <ListItemAvatar>
                        <Avatar>
                          <FolderIcon />
                        </Avatar>
                      </ListItemAvatar>
                    </Tooltip>

                    <ListItemText inset primary={`${afangi} `} />
                     { this.handleDisable(afangi) &&
                     <ListItemSecondaryAction>
                     
                      <IconButton aria-label="Check">
                        <Check />
                      </IconButton>
                    </ListItemSecondaryAction>
                    }
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
