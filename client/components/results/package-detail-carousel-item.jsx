import React, {Component} from 'react';
import { withStyles } from '@material-ui/core/styles';
import { styles } from '../../style-themes';

class CarouselImage extends Component {
  constructor( props ){
    super( props );
  }

  render(){
    const { classes } = this.props;
    console.log( classes );
    return (
      <div className={`${classes.divStyle} ${classes.productPreview}`} onClick={this.props.click }>
        <img id={ this.props.id } className={classes.imgStyle} src={ this.props.images }/>
      </div>
    )
  }
}

// const divStyle = {
//   width: '47px',
//   height: '40px',
//   border: '1px solid gray',
//   marginRight: '5px',
//   '&:hover': {
//     opacity: 1
//   }
// };

// const styles = theme => ({
//   productPreview: {
//     width: '50px',
//     height: '50px',
//     margin: '5px',
//     opacity: 0.5,
//     '&:hover': {
//       opacity: 1
//     }
//   }
// });

// const imgStyle = {
//   width: '100%',
//   height: '100%',
//   backgroundRepeat: 'norepeat',
//   backgroundSize: '100% 100%',
//   '&:hover': {
//     opacity: 1
//   }
// };

export default withStyles(styles)(CarouselImage);


