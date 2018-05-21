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
import Flokkur2 from '../components/Flokkur2.js';

const styles = {
  
};


class Annad extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ovaldir: {},
      ovaldir_vor_kjarni: {},
      ovaldir_haust_kjarni: {},
      adrir_ovaldir_haust: {},
      adrir_ovaldir_vor: {},
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
    this.setState({ovaldir: ovaldir})
    let ovaldir_haust_kjarni = Object.keys(ovaldir).reduce(function(acc,curr){
      
      return {...acc, [curr]: ovaldir[curr].filter(item=> grunnur[item].kennt.indexOf('haust') !==-1)}
    },{})
    this.setState({ovaldir_haust_kjarni: ovaldir_haust_kjarni})

    let ovaldir_vor_kjarni = Object.keys(ovaldir).reduce(function(acc,curr){
      
      return {...acc, [curr]: ovaldir[curr].filter(item=> grunnur[item].kennt.indexOf('vor') !==-1)}
    },{})
    this.setState({ovaldir_vor_kjarni: ovaldir_vor_kjarni})
    const adrir_ovaldir_helper = Object.keys(grunnur).filter(item=> !afangar[item]);
    
    const adrir_ovaldir = Object.keys(allir).reduce(function(acc,curr){
      return {...acc, [curr]: allir[curr].filter(item=> adrir_ovaldir_helper.indexOf(item) !==-1)}
    },{});
    let kjarnafog = Object.keys(brautarsamsetning_alt).reduce(function(acc,curr){ 
      return acc.concat(brautarsamsetning_alt[curr]);
    },[]);

    let adrir_ovaldir_haust_helper = adrir_ovaldir_helper.filter(item=> ((kjarnafog.indexOf(item) === -1) && (grunnur[item].kennt.indexOf('haust')!==-1)));
    const adrir_ovaldir_haust = Object.keys(allir).reduce(function(acc,curr){
      return {...acc, [curr]: allir[curr].filter(item=> adrir_ovaldir_haust_helper.indexOf(item) !==-1)}
    },{});
    this.setState({adrir_ovaldir_haust: adrir_ovaldir_haust}); 

    let adrir_ovaldir_vor_helper = adrir_ovaldir_helper.filter(item=> ((kjarnafog.indexOf(item) === -1) && (grunnur[item].kennt.indexOf('vor')!==-1)));
    const adrir_ovaldir_vor = Object.keys(allir).reduce(function(acc,curr){
      return {...acc, [curr]: allir[curr].filter(item=> adrir_ovaldir_vor_helper.indexOf(item) !==-1)}
    },{});
    this.setState({adrir_ovaldir_vor: adrir_ovaldir_vor}); 

    
  }
  render() {
  const {ovaldir_vor_kjarni, ovaldir_haust_kjarni,onn,adrir_ovaldir_haust,adrir_ovaldir_vor} = this.state;
  console.log(onn);
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
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            {
              (onn === 'Vor') &&
              <div style={{width: "23%"}}>
                <Flokkur2 flokkur={ovaldir_vor_kjarni} heiti={'Val fyrir vor (kjarni)'}/>
              </div>
            }
            {
              (onn === 'Vor') &&
              <div style={{width: "23%"}}>
                <Flokkur2 flokkur={adrir_ovaldir_vor} heiti={'Annað val vor'}/>
              </div>
            }
            
            {
              (onn === 'Haust') &&
              <div style={{width: "23%"}}>
                <Flokkur2 flokkur={ovaldir_haust_kjarni} heiti={'Val fyrir haust (kjarni)'}/>
              </div>
            }
            {
              (onn === 'Haust') &&
              <div style={{width: "23%"}}>
                <Flokkur2 flokkur={adrir_ovaldir_haust} heiti={'Annað val haust'}/>
              </div>
            }
            
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

export default connect(mapStateToProps)(Annad)