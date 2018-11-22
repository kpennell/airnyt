import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import LocationCard from "./LocationCard.js";
import Grid from "@material-ui/core/Grid";
import SubtitleSection from "../components/SubtitleSection.js";
import { List, AutoSizer, InfiniteLoader } from "react-virtualized";

const CARD_WIDTH = 290;

const styles = theme => ({
  root: {
    justifyContent: "flex-start",
    height: "100%",
    width: "100%",
    display: "block"
  },
  Row: {
    display: "flex",
    // height:"390px",
    flexDirection: "row",
    justifyContent: "flex-start",
    [theme.breakpoints.down("sm")]: {
      justifyContent: "flex-start"
    },
    alignItems: "flex-start",
    boxSizing: "border-box",
    marginBottom: "20px"
  },
  Item: {
    width: CARD_WIDTH,
    // height: "425px",
    display: "inline-flex",
    flexDirection: "row",

    alignItems: "center",
    margin: "10px 10px 15px 0px",
    [theme.breakpoints.down("sm")]: {
      margin: "0"
    }
  }
  // parentList:{
  //   marginTop:"10px"
  // }
});

class LocationsGrid extends React.Component {
  state = {
    data: [],
    loading: false
  };

  loadedRowsMap = {};

  isRowLoaded = ({ index }) => {
    return !!this.loadedRowsMap[index];
   
  };

  loadMoreRows = ({ startIndex, stopIndex }) => {

    console.log(startIndex)

    console.log(stopIndex)
    
    let { data } = this.state;

    const newState = [];

    let stopIndexplus10 = stopIndex + 20

    for (let i = startIndex; i <= stopIndexplus10; i += 1) {
      this.loadedRowsMap[i] = 1;

      let location = this.props.locations[i];
      newState.push(location);
    }

    // if (data.length > 100) {
    //   this.setState({
    //     loading: false
    //   });
    //   return;
    // }

    //console.log('fired')

  

    this.setState({
      data: newState
    });
  };

  //   componentDidUpdate(prevProps, prevState){
  //   console.log(prevProps)
  //   console.log(prevState)
  //   console.log('updated!')
  // }



  // https://github.com/infamily/infinity-reactjs/blob/3c45cf4cffb77d33eff3d0092031ef094d1e964e/src/scenes/Home/TopicList/Grid/VirtualizedList.jsx

  // https://github.com/partha360/react-redux-ref-app/blob/4eefd270a4deb5599f1d21c6448ab245f8f78a9f/src/containers/moviesVirtualized.js

  render() {
    const { locations, classes } = this.props;

    //   console.log(this.state.data)

    // console.log(this.loadedRowsMap);

    //    console.log(typeof(this.loadedRowsMap));

    return (
      <div className={classes.root}>
        <div style={{ display: "inline" }}>
          <SubtitleSection />
        </div>

        <InfiniteLoader
          isRowLoaded={this.isRowLoaded}
          loadMoreRows={this.loadMoreRows}
          rowCount={locations.length}
        >
          {({ onRowsRendered, registerChild }) => (
            <AutoSizer>
              {({ height, width }) => {
                const itemsPerRow = Math.floor((width - 20) / CARD_WIDTH) || 1;
                const rowCount = Math.ceil(locations.length / itemsPerRow);

                // console.log(this.state.data.length)

                return (
                  <div>
                    <List
                      width={width}
                      height={height}
                      ref={registerChild}
                      onRowsRendered={onRowsRendered}
                      rowCount={rowCount}
                      rowHeight={CARD_WIDTH + 20}
                      rowRenderer={({ index, key, style }) => {
                        const items = [];

                        const fromIndex = index * itemsPerRow;

                        const toIndex = Math.min(
                          fromIndex + itemsPerRow,
                          this.state.data.length
                        )



                        for (let i = fromIndex; i < toIndex; i++) {
                          let location = this.state.data[i];

                          items.push(
                            <div className={classes.Item} key={i}>
                              <LocationCard location={location} />
                            </div>
                          );
                        }

                        //console.log(items);

                        return (
                          <div className={classes.Row} key={key} style={style}>
                            {items}
                          </div>
                        );
                      }}
                    />
                  </div>
                );
              }}
            </AutoSizer>
          )}
        </InfiniteLoader>
      </div>
    );
  }
}

LocationsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationsGrid);