import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import ValAppBar from './components/ValAppBar.js';
import Brautarkjarni from './components/Brautarkjarni.js';

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

const thridja = {
  Franska: ['FRAN1AF05','FRAN1AG05','FRAN1AU05'],
  Spænska: ['SPÆN1AF05','SPÆN1AG05','SPÆN1AU05'],
  Þýska: ['ÞÝSK1AF05','ÞÝSK1AG05','ÞÝSK1AU05']
};
const brautarkjarni = {
  "Félagsfræðibraut": {
                        Félagsfræði: ['FÉLA2KE05'],
                        Saga: ['SAGA3MM05'],
                        Sálfræði: ['SÁLF2AA05'],              
                      },
  "Náttúrufræðibraut": {
                        Eðlisfræði: ['EÐLI2GR05','EFNA2AM05','EFNA2GE05'],
                        Jarðfræði: ['JARÐ2JÍ05'],
                        Líffræði: ['LÍFF2LE05','LÍFF3EF05'],
                        Stærðfræði: ['STÆR2AM05','STÆR3FD05','STÆR2HV05','STÆR3RH05']
                      },
  "Viðskipta- og hagfræðibraut": {
                                    Bókfærsla: ['BÓKF1IB05', 'BÓKF2FB05'],
                                    Fjármál: ['FJMÁ2FF05'],
                                    Hagfræði: ['HAGF2AR05','HAGF2AÞ05'],
                                    Lögfræði: ['LÖGF2LÖ05'],
                                    Markaðsfræði: ['MARK2AM05'],
                                    Nýsköpun: ['NÝSK3SF05'],
                                    Stærðfræði: ['STÆR2AM05', 'STÆR3FD05', 'STÆR2HV05']
                                }
}


const fel_val = {
  Félagsfræði: ['FÉLA3AÐ05','FÉLA3ST05','FÉLA3ÞR05'],
  Fjölmiðlafræði: ['FJÖL1FS05'],
  Heimspeki: ['HEIM2IH05'],
  Kynjafræði: ['KYNJ1KY05'],
  Landafræði: ['LAND2AU05'],
  Mannréttindi: ['MARÉ2MR05'],
  Saga: ['SAGA2LS05','SAGA3KM05','SAGA2TS05','SAGA3MA05'],
  Sálfræði: ['SÁLF2FÖ05','SÁLF3AB05','SÁLF2UM05','SÁLF3LÍ05','SÁLF3ÞS05'],
  Umhverfisfræði: ['UMHV1SJ05']

}

class App extends Component {
  state = {braut: 'Félagsfræðibraut'}

  change = (braut)=> {
    this.setState({braut: braut});
  }
  render() {
    const {braut} = this.state;
    return (
      <div className="App" >
        <ValAppBar change={this.change}/>
        <h4>{braut}</h4>
        <div style={{display: 'flex',flexDirection: 'row',flexWrap: 'wrap', justifyContent: 'flex-start'}}>
        <div style={{width: "25%"}}>
          <Brautarkjarni boknamskjarni={boknamskjarni} heiti={'Bóknámskjarni'}/>
        </div>
        <div style={{width: "25%"}}>
          <Brautarkjarni boknamskjarni={thridja} heiti={'Þriðja mál'}/>
        </div>
        <div style={{width: "25%"}}> 
          <Brautarkjarni boknamskjarni={brautarkjarni[braut]} heiti={'Brautarkjarni'}/>
          {
            (braut == 'Félagsfræðibraut') &&
            <Brautarkjarni boknamskjarni={fel_val} heiti={'Brautarval'}/>
          }
        </div>
        </div>
      </div>
    );
  }
}

export default App;
