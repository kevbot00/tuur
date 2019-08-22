import React, { Component } from 'react';
import { withStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Card from '@material-ui/core/Card';
import Typography from '@material-ui/core/Typography';
import SearchPackageItem from './search-result-package-item';
import TOKEN from './mapbox-token';
import queryString from'query-string';
import { Link, withRouter } from 'react-router-dom';
import { filter } from 'minimatch';
import { theme, styles } from '../../style-themes';


// const styles = theme => ({
//   marginTop: {
//     marginTop: theme.spacing(3)
//   },
//   marginBottom: {
//     marginBottom: theme.spacing(2)
//   }
// });

class SearchPackages extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationQueryString: queryString.parse(this.props.history.location.search),
      locationQueryStringUrl: this.props.history.location.search,
      packages: [],
      fetchResult: null,
      fetchCoordinates: [],
      filteredTuurs: [],
      dates: {
        start: null,
        end: null
      },
      tags: [],
      isLoading: true,
    };

    this.fetchPackages = this.fetchPackages.bind(this);
    this.filterDates = this.filterDates.bind(this);
    this.filterTags = this.filterTags.bind(this);
    this.filterTuurs = this.filterTuurs.bind(this);
    this.checkAvailability = this.checkAvailability.bind(this);
  }

  componentDidMount() {
    this.fetchPackages();
  }

  componentDidUpdate(prevProps) {
    const currentUrl =  this.props.history.location.search.replace( / /g, '%20');
    const stateQueryUrl = this.state.locationQueryStringUrl.replace( / /g, '%20');
    if ( currentUrl !== stateQueryUrl){
      return this.fetchPackages();
    } 
  }

  fetchPackages() {
    fetch('/api/package.php')
      .then(res => res.json())
      .then(packages => {
        this.fetchLocation(packages)
      });
  }

  fetchLocation(packages) {
    const locationQueryString = queryString.parse(this.props.history.location.search);
    fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${locationQueryString[location]}.json?access_token=${TOKEN}`)
      .then(res => res.json())
      .then(fetchCoordinates => {
        this.mapTuurs(fetchCoordinates, packages)
      });
  }

  mapTuurs(fetchCoordinates, packages) {
    let mapArray = packages.map(this.getTuurLocationData);
    Promise.all(mapArray).then(tuurCoordinates => this.filterTuurs(fetchCoordinates, packages, tuurCoordinates));
  }

  async getTuurLocationData(tuur) {
    const resp = await fetch(`https://api.mapbox.com/geocoding/v5/mapbox.places/${tuur.location}.json?access_token=${TOKEN}`);
    const respJson = await resp.json();
    return {
      tuur,
      coord: respJson.features[0].center
    };
  }

  filterTuurs(fetchCoordinates, packages, tuurCoordinates) {
    const locationQueryString = queryString.parse(this.props.history.location.search);
    const coordinates = locationQueryString.coordinates.split(' ');
    let filterTuurs = [];
    let tooFar = [];
    let tags = [];
    let dates = {
      start:null,
      end: null
    };
    if ( locationQueryString.tags ){
      tags = locationQueryString.tags.split(' ');
    }
    if ( locationQueryString.dates ){
      let filteredDates = locationQueryString.dates.split(' ');
      dates.start = filteredDates[0];
      dates.end = filteredDates[1];
    }
    for (let i = 0; i < tuurCoordinates.length; i++) {
      if (tuurCoordinates[i].coord[0] < parseFloat(coordinates[0]) - 1 || tuurCoordinates[i].coord[0] > parseFloat(coordinates[0]) + 1 || tuurCoordinates[i].coord[1] < parseFloat(coordinates[1]) - 0.2 || tuurCoordinates[i].coord[1] > parseFloat(coordinates[1]) + 0.2) {
        tooFar = [...tooFar, tuurCoordinates[i]];
      } else {
        filterTuurs = [...filterTuurs, tuurCoordinates[i]];
      }
    }

    if ( tags.length === 0 && !dates.start ) return this.setTuurPackages( filterTuurs );
    if ( tags.length && !dates.start || tags.length && dates.start ) return this.filterTags( filterTuurs, tags , dates);
    if (tags.length === 0 && dates.start) return this.filterDates( filterTuurs, dates);
    // if ( this.filterTags(filterTuurs, tags);
  }

  setTuurPackages( filteredTuurs ){
    this.setState({
      filteredTuurs,
      isLoading: false,
      locationQueryStringUrl: this.props.history.location.search
    })
  }

  filterTags( filterTuurs, tags, dates ) {
    const locationQueryString = queryString.parse(this.props.history.location.search);
  
    let tagArray = [];
    for (let i = 0; i < filterTuurs.length; i++) {
      for (let j = 0; j < tags.length; j++) {
        for (let k = 0; k < JSON.parse(filterTuurs[i].tuur.tags).length; k++) {
          if (JSON.parse(filterTuurs[i].tuur.tags)[k] === (tags[j])) {
            tagArray = [...tagArray, filterTuurs[i]];
          }
        }
      }
    }

    for (let h = 0; h < tagArray.length; h++) {
      for (let g = h + 1; g < tagArray.length; g++) {
        if (tagArray[h] === tagArray[g]) {
          tagArray.splice(g, 1);
        }
      }
      if ( dates.start ){
        this.filterDates( tagArray, dates );
      } else {
        this.setState({
          filteredTuurs: tagArray,
          isLoading: false,
          locationQueryStringUrl: this.props.history.location.search
        })
      }
    }
  }

  filterDates( filteredTuurs, dates ) {
    debugger;
    const begDate = new Date( dates.start );
    const endDate = new Date( dates.end );
    let begDateYear = begDate.getFullYear();
    let begDateMonth = begDate.getMonth() + 1;
    let begDateDay = begDate.getDate();
    const endDateYear = endDate.getFullYear();
    const endDateMonth = endDate.getMonth() + 1;
    const endDateDay = endDate.getDate();
    let dateArray = [];
    let availablePackage = [];
    let availableTuur = [];

    dateArray.push(new Date(begDateYear, begDateMonth, begDateDay));
    while (begDateMonth !== endDateMonth || begDateDay !== endDateDay) {
      if (begDateDay === 1) {
        begDateMonth = begDateMonth === 11 ? 0 : ++begDateMonth;
      }
      if (begDateMonth === 0 && begDateDay === 1) {
        begDateYear = begDateMonth === 1 ? ++begDateYear : begDateYear;
      }
      availableTuur = this.checkAvailability(filteredTuurs , begDateYear, begDateMonth, begDateDay);
      begDateDay = this.nextDay(begDateMonth, begDateDay);
      if (availableTuur) {
        availablePackage.push(availableTuur);
      }
    }

    if (begDateMonth === endDateMonth && begDateDay === endDateDay) {
      availableTuur = this.checkAvailability(filteredTuurs , begDateYear, begDateMonth, begDateDay);
    }
    this.setState({
      filteredTuurs: availableTuur,
      isLoading: false,
      locationQueryStringUrl: this.props.history.location.search
    });
  }

  checkAvailability(tagArray, year, month, day) {
    const returnArray = [];
    for (let i = 0; i < tagArray.length; i++) {
      let parseDate = JSON.parse(tagArray[i].tuur.dates);
      for (var value of parseDate) {
        const packageDate = new Date( value );
        const packageYear = packageDate.getFullYear();
        const packageMonth = packageDate.getMonth() + 1;
        const packageDay = packageDate.getDate();
        if (packageYear === year && packageMonth === month && packageDay === day) {
          returnArray.push(tagArray[i]);
        }
      }
    }
    return returnArray
  }

  nextDay(month, day) {
    // last day of month = 31
    if (month === 0 && day != 31) return ++day;
    // last day of month = 28
    if (month === 1 && day !== 28) return ++day;
    // last day of month = 31
    if (month === 2 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 3 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 4 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 5 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 6 && day !== 31) return ++day;
    // last day of month = 31
    if (month === 7 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 8 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 9 && day !== 31) return ++day;
    // last day of month = 30
    if (month === 10 && day !== 30) return ++day;
    // last day of month = 31
    if (month === 11 && day !== 31) return ++day;
    return 1;
  }

  renderPackage() {
    const packages = this.state.filteredTuurs.map((item, id) => {
      return <SearchPackageItem key={id} item={item.tuur} searchArea={ this.props.searchArea }/>;
    });
    return packages;
  }

  render() {
    console.log( this.props );
    const { classes } = this.props;
    if (this.state.isLoading === true) {
      return (
        <div style={{ height: '100px', width: '100px', margin: 'auto' }}>
          <img src='https://ui-ex.com/images/transparent-gif-loading-1.gif' style={{ width: '100%' }} />
        </div>
      );
    } else {
      return (
        <>
          <Container className={classes.marginBottom} >
            <Typography className={classes.marginTop} variant="h5">
              Tuurs
            </Typography>
          </Container>
          <Container style={{ paddingBottom: '80px' }}>
            {this.state.filteredTuurs.length === 0 ? <Typography variant="subtitle1">There are no tuurs that match the search criteria</Typography> : this.renderPackage()}
          </Container>
        </>
      );
    }
  }
}

export default withRouter( withStyles(styles)(SearchPackages));
