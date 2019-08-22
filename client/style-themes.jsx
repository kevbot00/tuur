import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { fade } from '@material-ui/core/styles/colorManipulator';
import { ThemeProvider } from '@material-ui/styles';

export const theme = createMuiTheme({
  palette: {
    primary: { main: '#3A8288' },
    secondary: { main: '#5bd1d7' },
    lightBeige: { main: '#f1f1f1' },
    beige: { main: '#f5e1da' }
  }
});

// book-modal
export const useStyles = makeStyles(theme => ({
  root: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: -17
  },
  paper: {
    position: 'absolute',
    width: 325,
    height: 300,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2),
    outline: 'none'
  },
  snackbar: {
    backgroundColor: '#3A8288'
  },
  btnColor: {
    color: '#48dbfb'
  }
}));


export const styles = theme => ({
  // date-multiple-picker.jsx
  root: {
    margin: theme.spacing(0.5),
    fontSize: 33
  },
  pointer: {
    cursor: 'pointer'
  },
  marginBottom: {
    marginBottom: theme.spacing(3)
  },
  marginLeft: {
    marginLeft: -17
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  paddingRight: {
    paddingRight: 20
  },
  paddingLeft: {
    paddingLeft: 20
  },
  paper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(4),
    outline: 'none'
  },
  calender: {
    fontWeight: 'bolder',
    marginBottom: theme.spacing(3)
  },

  // mapbox.jsx
  mapContainer: {
    top: 0,
    position: 'relative',
    width: '100%',
    height: '100%'
  },

  // package-detail-carousel-item
  productPreview: {
    width: '50px',
    height: '50px',
    margin: '5px',
    opacity: 0.5,
    '&:hover': {
      opacity: 1
    }
  },
  divStyle: {
    width: '47px',
    height: '40px',
    border: '1px solid gray',
    marginRight: '5px',
    '&:hover': {
      opacity: 1
    }
  },
  imgStyle: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'norepeat',
    backgroundSize: '100% 100%',
    '&:hover': {
      opacity: 1
    }
  },

  // package-detail
  marginTop: {
    marginTop: theme.spacing(3)
  },
  marginBottomSpacingTwo: {
    marginBottom: theme.spacing(2)
  },
  card: {
    maxWidth: 400,
    marginBottom: theme.spacing(2)
  },
  media: {
    height: 0,
    paddingTop: '56.25%',
    backgroundSize: '100% 100%'
  },
  expand: {
    transform: 'rotate(0deg)',
    marginLeft: 'auto',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  expandOpen: {
    transform: 'rotate(180deg)'
  },
  fontSize: {
    fontSize: '2.5rem'
  },
  modalStyle: {
    top: 5,
    left: 5
  },
  packageDetailPaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  previewContainer: {
    width: '160px',
    height: '60px',
    display: 'flex',
    justifyContent: 'center',
    margin: ' auto auto 10px auto'
  },
  cover: {
    width: '100%',
    height: '100%'
  },
  link: {
    color: 'inherit'
  },

  // search-bar
  grow: {
    flexGrow: 1,
    display: 'inline-block'
  },
  menuButton: {
    marginRight: theme.spacing(2)
  },
  title: {
    display: 'none',
    [theme.breakpoints.up('sm')]: {
      display: 'block'
    }
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25)
    },
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      width: 'auto'
    },
    display: 'inline-block'
  },
  searchIcon: {
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'inline-block',
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputRoot: {
    color: 'inherit'
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 7),
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: 200
    }
  },
  sectionDesktop: {
    display: 'none',
    [theme.breakpoints.up('md')]: {
      display: 'flex'
    }
  },
  sectionMobile: {
    display: 'flex',
    [theme.breakpoints.up('md')]: {
      display: 'none'
    }
  },
  appBar: {
    display: 'inline-block',
    paddingBottom: 8,
    paddingTop: 5,
    margin: 0,
    paddingLeft: 5
  },
  display: {
    display: 'inline-block',
    paddingBottom: 5,
    margin: 0,
    paddingLeft: 30,
    whiteSpace: 'nowrap'
  },
  buttonDiv: {
    display: 'inline-block',
    marginLeft: 10,
    marginRight: 10
  },
  button: {
    backgroundColor: '#A6C7C8',
    '&.active, &:hover, &.active:hover': {
      backgroundColor: '#A6C7C8'
    }
  },
  buttonContainer: {
    paddingLeft: 15
  },
  paper: {
    position: 'absolute',
    width: '375px',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    // padding: 7,
    outline: 'none'
  },
  subtitle: {
    fontSize: 20
  },
  width: {
    width: 0,
    opacity: 0,
    position: 'absolute'
  },
  searchStyle: {
    fontSize: 30,
    paddingLeft: 10,
    paddingTop: 2
  },
  textField: {
    backgroundColor: 'white',
    padding: 5,
    marginLeft: 5,
    borderRadius: '7px'
  },
  marginLeft: {
    marginLeft: 20,
    paddingTop: 3
  },
  inputContainer: {
    paddingLeft: 15
  },

  // search-result-guide-list-item
  tile: {
    width: 200,
    height: '100%'
  },
  font: {
    fontFamily: 'Roboto',
    fontSize: '1.3rem',
    marginRight: theme.spacing(1)
  },
  titleBar: {
    background:
      'linear-gradient(to top, rgba(0,0,0,0.7) 0%, rgba(0,0,0,0.3) 70%, rgba(0,0,0,0) 100%)'
  },

  // search-result-guide-list
  cardContainer: {
    marginBottom: theme.spacing(1),
    display: 'flex',
    padding: 10,
    width: '40rem'
  },
  searchResultGuideListRoot: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
    margin: theme.spacing(1)
  },
  gridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin: theme.spacing(3),
    height: 180
  },
  // search-result-package-item
  marginTop: {
    marginTop: theme.spacing(3)
  },
  searchResultPackageItemCard: {
    maxWidth: 400,
    marginBottom: theme.spacing(0.5)
  },
  searchResultPackageItemMedia: {
    height: 0,
    paddingTop: '56.25%'
  },

  // about-us

  aboutUsCard: {
    display: 'flex',
    height: '150px',
    marginBottom: theme.spacing(1.5),
    width: '89%'
  },
  aboutUsCover: {
    width: '100%',
    height: '100%',
    margin: 0
  },
  content: {
    flex: '1 0 auto'
  },
  details: {
    display: 'flex',
    flexDirection: 'column'
  },
  paddingZero: {
    padding: 0
  },
  aboutUsTitle: {
    margin: theme.spacing(3)
  },
  back: {
    position: 'absolute',
    top: 20,
    left: '16px',
    color: '#a49f9f',
    fontSize: '20px'
  },
  icon:{
    fontSize: '26px',
    color: '#3A8288'
  },

  // bottom-nav
  bottomNavRoot: {
    width: '100%',
    maxWidth: '375px',
    position: 'fixed',
    bottom: 0,
    padding: '7px 0',
    zIndex: '100',
    borderTop: '1px solid #bbbbbb75'
  },

  // create-package
  createPackageDivStyle: {
    width: '47px',
    height: '40px',
    border: '1px solid gray',
    marginRight: '5px'
  },

  createPackageImgStyle: {
    width: '100%',
    height: '100%',
    backgroundRepeat: 'norepeat',
    backgroundSize: '100% 100%'
  },
  createPackageRoot: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap'
  },
  createPackageTextField: {
    marginRight: theme.spacing(1),
    width: '100%'
  },
  paddingTop: {
    paddingTop: theme.spacing(5)
  },
  noPadding: {
    padding: 2
  },
  createPackageMarginLeft: {
    marginLeft: theme.spacing(4),
    marginTop: theme.spacing(1)
  },
  chip: {
    width: '31%',
    fontSize: '1rem',
    margin: '2px'
  },
  chips: {
    display: 'flex',
    flexWrap: 'wrap'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 276,
    maxWidth: 276
  },
  createPackagePaper: {
    position: 'absolute',
    width: 400,
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: 7,
    outline: 'none'
  },
  input: {
    width: '100%'
  },
  form: {
    width: '100%'
  },
  dateChip: {
    display: 'flex',
    flexWrap: 'wrap',
    width: 40,
    marginRight: '4px',
    marginBottom: '4px'
  },
  close: {
    padding: theme.spacing(2)
  },
  info: {
    backgroundColor: theme.palette.primary.dark
  },
  fab: {
    margin: theme.spacing(1),
    right: 20,
    bottom: '77px',
    position: 'fixed'
  },
  extendedIcon: {
    marginRight: theme.spacing(1)
  },

  // itinerary-package-item

  itineraryPackageItemCard: {
    maxWidth: 400,
    marginBottom: '10px'
  },
  // media: { //Can use searchResultPackageItemMedia
  //   height: 0,
  //   paddingTop: '56.25%'
  // },
  itineraryPackageItemExpand: {
    transform: 'rotate(0deg)',
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest
    })
  },
  datail: {
    paddingLeft: '54%',
    textAlign: 'right'
  },

  // itinerary
  marginBottom: { //Can use marginBottomSpacingTwo
    marginBottom: theme.spacing(2)
  },

  // log-in
  logInMarginTop: {
    marginTop: theme.spacing(4)
  },
  logInMarginLeft: {
    marginLeft: -5
  },
  margin: {
    marginTop: theme.spacing(2),
    marginLeft: theme.spacing(2)
  },
  logInImgStyle: {
    width: '100%',
    height: '70px',
    backgroundRepeat: 'norepeat',
    backgroundSize: '100% 100%',
    '&:hover': {
      opacity: 1
    }
  },
  searchPopularDestination: {
    '&:hover': {
      opacity: 1
    }
  },

  // search

  // imgStyle: { //logInImgStyle
  //   width: '100%',
  //   height: '70px',
  //   backgroundRepeat: 'norepeat',
  //   backgroundSize: '100% 100%',
  //   '&:hover': {
  //     opacity: 1
  //   }
  // },
  searchCard: {
    maxWidth: 370
  },
  searchMedia: {
    height: 260
  },
  searchMarginTop: {
    marginTop: theme.spacing(8)
  },
  searchMarginBottom: {
    marginBottom: theme.spacing(4)
  },
  // marginBottom2: { //Can use marginBottomSpacingTwo
  //   marginBottom: theme.spacing(2)
  // },
  aboutUs: {
    position: 'absolute',
    top: 20,
    right: '11px',
    color: '#a49f9f',
    fontSize: '20px'
  },
  buttonMargin: {
    margin: '.35em 0'
  },

  // sign-up

  // margin: { // Can use root
  //   margin: theme.spacing(0.5),
  //   fontSize: 33
  // },
  signUpPadding: {
    padding: theme.spacing(1)
  },
  paddingBottom: {
    paddingBottom: theme.spacing(1),
    paddingLeft: theme.spacing(1)
  },
  // textField: { //Can use createPackageTextField
  //   marginRight: theme.spacing(1),
  //   width: '100%'
  // },
  signUpMarginTop: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(5)
  },
  avatar: {
    width: 60,
    height: 60
  },
  signUpMarginTopSpacingTwo: {
    marginTop: theme.spacing(2)
  },

  // user-booked-tuurs-list-item

  userBookedTuursListItemTile: {
    width: 300,
    height: '100%'
  },

  // user-edit-profile
  // margin: { // Can use root
  //   margin: theme.spacing(0.5),
  //   fontSize: 33
  // },
  // textField: { //Can use createPackageTextField
  //   marginRight: theme.spacing(1),
  //   width: '100%'
  // },
  signUpMarginTopSpacingTwo: { //Can use signUpMarginTop
    marginTop: theme.spacing(2)
  },
  userEditProfileMarginTop: { //MarginTop2
    marginTop: theme.spacing(5)
  },
  userEditProfileAvatar: {
    width: 80,
    height: 80
  },
  // marginBottom: { //Can use marginBottomSpacingTwo
  //   marginBottom: theme.spacing(2)
  // },
  userEditProfileMarginLeft: {
    marginLeft: theme.spacing(0.5)
  },

  // user-profile

  // avatar: { //Can use userEditProfileAvatar
  //   width: 80,
  //   height: 80
  // },
  userProfileMarginLeft: {
    marginLeft: theme.spacing(2)
  },
  buttonCreate: {
    color: 'white',
    marginTop: 7
  },

  // user-upcoming-tuurs-list-item
  // tile: { //Can use userBookedTuursListItemTile
  //   width: 300,
  //   height: '100%'
  // },

  // user-upcoming-tuurs-list
  // avatar: { // Can use userEditProfileAvatar
  //   width: 80,
  //   height: 80
  // },
  // marginBottom: { //Can use marginBottomSpacingTwo
  //   marginBottom: theme.spacing(2)
  // },
  // marginLeft: { //Can use userProfileMarginLeft
  //   marginLeft: theme.spacing(2)
  // },
  // searchResultGuideListRoot: { //Can use userProfileMarginLeft
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   overflow: 'hidden',
  //   margin: theme.spacing(1)
  // },
  userUpcomingTuursListGridList: {
    flexWrap: 'nowrap',
    transform: 'translateZ(0)',
    margin: theme.spacing(2),
    height: 260
  },
  // margin: { //Can use root
  //   margin: theme.spacing(0.5),
  //   fontSize: 33
  // },
  // marginTop2: { //Can use logInMarginTop 
  //   marginTop: theme.spacing(4)
  // },
  userUpcomingTuursListFab: {
    margin: theme.spacing(1)
  },

  // user-view-guide-profile-item
  // tile: { // Can use userBookedTuursListItemTile
  //   width: 300,
  //   height: '100%'
  // },

  // user-view-guide-profile

  // avatar: { //Can use userEditProfileAvatar
  //   width: 80,
  //   height: 80
  // },
  // marginBottom: { //Can use marginBottomSpacingTwo
  //   marginBottom: theme.spacing(2)
  // },
  // marginLeft: { //Can use userProfileMarginLeft
  //   marginLeft: theme.spacing(2)
  // },
  // root: { //Can use userProfileMarginLeft
  //   display: 'flex',
  //   flexWrap: 'wrap',
  //   justifyContent: 'space-around',
  //   overflow: 'hidden',
  //   margin: theme.spacing(1)
  // },
  // userViewGuideProfileGridList: { 
  //   flexWrap: 'nowrap',
  //   transform: 'translateZ(0)',
  //   margin: theme.spacing(2),
  //   height: 260
  // },
  // margin: { //Can use root
  //   margin: theme.spacing(0.5),
  //   fontSize: 33
  // },
  // marginTop2: { //Can use logInMarginTop 
  //   marginTop: theme.spacing(4)
  // },
  // fab: { //Can use userUpcomingTuursListFab
  //   margin: theme.spacing(1)
  // },

  // user-view-profile

  // avatar: { //Can use userEditProfileAvatar
  //   width: 80,
  //   height: 80
  // },
  // marginLeft: { //Can use userProfileMarginLeft
  //   marginLeft: theme.spacing(2)
  // },

});

// import { theme, styles } from '../style-themes';

