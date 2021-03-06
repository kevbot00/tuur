import React, { Component } from 'react';
import Container from '@material-ui/core/Container';
import Typography from '@material-ui/core/Typography';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Grid from '@material-ui/core/Grid';
import TextField from '@material-ui/core/TextField';
import AccountCircle from '@material-ui/icons/AccountCircle';
import Email from '@material-ui/icons/Email';
import LocationOn from '@material-ui/icons/LocationOn';
import { ThemeProvider } from '@material-ui/styles';
import { withStyles, createMuiTheme } from '@material-ui/core/styles';
import { theme, styles } from '../style-themes';

// const theme = createMuiTheme({
//   palette: {
//     primary: { main: '#3A8288' },
//     secondary: { main: '#A6C7C8' },
//     inherit: { main: '#A0C3C5' },
//     default: { main: '#f5e1da' }
//   }
// });

// const styles = theme => ({
//   margin: {
//     margin: theme.spacing(0.5),
//     fontSize: 33
//   },
//   textField: {
//     marginRight: theme.spacing(1),
//     width: '100%'
//   },
//   marginTop: {
//     marginTop: theme.spacing(2)
//   },
//   marginTop2: {
//     marginTop: theme.spacing(5)
//   },
//   avatar: {
//     width: 80,
//     height: 80
//   },
//   marginBottom: {
//     marginBottom: theme.spacing(2)
//   },
//   marginLeft: {
//     marginLeft: theme.spacing(0.5)
//   }
// });

class EditProfile extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: '',
      email: '',
      location: '',
      image: '',
      bio: '',
      user: {}
      // isGuide: this.props.user.isGuide
    };
    this.handleSubmit = this.handleSubmit.bind(this);
    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange() {
    const { name, value } = event.target;
    this.setState({
      [name]: value,
      inputErrors: { ...this.state.inputErrors, [name]: false }
    });
  }

  handleSubmit(evt) {
    evt.preventDefault();
    // const { name, email, location, bio, image } = this.state;
    if (!this.state.name.length || !this.state.email.length || !this.state.location.length || !this.state.bio.length) {
      this.setState({
        inputErrors: {
          name: !this.state.name,
          email: !this.state.email,
          location: !this.state.location,
          bio: !this.state.bio,
          image: !this.state.image
        }
      });
    } else {
      const { id, name, email, location, bio, image } = this.state;
      fetch('/api/profile.php?id=' + this.props.match.params.id, {
        method: 'PATCH',
        body: JSON.stringify({
          name: name,
          email: email,
          location: location,
          image: image,
          bio: bio
        })
      })
        .then(res => res.json());
      this.props.edit(this.state);
    }
  }

  componentDidMount() {
    fetch(`/api/profile.php?id=${this.props.match.params.id}`)
    .then(res => res.json())
    .then(data => {
      this.setState({
        name: data.name,
        email: data.email,
        location: data.location,
        image: data.image,
        bio: data.bio,
        isGuide: data.isGuide,
        id: data.id,
        loggedIn: data.auth
      });
    }
    );

  }

  render() {
    const { classes } = this.props;
    return (
      <>
        <Container className={classes.marginBottomSpacingTwo} >
          <Typography className={classes.signUpMarginTopSpacingTwo} variant="h4">
            {this.state.name}
          </Typography>
          <Typography className={classes.marginLeft} variant="subtitle1">
            {this.state.location}
          </Typography>
        </Container>
        <Container>
          <Grid className={classes.marginBottomSpacingTwo} container
            direction="row"
            justify="center"
            alignItems="center">
            <Grid item >
              <Avatar alt="avatar" src={this.state.image} className={classes.userEditProfileAvatar} />
            </Grid>
          </Grid>
        </Container>
        <Container>
          <Grid mx="auto" container component="form" justify="center" onSubmit={this.handleSubmit}>

            <Grid className={classes.root} container alignItems="flex-end">
              <Grid item xs={2}>
                <AccountCircle fontSize='inherit' />
              </Grid>
              <Grid item xs={10}>
                <TextField required fullWidth id="input-name" label="Name" name="name" value={this.state.name} onChange={this.handleInputChange} />
              </Grid>
            </Grid>
            <Grid className={classes.root} container alignItems="flex-end">
              <Grid item xs={2}>
                <Email fontSize='inherit' />
              </Grid>
              <Grid item xs={10}>
                <TextField required fullWidth id="input-email" label="Email" name="email" value={this.state.email} onChange={this.handleInputChange} />
              </Grid>
            </Grid>

            <Grid className={classes.root} container alignItems="flex-end">
              <Grid item xs={2}>
                <LocationOn fontSize='inherit' />
              </Grid>
              <Grid item xs={10}>
                <TextField required fullWidth id="input-location" label="location" name="location" value={this.state.location} onChange={this.handleInputChange} />
              </Grid>
            </Grid>

            <Grid className={classes.root} container alignItems="flex-end">
              <Grid item xs={12}>
                <TextField required fullWidth id="input-imageUrl" label="Upload your image(URL)" name="image" value={this.state.image} onChange={this.handleInputChange} />
              </Grid>
            </Grid>

            <Grid className={classes.root} container alignItems="flex-end">
              <Grid item xs={12}>
                <TextField
                  id='outlined-textarea'
                  label='Tell us about yourself'
                  required
                  value={this.state.bio}
                  multiline
                  fullWidth
                  rowsMax={3}
                  className={classes.createPackageTextField}
                  margin='normal'
                  name="bio"
                  onChange={this.handleInputChange}
                />
              </Grid>
            </Grid>

            <Grid className={classes.userEditProfileMarginTop} container justify="center" >
              <ThemeProvider theme={theme}>
                <Button type="submit" className={classes.root} fullWidth variant="contained" color="primary" onClick={this.handleSubmit}>
                  <Typography variant="body1" gutterBottom>Submit</Typography>
                </Button>
              </ThemeProvider>
            </Grid>
          </Grid>
        </Container>
      </>
    );
  }
}

export default withStyles(styles)(EditProfile);
