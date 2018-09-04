import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import SearchField from './SearchField';
import InfoCard from './InfoCard';
import logo from './bolsa-de-valores.jpg';

const style = { 
  head: {
    height: "200px",
    width: "100%",
    backgroundColor: "grey"
  },
  card: {
    margin: "auto",
    padding: "8px"
  },
  logo: {
    maxHeight: "200px",
    width: "100%"
  }
}

class App extends Component {
  constructor(props, context){
    super(props);
    this.props = props;
    this.state = {
      infoCard: [],
    }
  }

  callbackSF(buscar, url){
    let id = this.state.infoCard.length + 1;
    let elements = {id, buscar, url};
    this.state.infoCard.unshift(elements);
    this.setState(this.state);

  }

  renderInfoCard(){
    return this.state.infoCard.map(ic => {
      return <InfoCard key={ic.id} infoCard={ic.buscar} url={ic.url}/>;
   });
  }
  
  render() {
    const {classes} = this.props;
    return (
      <div className="App">
        <div className= {classes.head} >
          <img className = {classes.logo} src = {logo} />
         <SearchField callbackFn={this.callbackSF.bind(this)}/>
        </div>
        <div className= {classes.card}>
          {this.renderInfoCard()}
        </div>
      </div>
    );
  }
}

export default withStyles(style)(App);
