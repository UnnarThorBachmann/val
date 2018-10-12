import React, { Component } from 'react';
import './App.css';
import ValAppBar from './components/ValAppBar.js';
import ValAppBar2 from './components/ValAppBar2.js';
import ValAppBar3 from './components/ValAppBar3.js';

import Flokkur from './components/Flokkur.js';

import Nidurstodur from './components/Nidurstodur.js';

import {connect} from 'react-redux';
import {changeBraut,changeMal} from './actions'; 
import Radio from '@material-ui/core/Radio';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Brautir, allir} from './helpers'
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';





class App extends Component {
  constructor(props) {
    super(props);
    this.state = {afangar: props.afangar, braut: props.braut, mal: props.mal,valid:[]}
  }
 
  
  change = event => {
    
    const {dispatch} = this.props;
    dispatch(changeBraut(event.target.value));

  };
  change2 = event => {
    
    const {dispatch} = this.props;
    dispatch(changeMal(event.target.value));

  };
  
  velja = name => event => {
   
    if (event.target.checked) {
      this.setState((prevState)=>({valid: prevState.valid.concat(name)}));
    }
    else {
      console.log('b')
      this.setState((prevState)=>({valid: prevState.valid.filter(item=>item !== name)}));
    }
  };


  componentWillReceiveProps(nextProps) {
    this.setState({afangar: nextProps.afangar, braut: nextProps.braut, mal: nextProps.mal});
  }
  componentWillMount() {
    
    this.setState({afangar: this.props.afangar, braut: this.props.braut, mal: this.props.mal});
  }
  render() {
    const {braut,mal} = this.state;
    const brautarsamsetning = Brautir[braut];
    
    const brautarsamsetning_alt = Object.keys(brautarsamsetning).reduce(function(acc,curr) {return {...acc, ...brautarsamsetning[curr]}},{})
    let adrir = {...allir};
    
    adrir = Object.keys(allir).reduce(function(acc,curr) {
        if (brautarsamsetning_alt[curr])
          return {...acc, [curr]: allir[curr].filter(item=> brautarsamsetning_alt[curr].indexOf(item) ===-1)};
        else
          return {...acc, [curr]: allir[curr]};
    },{});
    return (
      <div className="App" >
        <Route exact path="/" render ={() => (
          <ValAppBar/>
        )}/>
        <Route exact path="/annad" render ={() => (
          <ValAppBar2/>
        )}/>
         <Route exact path="/nidurstodur" render ={() => (
          <ValAppBar3/>
        )}/>
        <Route exact path="/" render ={() => (
          <div>
            <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around'}}>  
              <div>
                <h4>{braut}</h4>
                <div>
                  <Radio
                    checked={this.state.braut === 'Félagsfræðibraut'}
                    onChange={this.change}
                    value="Félagsfræðibraut"
                    name="radio-button-demo"
                    aria-label="Félagsfræðibraut"
                  />
                  <Radio
                    checked={this.state.braut === 'Náttúrufræðibraut'}
                    onChange={this.change}
                    value="Náttúrufræðibraut"
                    name="radio-button-demo"
                    aria-label="Náttúrufræðibraut"
                  />
                  <Radio
                    checked={this.state.braut === 'Viðskipta- og hagfræðibraut'}
                    onChange={this.change}
                    value="Viðskipta- og hagfræðibraut"
                    name="radio-button-demo"
                    aria-label="Viðskipta- og hagfræðibraut" 
                  />
                </div>
              </div>
              <div>
                <h4>{mal}</h4>
                <div>
                  <Radio
                    checked={this.state.mal=== 'Franska'}
                    onChange={this.change2}
                    value="Franska"
                    name="radio-button-demo"
                    aria-label="Franska"
                  />
                  <Radio
                    checked={this.state.mal === 'Spænska'}
                    onChange={this.change2}
                    value="Spænska"
                    name="radio-button-demo"
                    aria-label="Spænska"
                  />
                  <Radio
                    checked={this.state.mal === 'Þýska'}
                    onChange={this.change2}
                    value="Þýska"
                    name="radio-button-demo"
                    aria-label="Þýska" 
                  />
                </div>
              </div>
            </div>
            <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-start'}}>
            <div style={{width: "23%"}}>
              <Flokkur flokkur={brautarsamsetning['Bóknámskjarni']} heiti={'Bóknámskjarni'} sia={Object.keys(brautarsamsetning['Bóknámskjarni'])}/>
            </div>
            <div style={{width: "23%"}}>
              <Flokkur flokkur={brautarsamsetning['Þriðja']} heiti={'Þriðja mál'} sia={Object.keys(brautarsamsetning['Þriðja'])}/>
            </div>
            <div style={{width: "23%"}}> 
              <Flokkur flokkur={brautarsamsetning['Brautarkjarni']} heiti={'Brautarkjarni'} sia={Object.keys(brautarsamsetning['Brautarkjarni'])}/>
              {
                (brautarsamsetning['Brautarval']) &&
                <Flokkur flokkur={brautarsamsetning['Brautarval']} heiti={'Brautarval'} sia={Object.keys(brautarsamsetning['Brautarval'])}/>
              }
            </div>
            
          </div>
          </div>
          )}/>
          <Route exact path="/annad" render ={() => (
              <div>
              <div style={{padding: '2%'}}>
              <FormGroup row>
                {
                Object.keys(adrir).map(item =>
                  <FormControlLabel
                    key={item}
                    control={
                      <Checkbox
                        checked={this.state.valid[item]}
                        onChange={this.velja(`${item}`)}
                        value={`${item}`}
                      />
                    }
                    label={`${item}`}
                  />
                )}
              </FormGroup>
              </div>
              <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'space-around'}}> 
                <div style={{width: "23%"}}> 
                  <Flokkur flokkur={adrir} heiti={'Annað'} sia={this.state.valid}/>
                </div>
              </div>
              </div>
          )}/>
        <Route exact path="/nidurstodur" render ={() => (
          <Nidurstodur/>
        )}/>
        <div/>
      </div>
    );
  }
}

const mapStateToProps = (state)=> ({
    afangar: state.afangar,
    braut: state.braut,
    mal: state.mal
});

export default withRouter(connect(mapStateToProps)(App))
