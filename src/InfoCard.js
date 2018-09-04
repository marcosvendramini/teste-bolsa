import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import classnames from 'classnames';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import Collapse from '@material-ui/core/Collapse';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import CloseIcon from '@material-ui/icons/Close';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const style = { 
  card: {
    width:"250px",
    float: "left",
    marginLeft: "8px"
  },
  media: {
    paddingTop: "250px",
    backgroundSize: "auto"
  },
  actions: {
    display: "flex"
  },
  expand: {
    transform: "rotate(0deg)",
    marginLeft: "auto"
  },
  expandOpen: {
    transform: "rotate(180deg)"
  },
  close: {
    position: "relative",
    float: "right"
  },
  cardtitle: {
    position: "absolute",
    maxWidth: "200px"
  },
  info: {
    position: "absolute"
  }
}

  class InfoCard extends Component {
    constructor(props, context){
      super(props);
      this.props = props;
      this.key = null;
      this.dateTime = new Date();
      this.state = {
        expanded: false,
        close: false
      }
    }

    handleExpandClick (e) {
      this.state.expanded = !this.state.expanded;
      this.setState(this.state);
    };

    handleClick(e){
      this.state.close= !this.state.clos;
      this.setState(this.state);
    }

    render() {
      const {classes} = this.props;
      return (
        !this.state.close? 
        <Card className={classes.card}>
            <IconButton className={classes.close} aria-label="Close" onClick={this.handleClick.bind(this)} >
              <CloseIcon />
            </IconButton>
          <CardMedia
            className={classes.media}
            image = {this.props.url.url}
            title={this.props.infoCard.companyName}
          />
          <CardContent>
            <Typography gutterBottom variant="headline" component="h2">
              {this.props.infoCard.companyName}
            </Typography>
          </CardContent>
          <CardContent className={classes.info}>
            <Typography component="p">
              Preço: $
              {this.props.infoCard.latestPrice}
            </Typography>
            <Typography component="p">
              Data:&nbsp;
              {this.props.infoCard.latestTime}
            </Typography>
          </CardContent>
          <CardActions className={classes.actions} disableActionSpacing>
            <IconButton
              className={classnames(classes.expand, {
                [classes.expandOpen]: this.state.expanded,
              })}
              onClick={this.handleExpandClick.bind(this)}
              aria-expanded={this.state.expanded}
              aria-label="Show more"
            >
              <ExpandMoreIcon />
            </IconButton>
          </CardActions>
          <Collapse in={this.state.expanded} timeout="auto" unmountOnExit>
            <CardContent>
              <Typography paragraph variant="body2">
                Setor:&nbsp;
                {this.props.infoCard.sector}
              </Typography>
              <Typography paragraph variant="body2">
                Maior Valor: $
                {this.props.infoCard.high}
              </Typography>
              <Typography paragraph variant="body2">
                Menor Valor: $
                {this.props.infoCard.low}
              </Typography>
              <Typography paragraph variant="body2">
                Mudança:&nbsp;
                {this.props.infoCard.change}
                %
              </Typography>
            </CardContent>
          </Collapse>
        </Card>
        :
        null
      );
    }
  }
  
export default withStyles(style)(InfoCard);
  

