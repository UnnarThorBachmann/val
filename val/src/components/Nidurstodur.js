import React from 'react';
import afangar from '../data/gogn.js';
import {connect} from 'react-redux';
import {addAfangi,deleteAfangi} from '../actions'; 
import {Brautir} from '../helpers'
//import grunnur from '../data/gogn.js';
//import Radio from '@material-ui/core/Radio';
//import Flokkur2 from '../components/Flokkur2.js';

import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';

const feiningafastar = {
  'Félagsfræðibraut': {
    'Bóknámskjarni': 86,
    'Þriðja': 15,
    'Brautarkjarni': 15,
    'Brautarval': 35,
    'Frjálst': 49
  },
  'Náttúrufræðibraut': {
    'Bóknámskjarni': 86,
    'Þriðja': 15,
    'Brautarkjarni': 50,
    'Frjálst': 49
  },
  'Viðskipta- og hagfræðibraut': {
    'Bóknámskjarni': 86,
    'Þriðja': 15,
    'Brautarkjarni': 60,
    'Frjálst': 39
  },
}

class Nidurstodur extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      ovaldir: [],
      b_valid_feiningar: {},
      valdir: [],
      onn: 'Haust'
    };
  }

  deleteNull = (item) => {
    if (item === 'null')
      return "";
    else
      return item;
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
      for (const a of afangar[name].undanfarar.split('*')) {
        if (!this.state.afangar[a]) {
          return "Já";
        }
      } 
      return "Nei";
    }
    else if (afangar[name] && afangar[name].undanfarar.indexOf('/') !== -1) {
      for (const a of afangar[name].undanfarar.split('/')) {
        if (this.state.afangar[a]) {
          return "Nei";
        }
      } 
      return "Já";
    }
    else if (afangar[name] && afangar[name].undanfarar === 'null')
      return false
    else if (afangar[name] && afangar[name].undanfarar !== 'null')
      if (afangar[name].undanfarar)
        return "Nei";
      else
        return "Já";
    else
      return "Já";
  }
  
  feiningar= (arr) => {
    let ret = {1: 0, 2: 0, 3: 0}
    for (const item of arr){
      let temp = item.split(/[A-ZÉÞÐÁÍÖÆÓ]+/);
      let i = parseInt(temp[1],10);
      let f = parseInt(temp[2],10);
      ret[i] = ret[i] + f;
    }
    return ret;
  }
  componentWillMount() {
    const {mal,braut,afangar} =this.props;

    let tungumal = ['Franska','Spænska','Þýska'];
    tungumal = tungumal.filter(item=> item !== mal)
    let brautarsamsetning = {...Brautir[braut]};
    for (const mal of tungumal)
      delete brautarsamsetning['Þriðja'][mal];

    let valdir = Object.keys(afangar);
    this.setState({valdir: valdir});
    const ovaldir = Object.keys(brautarsamsetning).reduce((safn_afanga,label_gerd)=> {
      const fog = Object.keys(brautarsamsetning[label_gerd]).reduce((safn_afanga_i_fagi, label_fag)=> {
          return safn_afanga_i_fagi.concat(brautarsamsetning[label_gerd][label_fag]);
      },[])
      return safn_afanga.concat(fog);
    },[]).filter(item=> valdir.indexOf(item) ===-1);

    this.setState({ovaldir: ovaldir})
    
    
    let b = Object.keys(brautarsamsetning).reduce(

      function(acc,curr) {
        return {...acc, [curr]: Object.keys(brautarsamsetning[curr]).reduce((acc,curr2)=> {
          return acc.concat(brautarsamsetning[curr][curr2]);
        },[])}
      },{});
    if (mal==='Franska')
      b['Þriðja'] = b['Þriðja'].slice(0,3);
    else if (mal==='Spænska')
      b['Þriðja'] = b['Þriðja'].slice(3,6);
    else
      b['Þriðja'] = b['Þriðja'].slice(6,9);
    

    let b_valid = Object.keys(b).reduce((acc,curr)=> {
      return {...acc,[curr]: b[curr].filter(item=> valdir.indexOf(item)!==-1)}
    }
    ,{})
    let b_listi = Object.keys(b).reduce((acc,curr)=> {
      return acc.concat(b[curr]);
      },
      []);
    b_valid['Frjálst val'] = valdir.filter(item=> b_listi.indexOf(item) ===-1);
    
   
    let b_valid_feiningar = Object.keys(b_valid).reduce((acc,curr)=>{
      return {...acc,[curr]: this.feiningar(b_valid[curr])};
    }, {});
    b_valid_feiningar = Object.keys(b_valid_feiningar).reduce((acc,curr)=> {
      return {...acc, [curr]: {...b_valid_feiningar[curr], 
        'lágmark': feiningafastar[braut][curr]?feiningafastar[braut][curr]:feiningafastar[braut]['Frjálst'],
        'samtals': Object.values(b_valid_feiningar[curr]).reduce((acc,curr)=>{return acc + curr;},0)
        }}
        
    },{});
    this.setState({'b_valid_feiningar': b_valid_feiningar})
  }
  render() {
  const {b_valid_feiningar,ovaldir,valdir} = this.state;
 

  const asar = Object.keys(b_valid_feiningar).reduce((acc,curr)=>{return acc + b_valid_feiningar[curr][1];},0);
  const tvistar = Object.keys(b_valid_feiningar).reduce((acc,curr)=>{return acc + b_valid_feiningar[curr][2];},0);
  const thristar = Object.keys(b_valid_feiningar).reduce((acc,curr)=>{return acc + b_valid_feiningar[curr][3];},0);
  const lagmark_samtals = Object.keys(b_valid_feiningar).reduce((acc,curr)=>{return acc + b_valid_feiningar[curr]['lágmark'];},0);
  const samtals= Object.keys(b_valid_feiningar).reduce((acc,curr)=>{return acc + b_valid_feiningar[curr]['samtals'];},0);

  return (
    
      <div style={{padding: '2%'}}>
        
        <h4>Niðurstöður</h4>
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-start'}}>
              <div style={{width: "80%", padding: '1%'}}>
                <Table>
                <TableHead>
                  <TableRow>
                    <TableCell>Flokkur</TableCell>
                    <TableCell>Þ1</TableCell>
                    <TableCell>Þ2</TableCell>
                    <TableCell>Þ3</TableCell>
                    <TableCell>Samtals</TableCell>
                    <TableCell>Lágmark</TableCell>
                  </TableRow>
                  
                </TableHead>
                <TableBody>
                  {
                    Object.keys(b_valid_feiningar).map(item=> 
                      <TableRow key={item}>
                        <TableCell>{item}</TableCell>
                        <TableCell>{b_valid_feiningar[item][1]}</TableCell>
                        <TableCell>{b_valid_feiningar[item][2]}</TableCell>
                        <TableCell>{b_valid_feiningar[item][3]}</TableCell>
                        <TableCell>{b_valid_feiningar[item]['samtals']}</TableCell>
                        <TableCell>{b_valid_feiningar[item]['lágmark']}</TableCell>
                      </TableRow>
                    )
                  }
                  
                  <TableRow>
                    <TableCell>Samtals</TableCell>
                    <TableCell>{asar}</TableCell>
                    <TableCell>{tvistar}</TableCell>
                    <TableCell>{thristar}</TableCell>
                    <TableCell>{samtals}</TableCell>
                    <TableCell>{lagmark_samtals}</TableCell>
                  </TableRow>
                  <TableRow>
                    <TableCell>MAX (MIN)</TableCell>
                    <TableCell>66-</TableCell>
                    <TableCell></TableCell>
                    <TableCell>40+</TableCell>
                    <TableCell></TableCell>
                    <TableCell></TableCell>
                  </TableRow>
                </TableBody>
                </Table>
              </div>
            
        </div>
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-start'}}>
          <div style={{width: "20%", padding: '1%'}}>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell>Áföngum lokið</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
            valdir.map(item => 
              <TableRow key={item}>
                <TableCell>{item}</TableCell>       
              </TableRow>
            )}
            </TableBody>
          </Table>
          </div>
          <div style={{width: "70%", padding: '1%'}}>
          <Table>
            <TableHead>
            <TableRow>
              <TableCell>Áföngum ólokið</TableCell>
              <TableCell>Undanfarar eða athugasemdir</TableCell>
              <TableCell>Kenndur</TableCell>
            </TableRow>
            </TableHead>
            <TableBody>
            {
              ovaldir.map(item=>
                <TableRow key={item}>
                  <TableCell>{item}</TableCell>
                  <TableCell>{this.deleteNull(afangar[item].athugasemdir)}</TableCell>
                  <TableCell>{afangar[item].kennt}</TableCell>
                </TableRow>
            )}
            </TableBody>
          </Table>
          </div>
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

export default connect(mapStateToProps)(Nidurstodur)

