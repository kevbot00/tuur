import React, { Component } from 'react';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActionArea from '@material-ui/core/CardActionArea';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Grid from '@material-ui/core/Grid';
import MatGeocoder from 'react-mui-mapbox-geocoder';
import Slider from 'react-slick';
import { Link } from 'react-router-dom';
import MoreVert from '@material-ui/icons/MoreVert';
import { generateKeyPair } from 'crypto';
import { Route, Switch, withRouter } from 'react-router-dom';
import { theme, styles } from '../style-themes';
import GridList from '@material-ui/core/GridList';


// const theme = createMuiTheme({
//   palette: {
//     // primary: { main: '#8FD0D6' },
//     primary: { main: '#3A8288' },
//     secondary: { main: '#5bd1d7' },
//     lightBeige: { main: '#f1f1f1' },
//     beige: { main: '#f5e1da' }
//   }
// });

// const imgStyle = {
//   width: '100%',
//   height: '70px',
//   backgroundRepeat: 'norepeat',
//   backgroundSize: '100% 100%',
//   '&:hover': {
//     opacity: 1
//   }
// };

// const styles = theme => ({
//   card: {
//     maxWidth: 370
//   },
//   media: {
//     height: 350
//   },
//   marginTop: {
//     marginTop: theme.spacing(8)
//   },
//   marginBottom: {
//     marginBottom: theme.spacing(4)
//   },
//   marginBottom2: {
//     marginBottom: theme.spacing(2)
//   },
//   tile: {
//     width: 200,
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
//   },
//   aboutUs: {
//     position: 'absolute',
//     top: 20,
//     right: '11px',
//     color: '#a49f9f',
//     fontSize: '20px'
//   },
//   buttonMargin: {
//     margin: '.35em 0'
//   }
// });

class Search extends Component {
  constructor(props) {
    super(props);
    this.state = {
      location: {
        name: '',
        coordinates: []
      },
      package: null
    };
    this.handleClick = this.handleClick.bind(this);
    this.handleSelect = this.handleSelect.bind(this);
    this.fetchPackages = this.fetchPackages.bind(this);
    this.aboutUs = this.aboutUs.bind(this);
  }

  handleClick() {
    this.props.search(this.state.location);
    this.props.history.push({
      pathname: '/results',
      search: `?location=${this.state.location.name}&coordinates=${this.state.location.coordinates[0]}+${this.state.location.coordinates[1]}`
    });
  }

  handleSelect(result) {
    this.setState({
      location: {
        name: result.place_name,
        coordinates: result.geometry.coordinates,
        toggleStatus: true
      }
    });
  }

  fetchPackages() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(response => this.setState({ package: response }));
  }

  componentDidMount() {
    this.fetchPackages();
  }

  aboutUs() {
    this.props.history.push('/about-us');
  }

  render() {
    const { classes } = this.props;
    const geocoderApiOptions = {
      country: 'us',
      proximity: { longitude: -118.243683, latitude: 34.052235 }
    };
    const settings = {
      dots: true,
      infinite: true,
      slidesToShow: 2,
      slidesToScroll: 1,
      autoplay: true,
      speed: 2000,
      autoplaySpeed: 4000,
      cssEase: 'linear',
      adaptiveHeight: true
    };

    let packages = '';
    if (this.state.package) {
      packages = this.state.package.map((article, index) => {
        return (
          <Grid key={index} component={Link} to={{ pathname: '/package-details/' + article.id, state: { item: article } }}>
            <img src={article.mainImage} alt={article.title} style={{ height: '120px', width: '100%', border: '6px solid white' }} />
          </Grid>
        );
      });
    }
    return (
      <div style={{ fontSize: 0 }}>
        <img className={classes.logInImgStyle} src="images/logo2.png" alt="logo" />
        <div className={classes.aboutUs} component='a' onClick={this.aboutUs} ><MoreVert style={{ fontSize: '30px' }} /></div>
        <img style={{ width: '100%', height: '260px' }} src="images/search-main-image.jpg" alt="mainImage" />

        <Grid justify="center" className={classes.searchMarginTop} container>
          <Grid item xs={10}>
            <MatGeocoder
              inputPlaceholder="Where do you want to go?"
              accessToken={'pk.eyJ1IjoiamVub25nMTkiLCJhIjoiY2p2MzJoZHFoMDIxejQ0czNvYXF2azNnNSJ9.El0sFq0rePnWEbFC4RwVTQ'}
              showLoader={true}
              showInputContainer={false}
              autocomplete={true}
              fuzzyMatch={true}
              {...geocoderApiOptions}
              onSelect={this.handleSelect}
            />
          </Grid>
        </Grid>

        <Grid justify="center" container className={classes.searchMarginBottom} >
          <Grid className={classes.marginTop} container justify="center" >
            <Grid item xs={10}>
              <ThemeProvider theme={theme}>
                <Button type="button" fullWidth variant="contained" color="primary" component='a' onClick={this.handleClick}>
                  <Typography variant="body1" className={classes.buttonMargin}>Search</Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Grid>

        <Grid justify="center" container>
          <Typography variant="h6">
            Popular Destinations
          </Typography>
        </Grid>

        <Grid style={{ padding: '20px 0 100px' }} justify="center" container>
          <Card style={{ height: '200px', width: '40%', margin: '10px'}} className={classes.searchPopularDestination} onClick={ () => this.props.history.push('/results?location=Irvine, California, United States&coordinates=-117.826+33.6857')} >
            <CardActionArea>
              <CardMedia
                component="img"
                src="http://c2eirvine.com/wp-content/uploads/2017/11/irvine-spectrum-720x720.jpg"
                title="Irvine"
              />
              <CardContent>
                <Typography gutterBottom variant="body1" component="h6">
                  Irvine, CA
              </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Grid>


      </div>
    );
  }
}
export default withRouter(withStyles(styles)(Search));
