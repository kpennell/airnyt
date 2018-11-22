import React, { Component } from "react";
import "./App.css";
import { MuiThemeProvider, createMuiTheme } from "@material-ui/core/styles";
import Header from "../components/Header.js";
import FilterBar from "./FilterBar.js";

import LocationsGrid from "../components/LocationsGrid.js";

import MapAndMarkers from "../components/MapAndMarkers.js";

import bucketlistjson from "../data/bucketlist.json";

import { withStyles } from "@material-ui/core/styles";

// http://nytrecsalaairbnb.surge.sh/

const matchChipsAndTags = function(chips, year) {
  return chips.some(function(chip) {
    // console.log(chip.label);
    // console.log(year);

    // console.log(typeof(chip.label));
    // console.log(typeof(year));

    return year === chip.label && chip.showing === true;
  });
};

const theme = createMuiTheme({
  palette: {
    primary: {
      light: "#ff8e8c",
      main: "#484848",
      dark: "#7E1541",
      contrastText: "#fff"
    },
    secondary: {
      light: "#008489",
      main: "#ff5a5f",
      dark: "#004e5a",
      contrastText: "#000"
    }
  },
  typography: {
    fontFamily: "'Poppins', sans-serif",
    fontSize: 14,
    textTransform: "none",
    color: "#484848",
    button: {
      textTransform: "none"
    },
    subtitle1: {
      fontWeight: 600,
      color: "#484848",
      fontSize: 14
    },
    h6: {
      fontSize: 16,
      fontWeight: 600,
      color: "#484848"
    }
  }
});

const styles = {
  planeIcon: {
    color: "#F44436",
    marginTop: 15,
    marginRight: 15,
    fontSize: 35
  },
  mapDiv: {
    height: "82vh",
    width: "70%",
    display: "inline-block",
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen
    }),
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  superParentDiv: {
    padding: "0px 0px 0px 30px",
    [theme.breakpoints.down("sm")]: {
      padding: "0px"
    }
  }
};
// https://www.colourlovers.com/palette/3498539/airbnb

class App extends Component {
  state = {
    locations: bucketlistjson,
    years: [
      {
        key: 0,
        label: 2011,
        showing: true
      },
      {
        key: 1,
        label: 2012,
        showing: true
      },
      {
        key: 2,
        label: 2013,
        showing: true
      },
      {
        key: 3,
        label: 2014,
        showing: true
      },
      {
        key: 4,
        label: 2015,
        showing: true
      },
      {
        key: 5,
        label: 2016,
        showing: true
      },
      {
        key: 6,
        label: 2017,
        showing: true
      },
      {
        key: 7,
        label: 2018,
        showing: true
      }
    ],
    mapShowing: true,
    filterValue: ""
  };

  toggleChipProperty = key => event => {
    let newyears = this.state.years.map(el => {
      if (el.key === key)
        return Object.assign({}, el, { showing: !el.showing });
      return el;
    });

    this.setState({ years: newyears });
  };

  handleSearch = e => {
    this.setState({ filterValue: e.target.value });
  };

  clearAllChips = () => {
    let newyears = this.state.years.map(el => {
      return Object.assign({}, el, { showing: false });
    });

    this.setState({ years: newyears });
  };

  selectAllChips = () => {
    let newyears = this.state.years.map(el => {
      return Object.assign({}, el, { showing: true });
    });

    this.setState({ years: newyears });
  };

  toggleMapShowing = () => {
    this.setState({ mapShowing: !this.state.mapShowing });
  };

  render() {
    //console.log(this.state.locations);

    const { classes } = this.props;

    let locationsOrderedByYear = this.state.locations.sort(function(a, b) {
      if (a.year < b.year) {
        return -1;
      }
      if (a.year > b.year) {
        return 1;
      }
      return 0;
    });

    let textfilteredlocations = locationsOrderedByYear.filter(location =>
      // value.title.toLowerCase().includes(this.state.filterValue.toLowerCase())
      location.location_name
        .toLowerCase()
        .includes(this.state.filterValue.toLowerCase())
    );

    let filteredlocations = textfilteredlocations.filter(location =>
      matchChipsAndTags(this.state.years, location.year)
    );

    // );

   // console.log(filteredlocations)

    return (
      <MuiThemeProvider theme={theme}>
        <div className={classes.superParentDiv}>
          <div>
            <Header
              handleSearch={this.handleSearch}
              filterValue={this.state.filterValue}
            />
          </div>
          <div>
            <FilterBar
              years={this.state.years}
              toggleChipProperty={this.toggleChipProperty}
              clearAllChips={this.clearAllChips}
              selectAllChips={this.selectAllChips}
              toggleMapShowing={this.toggleMapShowing}
              mapShowing={this.state.mapShowing}
            />
          </div>

          <div
            style={{
              marginTop: "21vh",
              height: "79vh",
              display: "flex",
              justifyContent: "space-between"
            }}>
            <LocationsGrid
              locations={filteredlocations}
              mapShowing={this.state.mapShowing}
            />
          </div>
        </div>
      </MuiThemeProvider>
    );
  }
}

export default withStyles(styles)(App);