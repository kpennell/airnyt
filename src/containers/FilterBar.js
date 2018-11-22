import React from "react";
import PropTypes from "prop-types";

import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";

import Typography from "@material-ui/core/Typography";
import InputBase from "@material-ui/core/InputBase";
import { withStyles } from "@material-ui/core/styles";
import SearchIcon from "@material-ui/icons/Search";
import Grid from "@material-ui/core/Grid";
import AddLocation from "@material-ui/icons/AddLocation";
import Button from "@material-ui/core/Button";
import FormGroup from "@material-ui/core/FormGroup";
import FormControlLabel from "@material-ui/core/FormControlLabel";
import Switch from "@material-ui/core/Switch";

import FilterPopup from "../components/FilterPopup.js";

const styles = theme => ({
  header: {
    height: "65px",
    color: "#f44336",
    backgroundColor: "white",
    boxShadow: "none",
    borderBottom: "1px solid #e2e2e2",
    marginTop: 80
  },
  toolbar: {
    height: "65px",
    display: "flex",
    justifyContent: "space-between",
    padding: "0 40px 0 30px"
  },
  leftGrid: {
    display: "flex",
    justifyContent: "flex-start",
    alignItems:"center"
  },
  rightGrid:{
     display: "flex",
    justifyContent: "flex-end",
    alignItems:"center",
       [theme.breakpoints.down('sm')]: {
      display:"none"
    },

  },
  root: {
    width: "100%"
  },

  buttons: {
    margin: "0 0px",
    minHeight: 20,
    padding: "5px 10px"
  },
  title: {
    display: "none",
    [theme.breakpoints.up("sm")]: {
      display: "block"
    }
  },
  AirBnbSwitchBase: {
    '&$AirBnbChecked': {
      color: "white",
      '& + $AirBnbBar': {
        backgroundColor: theme.palette.secondary.light,
      },
    },
    transition: theme.transitions.create('transform', {
      duration: theme.transitions.duration.shortest,
      easing: theme.transitions.easing.sharp,
    }),
  },
  AirBnbChecked: {
    transform: 'translateX(15px)',
    '& + $AirBnbBar': {
      opacity: 1,
      border: 'none',
    },
  },
  AirBnbBar: {
    borderRadius: 25,
    width: 48,
    height: 31,
    marginTop: -16,
    marginLeft: -24,
    border: 'solid 1px',
    borderColor: theme.palette.secondary.light,
    backgroundColor: theme.palette.grey[50],
    opacity: 1,
    transition: theme.transitions.create(['background-color', 'border']),
  },
  AirBnbIcon: {
    width: 30,
    height: 30,
  },
  AirBnbIconChecked: {
    boxShadow: theme.shadows[1],
  },
});

class FilterBar extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <AppBar position="fixed" className={classes.header}>
          <Toolbar className={classes.toolbar}>
            <Grid container spacing={24}>
              <Grid item xs={6} className={classes.leftGrid}>
                <FilterPopup
                  years={this.props.years}
                  toggleChipProperty={this.props.toggleChipProperty}
                  clearAllChips={this.props.clearAllChips}
                  selectAllChips={this.props.selectAllChips}
                />
              </Grid>

              <Grid item xs={6} className={classes.rightGrid}>
                <FormGroup row>
                  
                  <FormControlLabel
                    control={
                      <Switch
                        checked={this.props.mapShowing}
                        onChange={this.props.toggleMapShowing}
                        value="checkedB"

                        classes={{
                          switchBase: classes.AirBnbSwitchBase,
                          bar: classes.AirBnbBar,
                          icon: classes.AirBnbIcon,
                          iconChecked: classes.AirBnbIconChecked,
                          checked: classes.AirBnbChecked
                          }}
                      />
                    }
                    label="Show Map"
                    labelPlacement="start"
                  />
         
                </FormGroup>
              </Grid>
            </Grid>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}
FilterBar.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterBar);