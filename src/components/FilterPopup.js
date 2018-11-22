import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import Popover from "@material-ui/core/Popover";

import ChipFilter from "./ChipFilter.js";

import Card from "@material-ui/core/Card";
import CardActions from "@material-ui/core/CardActions";
import CardContent from "@material-ui/core/CardContent";
import CardHeader from "@material-ui/core/CardHeader";

const styles = theme => ({
  typography: {
    margin: theme.spacing.unit * 2
  },
  popover: {
    maxWidth: "95%"
  },
  FilterPopup: {
    margin: "0 0px",
    minHeight: 20
  },
  rightPaper: {
    top: "20% !important",
    right: "1%",
    maxWidth: "40%",
    [theme.breakpoints.down("sm")]: {
      maxWidth: "95%",
      right: "0%",
      top: "10%"
    }
  },
  backDropStyling : {
     backgroundColor:"#ffffff94"
    
    // height: "79vh",
    // top: "21vh",
  },
  card: {},
  cardcontent: {
    "&:last-child": {
      paddingBottom: "15px"
    },
    [theme.breakpoints.down("xs")]: {
      padding: 10
    }
  },
  outlinedButton: {
    margin: "0 0px",
    minHeight: 20,
    padding: "4px 10px"
  },
  active:{
     margin: "0 0px",
    minHeight: 20,
    padding: "4px 10px",
    backgroundColor:theme.palette.secondary.light,
    color:"white"
  },
  inactive:{
     margin: "0 0px",
    minHeight: 20,
    padding: "4px 10px",

  }

});

class FilterPopup extends React.Component {
  state = {
    anchorEl: null,
    buttonActive:false
  };

  handleClick = event => {
    this.setState({
      anchorEl: event.currentTarget,
      buttonActive: !this.state.buttonActive

    });
  };

  handleClose = () => {
    this.setState({
      anchorEl: null,
      buttonActive: !this.state.buttonActive
    });
  };

  render() {
    const { classes } = this.props;
    const { anchorEl } = this.state;
    const open = Boolean(anchorEl);

    //console.log(this.state.buttonActive);

    return (
      <div className={classes.FilterPopup}>
        <Button
          className={this.state.buttonActive ? classes.active : classes.inactive}
          onClick={this.handleClick}
          variant="outlined"
          
        >
          Year
        </Button>

        <Popover
          id="simple-popper"
          open={open}
          anchorEl={anchorEl}
          onClose={this.handleClose}
          className={classes.popover}
          PaperProps={{ classes: { root: classes.rightPaper } }}
          BackdropProps={{
            classes: {
              root: classes.backDropStyling
            }
          }}
        >
          <Card className={classes.card}>
            <CardContent className={classes.cardcontent}>
              <ChipFilter
                years={this.props.years}
                toggleChipProperty={this.props.toggleChipProperty}
                clearAllChips={this.props.clearAllChips}
                selectAllChips={this.props.selectAllChips}
              />
            </CardContent>
          </Card>
        </Popover>
      </div>
    );
  }
}

FilterPopup.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(FilterPopup);