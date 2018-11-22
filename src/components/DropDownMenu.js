import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import KeyboardArrowDown from '@material-ui/icons/KeyboardArrowDown';
import { withStyles } from "@material-ui/core/styles";

const options = [
  'None',
  'Atria',
  'Callisto',
  'Dione',
  'Ganymede',
  'Hangouts Call',
  'Luna',
  'Oberon',
  'Phobos',
  'Pyxis',
  'Sedna',
  'Titania',
  'Triton',
  'Umbriel',
];

const styles = theme => ({
  downCarrotButton: {
      padding:0,
      marginRight:15
  },
 
});

const ITEM_HEIGHT = 48;

class DropDownMenu extends React.Component {
  state = {
    anchorEl: null,
  };

  handleClick = event => {
    this.setState({ anchorEl: event.currentTarget });
  };

  handleClose = () => {
    this.setState({ anchorEl: null });
  };

  render() {
    const {  anchorEl } = this.state;
     const {  classes } = this.props;
    const open = Boolean(anchorEl);

    return (
      <div className={classes.DropDownMenuRoot}>
        <IconButton
          aria-label="More"
          aria-owns={open ? 'long-menu' : undefined}
          aria-haspopup="true"
          onClick={this.handleClick}
          className={classes.downCarrotButton}
        >
          <KeyboardArrowDown />
        </IconButton>
        <Menu
          id="long-menu"
          anchorEl={anchorEl}
          open={open}
          onClose={this.handleClose}
          PaperProps={{
            style: {
              maxHeight: ITEM_HEIGHT * 4.5,
              width: 200,
            },
          }}
        >
     

           
                  <MenuItem className={classes.menubuttons} color="inherit">
                    Help
                  </MenuItem>
                  <MenuItem className={classes.menubuttons} color="inherit">
                    Sign Up
                  </MenuItem>
                  <MenuItem className={classes.menubuttons} color="inherit">
                    Log in
                  </MenuItem>
             
       
        </Menu>
      </div>
    );
  }
}

export default withStyles(styles)(DropDownMenu);