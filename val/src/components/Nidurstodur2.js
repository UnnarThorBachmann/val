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
import {Brautir, allir} from '../helpers'
import grunnur from '../data/gogn.js';
import Radio from '@material-ui/core/Radio';

const styles = {
  
};


class Nidurstodur2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ovaldir: {},
      onn: 'Haust'
    };
  }
  
  change = event => {
    
    this.setState({onn: event.target.value});

  };

  handleChange = name => event => {
    const {dispatch} = this.props;
    
    if (event.target.checked )
      dispatch(addAfangi({heiti: name, valinn: true, feiningar: afangar[name].feiningar, threp: afangar[name].threp}))
    else
      dispatch(deleteAfangi(name))
  };

  handleDisable = (name)=> {
    
    if (afangar[name] && afangar[name].undanfarar.indexOf('*') !== -1) {
      console.log(name);
      for (const a of afangar[name].undanfarar.split('*')) {
        if (!this.state.afangar[a]) {
          return true;
        }
      } 
      return false;
    }
    else if (afangar[name] && afangar[name].undanfarar.indexOf('/') !== -1) {
      console.log(name);
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
  
  
  componentWillMount() {
    const {mal,braut,afangar} =this.props;
    let tungumal = ['Franska','Spænska','Þýska'];
    tungumal = tungumal.filter(item=> item !== mal)
  
    const brautarsamsetning = Brautir[braut];
   
    let brautarsamsetning_alt = Object.keys(brautarsamsetning).reduce(function(acc,curr) {return {...acc, ...brautarsamsetning[curr]}},{});

    for (const t of tungumal) {
      delete brautarsamsetning_alt[t];
    }
    let ovaldir = Object.keys(brautarsamsetning_alt).reduce(function(acc,curr) {return {...acc, [curr]: brautarsamsetning_alt[curr].filter(item=> !afangar[item])}},{});
    console.log(ovaldir);
    this.setState({ovaldir: ovaldir})
    console.log(grunnur);
    let ovaldir_haust_kjarni = Object.keys(ovaldir).reduce(function(acc,curr){
      
      return {...acc, [curr]: ovaldir[curr].filter(item=> grunnur[item].kennt.indexOf('haust') !==-1)}
    },{})
    console.log('Óvaldir haust kjarni', ovaldir_haust_kjarni);
    let ovaldir_vor_kjarni = Object.keys(ovaldir).reduce(function(acc,curr){
      
      return {...acc, [curr]: ovaldir[curr].filter(item=> grunnur[item].kennt.indexOf('vor') !==-1)}
    },{})
    console.log('Óvaldir vor kjarni',ovaldir_vor_kjarni);
    const adrir_ovaldir = Object.keys(grunnur).filter(item=> !afangar[item]).sort();
    const adrir_ovaldir_haust = adrir_ovaldir.filter(item=> grunnur[item].kennt.indexOf('haust')!==-1)
    const adrir_ovaldir_vor = adrir_ovaldir.filter(item=> grunnur[item].kennt.indexOf('vor')!==-1)
    const adrir_ovaldir_breytilegt = adrir_ovaldir.filter(item=> grunnur[item].kennt.indexOf('breytilegt')!==-1)

    console.log('aðrir', adrir_ovaldir);
    console.log('aðrir óvaldir haust', adrir_ovaldir_haust);
    console.log('aðrir óvaldir vor', adrir_ovaldir_vor);
    console.log('aðrir óvaldir breytilegt', adrir_ovaldir_breytilegt);

    //console.log('Mál', mal);
    //console.log('Grunnur',grunnur);
    
    //const brautarsamsetning_alt = Object.keys(brautarsamsetning).reduce(function(acc,curr) {return {...acc, ...brautarsamsetning[curr]}},{})
    //let adrir = {...allir};
    
    //adrir = Object.keys(brautarsamsetning_alt).reduce(function(acc,curr) {
    //  return {...acc, [curr]: allir[curr].filter(item=> brautarsamsetning_alt[curr].indexOf(item) ===-1)};
    //
    //},{});
    //console.log('adrir',adrir);
  }
  render() {
  
  return (
    
      <div style={{padding: '5%'}}>
        <div>
                <h4>{`Næsta önn (${this.state.onn})`}</h4>
                <div>
                  <Radio
                    checked={this.state.onn=== 'Haust'}
                    onChange={this.change}
                    value="Haust"
                    name="radio-button-demo"
                    aria-label="Haust"
                  />
                  <Radio
                    checked={this.state.onn === 'Vor'}
                    onChange={this.change}
                    value="Vor"
                    name="radio-button-demo"
                    aria-label="Vor"
                  />
                  
                </div>
        </div>
        <h4>Niðurstöður</h4>
        <div style={{width: '100%', borderStyle: 'solid', borderWidth: '2px', padding: '2%'}}>
        
    
        
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state)=> ({
    afangar: state.afangar,
    braut: state.braut,
    mal: state.mal
});

export default connect(mapStateToProps)(Nidurstodur2)
