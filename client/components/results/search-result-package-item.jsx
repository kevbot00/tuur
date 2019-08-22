import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import { Link, withRouter } from 'react-router-dom';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { styles } from '../../style-themes';

const SearchPackageItem = (props) => {
  const { classes } = props;

  const clickHandler = () => {
    props.history.push({
      pathname: `/package-details/ ${props.item.id}`, 
      state: { item: props.item, prevPath: props.location }
    })
  }
  
  return (
    <div onClick={clickHandler} hoveredStyle={{cursor: 'default'}}
    //  component={Link} to={{ pathname: `/package-details/ ${props.item.id}`, state: { item: props.item, prevPath: props.location } }}
     >
      <Card className={classes.card} >
        <CardHeader
          title={props.item.title}
        />
        <CardMedia
          className={classes.media}
          image={props.item.mainImage}
          title={props.item.title}
        />
        <CardContent>
          <Typography variant="body2" color="textSecondary" component="p" noWrap>
            {props.item.description}
          </Typography>
        </CardContent>
      </Card>

    </div>
  );
}

export default withRouter(withStyles(styles)(SearchPackageItem));
