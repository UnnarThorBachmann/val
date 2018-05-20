import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValAppBar from './components/ValAppBar.js';
import ValAppBar2 from './components/ValAppBar2.js';

import Flokkur from './components/Flokkur.js';
import Nidurstodur from './components/Nidurstodur.js';

import afangar from './data/gogn.js';
import {connect} from 'react-redux';
import {changeBraut,changeMal} from './actions'; 
import Radio from '@material-ui/core/Radio';
import {withRouter} from 'react-router-dom';
import {Route} from 'react-router-dom';
import {Link} from 'react-router-dom';
import {Brautir, allir} from './helpers'






class App extends Component {
  constructor(props) {
    super(props);
    this.state = {afangar: {}, braut: 'Félagsfræðibraut', mal: 'Franska'}
  }
 
  
  change = event => {
    
    const {dispatch} = this.props;
    dispatch(changeBraut(event.target.value));

  };
  change2 = event => {
    
    const {dispatch} = this.props;
    dispatch(changeMal(event.target.value));

  };


  componentWillReceiveProps(nextProps) {
    this.setState({afangar: nextProps.afangar, braut: nextProps.braut, mal: nextProps.mal});
  }

  render() {
    const {braut,mal} = this.state;
    const brautarsamsetning = Brautir[braut];
    
    const brautarsamsetning_alt = Object.keys(brautarsamsetning).reduce(function(acc,curr) {return {...acc, ...brautarsamsetning[curr]}},{})
    let allir_alt = {...allir};
    
    allir_alt = Object.keys(brautarsamsetning_alt).reduce(function(acc,curr) {
      return {...acc, [curr]: allir[curr].filter(item=> brautarsamsetning_alt[curr].indexOf(item) ===-1)};

    },{});
    return (
      <div className="App" >
        <Route exact path="/" render ={() => (
          <ValAppBar/>
        )}/>
        <Route exact path="/nidurstodur" render ={() => (
          <ValAppBar2/>
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
              <Flokkur flokkur={brautarsamsetning['Bóknámskjarni']} heiti={'Bóknámskjarni'}/>
            </div>
            <div style={{width: "23%"}}>
              <Flokkur flokkur={brautarsamsetning['Þriðja']} heiti={'Þriðja mál'}/>
            </div>
            <div style={{width: "23%"}}> 
              <Flokkur flokkur={brautarsamsetning['Brautarkjarni']} heiti={'Brautarkjarni'}/>
              {
                (brautarsamsetning['Brautarval']) &&
                <Flokkur flokkur={brautarsamsetning['Brautarval']} heiti={'Brautarval'}/>
              }
            </div>
            <div style={{width: "23%"}}> 
              <Flokkur flokkur={allir_alt} heiti={'Annað'}/>
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
