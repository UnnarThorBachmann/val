import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';
//import boknamskjarni from '../data/boknamskjarni.js';


const styles = {
  
};

const boknamskjarni = {
  Danska: ['DANS2RM05'],
  Enska: ['ENSK2LO05','ENSK3RO05','ENSK2OB05','ENSK3SA05'],
  Félagsvísindi: ['FÉLV1IF05'],
  Íslenska: ['ÍSLE2BS05', 'ÍSLE3BÓ05', 'ÍSLE2GM05','ÍSLE3NB05'],
  Íþróttir: ['ÍÞRÓ1AA01','ÍÞRÓ1AB01','ÍÞRÓ1AC01','ÍÞRÓ1AD01','ÍÞRÓ1AE01','ÍÞRÓ1AF01'],
  Lífsleikni: ['LÍFS1BS02', 'LÍFS1ÉG03'],
  Raunvísindi: ['RAUN1JE05','RAUN1LE05'],
  Saga: ['SAGA1MF05','SAGA2NS05'],
  Stærðfræði: ['STÆR2HS05']
}


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
  return (
    
      <div style={{padding: '5%'}}>
        <div style={{width: '20%', borderStyle: 'solid', borderWidth: '2px'}}>
        <h4>Bóknámskjarni</h4>
    
        <FormControl component="fieldset">
          {
            Object.keys(boknamskjarni).map(flokkur=> 
            <div key={`${flokkur}`}>
            <FormLabel component="legend">{`${flokkur}`}</FormLabel>
              <FormGroup>
                {
                boknamskjarni[flokkur].map(afangi => 
                <FormControlLabel
                  key={`${afangi}`}
                  control={
                    <Checkbox
                      checked={this.state[afangi]}
                      onChange={this.handleChange(`${afangi}`)}
                      value='gilad'
                    />
                  }
                  label={`${afangi}`}
                />
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


export default withStyles(styles)(Brautarkjarni);
