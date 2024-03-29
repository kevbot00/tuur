import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import { theme, styles } from '../style-themes';

// const styles = theme => ({
//   tile: {
//     width: 300,
//     height: '100%'
//   },
//   font: {
//     fontFamily: 'Roboto',
//     fontSize: '1.3rem',
//     marginRight: theme.spacing(1)
//   },
//   titleBar: {
//     background:
//       'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
//   }
// });

class UpComingTuurItem extends Component {
  constructor(props) {
    super(props);
    this.state = {
    };
  }

  render() {
    const { classes } = this.props;
    return (
      <>
          <GridListTile className={classes.font} key={this.props.package.mainImage}>
            <img className={classes.userBookedTuursListItemTile} src={this.props.package.mainImage} alt={this.props.package.title} style={{borderRadius: '10px'}} />
            <GridListTileBar
              title={this.props.package.title}
              subtitle={<span>{this.props.package.description}</span>}
              classes={{
                root: classes.titleBar
              }} 
              style={{borderRadius: '10px'}}
            />
          </GridListTile>
      </>
    );
  }
}

export default withStyles(styles)(UpComingTuurItem);
