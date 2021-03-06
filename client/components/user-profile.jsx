import React, { Component } from 'react';
import UpComingTuursList from './user-upcoming-tuurs-list';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import { Link, withRouter } from 'react-router-dom';
import { ThemeProvider } from '@material-ui/styles';
import { theme, styles } from '../style-themes';


class UserProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      user: null
    };
    this.logoutHandler = this.logoutHandler.bind( this );
  }

  componentDidMount() {
    if (!this.props.user ) {
      fetch('/api/profile.php?id=' + this.props.match.params.id)
        .then(res => res.json())
        .then(response => {
          this.setState({ user: response });
        });
    } else {
      this.setState({ user: this.props.user });
    }
  }

  logoutHandler() {
    fetch( '/api/loginStatus.php?logout=true' )
    .then( res => res.json() )
    .then( data => {
      this.props.logout();
      const user = {
        isGuide: false,
        userEmail: false,
        id: null,
        loggedIn: false
      }
      this.setState({ user }, () => this.props.history.push('/login', user )) 
    })  
  }

  render() {
    const { classes } = this.props;
    if (!this.state.user) {
      return null;
    }
    return (
      <>
        <Container className={classes.marginBottom} >
          <Typography className={classes.marginTop} style={{ paddingLeft: '16px' }} variant="h4">
            {this.state.user.name}
          </Typography>
          <Typography className={classes.userProfileMarginLeft} variant="subtitle1">
            {this.state.user.location}
          </Typography>
        </Container>
        <Container>
          <Grid className={classes.marginBottom} container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item xs={4}>
              <Avatar alt="avatar" src={this.state.user.image} className={classes.userEditProfileAvatar} />
            </Grid>
            <Grid item xs={6}>
              <ThemeProvider theme={theme}>
                <Button type="button" fullWidth variant="contained" color="primary" component={Link} to={'/edit-profile/' + this.state.user.id} >
                  <Typography variant="button">Edit profile</Typography>
                </Button>
                {this.state.user.isGuide
                  ? <Button className={classes.buttonCreate} type="button" fullWidth variant="contained" color="secondary" component={Link} to={`/create-package/${this.props.match.params.id}`} >
                      Create Package
                    </Button>
                  : null
                }
              </ThemeProvider>
            </Grid>
          </Grid>
        </Container>
        <UpComingTuursList user={this.state.user} />
        {/* {this.state.user.isGuide
        ? <UpComingTuursList user={ this.state.user }/>
        : <Typography variant="h5" style={{ paddingLeft: '10px' }}>No Tuurs available</Typography>
      }  */}
      <Container style={{paddingBottom: '90px'}}>
          <ThemeProvider theme={theme}>
            <Button className={classes.buttonCreate} onClick={ this.logoutHandler } type="button" fullWidth variant="contained" color="secondary">Logout</Button>
          </ThemeProvider>
      </Container>
      </>

    );
  }
}

// const theme = createMuiTheme({
//   palette: {
//     primary: { main: '#3A8288' },
//     secondary: { main: '#5bd1d7' },
//     lightBeige: { main: '#f1f1f1' },
//     beige: { main: '#f5e1da' }
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
//   marginBottom: {
//     marginBottom: theme.spacing(3)
//   },
//   marginLeft: {
//     marginLeft: theme.spacing(2)
//   },
//   buttonCreate: {
//     color: 'white',
//     marginTop: 7
//   }
// });

export default withRouter( withStyles(styles)(UserProfile) );
