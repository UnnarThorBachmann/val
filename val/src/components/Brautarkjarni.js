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

const styles = {
  
};


class Brautarkjarni extends React.Component {
  state = {
    gilad: true,
    jason: false,
    antoine: true,
  };

  handleChange = name => event => {
    this.setState({ [name]: event.target.checked });
  };
  render() {
  console.log(afangar);
  const {boknamskjarni, heiti} = this.props;
  return (
    
      <div style={{padding: '5%'}}>
        <div style={{width: '100%', borderStyle: 'solid', borderWidth: '2px', padding: '2%'}}>
        <h4>{heiti}</h4>
    
        <FormControl component="fieldset">
          {
            Object.keys(boknamskjarni).map(flokkur=> 
            <div key={`${flokkur}`}>
            <FormLabel component="legend">{`${flokkur}`}</FormLabel>
              <FormGroup>
                {
                boknamskjarni[flokkur].map(afangi => 
                <div>
                  <FormControlLabel
                    key={`${afangi}`}
                    control={
                      <Checkbox
                        checked={this.state[afangi]}
                        onChange={this.handleChange(`${afangi}`)}
                        value={`${afangi}`}
                        disabled={false}
                      />
                    }
                    label={`${afangi} (${afangar[afangi]?afangar[afangi].gamaltHeiti:''})`}
                  />
                  {(afangar[afangi] && afangar[afangi].athugasemdir !== 'null') &&
                  <Tooltip id="tooltip-icon" title={`Undanfarar: ${afangar[afangi].athugasemdir}`}>
                    <IconButton aria-label="Help">
                      <HelpIcon />
                    </IconButton>
                  </Tooltip>
                  }
                </div>
                )
                }
              </FormGroup>
            </div>
            )
          }
        </FormControl>
        </div>
      </div>
    );
  }
}


export default Brautarkjarni
