import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputAdornment from '@material-ui/core/InputAdornment';
import SearchIcon from '@material-ui/icons/Search';
import Paper from '@material-ui/core/Paper';
import axios from 'axios';

const style = { 
    textf: {
      width: "100%"
    },
    paper: {
      position: "absolute",
      left: "0", 
      right: "0",
      marginLeft: "auto",
      marginRight: "auto",
      width: "400px",
      padding: "8px",
      top: "120px"
    },
  }

  class SearchField extends Component {
    constructor(props, context){
      super(props);
      this.props = props;
      this.key = null;
      this.state = {
        busca: "",
        stockInfo: {},
        url: {}
      }
    }
    
    handleChange(e){
      this.state.busca=e.target.value;
      this.setState(this.state);
    }

    handleKeyPress(e){
      if (e.keyCode==13){
        axios.get(`https://api.iextrading.com/1.0/stock/${this.state.busca}/quote`).then((resp) => {
          this.state.stockInfo = resp.data;
          this.setState(this.state);
          axios.get(`https://api.iextrading.com/1.0/stock/${this.state.busca}/logo`).then((logo) => {
            this.state.url = logo.data;
            this.props.callbackFn(this.state.stockInfo, this.state.url)
            this.state.busca = "";
            this.setState(this.state);
          }).catch(e=>{
            alert("Empresa Inválida");
            this.state.busca = "";
            this.setState(this.state);
          }) 
        }).catch(e=>{
          alert("Empresa Inválida");
          this.state.busca = "";
          this.setState(this.state);
        })
      }
    }

    render() {
      const {classes} = this.props;
      return (
        <Paper className={classes.paper} elevation={1}>
          <TextField
            onChange= {this.handleChange.bind(this)}
            onKeyDown={this.handleKeyPress.bind(this)}
            className={classes.textf}
            id="input-with-icon-textfield"
            value={this.state.busca}
            InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon/>
              </InputAdornment>
            ),
            }}
          />
        </Paper>
      );
    }
  }

export default withStyles(style)(SearchField);
  

