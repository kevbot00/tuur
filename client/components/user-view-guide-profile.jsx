
import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import UpComingTuurItem from './user-upcoming-tuurs-list-item';
import GridList from '@material-ui/core/GridList';
import GuidePackageList from './user-view-guide-profile-item';
import { Link, withRouter } from 'react-router-dom';
import Grid from '@material-ui/core/Grid';
import KeyboardArrowLeft from '@material-ui/icons/KeyboardArrowLeft';
import { theme, styles } from '../style-themes';

class GuidePackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      userEmail: '',
      packages: [],
    };
  }
  
  componentDidUpdate(){
    if ( !this.state.packages.length && !this.state.userEmail ){
      fetch('/api/guidePackages.php?email=' + this.props.guideInfo.email )
          .then(res => res.json())
          .then(packages => this.setState({ userEmail: this.props.guideInfo.email, packages }));
    } 
  }

  guidePackageListRender() {
    return this.state.packages.map((packageItem, id) => {
      return <GuidePackageList key={id} package={packageItem} />;
    });
  }
  
  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.marginBottomSpacingTwo} >
          <Typography className={classes.marginTop} /*style={{ paddingLeft: '16px' }}*/  variant="h5">
            Hosting Packages
          </Typography>
        </Container>
        <div className={classes.searchResultGuideListRoot}>
          <GridList className={classes.userUpcomingTuursListGridList} cols={1.5} cellHeight={300}>
            {this.guidePackageListRender()}
          </GridList>
        </div>
      </>

    );
  }
}

// const theme = createMuiTheme({
//   palette: {
//     primary: { main: '#3A8288' },
//     secondary: { main: '#A6C7C8' },
//     inherit: { main: '#A0C3C5' },
//     default: { main: '#f5e1da' }
//   }
// });

// const styles = theme => ({
//   marginTop: {
//     marginTop: theme.spacing(3)
//   },
//   avatar: {
//     width: 80,
//     height: 80
//   },
//   cardContainer: {
//     marginBottom: theme.spacing(1),
//     display: 'flex',
//     padding: 10,
//     width: '40rem'
//   },
//   marginBottom: {
//     marginBottom: theme.spacing(2)
//   },
//   marginLeft: {
//     marginLeft: theme.spacing(2)
//   },
//   root: {
//     display: 'flex',
//     flexWrap: 'wrap',
//     justifyContent: 'space-around',
//     overflow: 'hidden',
//     margin: theme.spacing(1)
//   },
//   gridList: {
//     flexWrap: 'nowrap',
//     transform: 'translateZ(0)',
//     margin: theme.spacing(2),
//     height: 260
//   },
//   margin: {
//     margin: theme.spacing(0.5),
//     fontSize: 33
//   },
//   marginTop2: {
//     marginTop: theme.spacing(4)
//   },
//   fab: {
//     margin: theme.spacing(1)
//   },
//   extendedIcon: {
//     marginRight: theme.spacing(1)
//   },
//   fontSize: {
//     fontSize: '2.5rem'
//   },
//   paddingRight: {
//     paddingRight: 20
//   }
// });

export default withRouter(withStyles(styles)(GuidePackages));
