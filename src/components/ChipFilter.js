import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Avatar from "@material-ui/core/Avatar";
import Chip from "@material-ui/core/Chip";
import Paper from "@material-ui/core/Paper";
import TagFacesIcon from "@material-ui/icons/TagFaces";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";

const styles = theme => ({
  root: {
    
  },
  chipSection:{
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
    padding: "10px 10px",


  },
  button: {
    margin: 4,
    padding:"4px 12px"
  },
  chip: {
    margin: theme.spacing.unit / 2
  },
  active: {
    backgroundColor:theme.palette.secondary.light,
    borderRadius: "5.2px",
    color: "white",
    padding: "2px 5px",
    margin: 3,
    textTransform: "uppercase",
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
      [theme.breakpoints.down('xs')]: {
          fontSize: "13px",

    }
  },
  inactive: {
    backgroundColor: "white",
    color: theme.palette.secondary.light,
    border: "1px solid #8080806e",
    borderRadius: "5.2px",
    padding: "1px 4px",
    textTransform: "uppercase",
    margin: 3,
    cursor: "pointer",
    fontSize: "14px",
    fontWeight: "600",
     [theme.breakpoints.down('xs')]: {
          fontSize: "13px",

    }

  },
  buttonSection: {
    marginTop:"10px",
    display: "flex",
    justifyContent: "center"
  }
});

class ChipFilter extends React.Component {
  render() {
    const { classes } = this.props;

    return (
      <div className={classes.root}>
        <div className={classes.chipSection}>
        {this.props.years.map((year, index) => {
          return (
            <span
              key={index}
              onClick={this.props.toggleChipProperty(year.key)}
              className={year.showing ? classes.active : classes.inactive}
            >
              {year.label}{" "}
            </span>
          );
        })}
        </div>
         <div className={classes.buttonSection}>
          <Button
            variant="outlined"
            color="ternary"
            onClick={this.props.clearAllChips}
            className={classes.button}
          >
            Deselect All
          </Button>
          <Button
            variant="outlined"
            color="ternary"
            onClick={this.props.selectAllChips}
            className={classes.button}
          >
            Select All
          </Button>
       
        </div>

     
      </div>
    );
  }
}

ChipFilter.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(ChipFilter);