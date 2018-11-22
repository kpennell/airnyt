import React from "react";
import PropTypes from "prop-types";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import { withStyles } from "@material-ui/core/styles";
import LocationCard from "./LocationCard.js";
import Grid from "@material-ui/core/Grid";

import { List, AutoSizer } from "react-virtualized";

const CARD_WIDTH = 340;

const styles = theme => ({
  root: {
    padding: "20px 85px",
    marginTop: 20,
    justifyContent: "flex-start"
  },
  Row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "flex-start",
    padding: "0 0.5rem",
    boxSizing: "border-box",
    marginBottom: "20px"
  },
  Item: {
    width: "340px",
    height: "305px",
    display: "inline-flex",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    margin: "15px 10px",
   
  },
  // parentList:{
  //   marginTop:"10px"
  // }
});

class LocationsGrid extends React.Component {
  render() {
    const { locations, classes } = this.props;

    return (


        <div style={{ marginTop:"10px", height: "80vh" }}>
       <AutoSizer>
       // The Autosizer component goes around the List component and you can see here the height 
       // and width props that it will pass to List

          {({ height, width }) => {
            const itemsPerRow = Math.floor(width / CARD_WIDTH) || 1; // A calculation to establish how many cards will go on each row.
            // The || 1 part is a simple hack that makes it work in a really small viewport (if someone totally collapses the window)
            const rowCount = Math.ceil(locations.length / itemsPerRow); // List will need the number of rows in order to be able to properly know what to render and what not to


            return (
              <div>
              
                <List
                  width={width}
                  height={height}

                  rowCount={rowCount}
                  rowHeight={CARD_WIDTH} 

                   // CARD_WIDTH is a constant of 340
                  rowRenderer={({ index, key, style }) => {
                    // This is where stuff gets interesting/confusing

                    // We are going to constantly update an array of items that our rowRenderer will render

                    const items = [];

                    // This array will have a start and an end.

                    // The start is the top of the window

                    // The bottom is the bottom of the window

                    // the for loop below will constantly be updated as the the user scrolls down




                    const fromIndex = index * itemsPerRow;
                    const toIndex = Math.min(
                      fromIndex + itemsPerRow,
                      locations.length
                    );

                    for (let i = fromIndex; i < toIndex; i++) {
                      let location = locations[i];
                      items.push(
                        <div className={classes.Item} key={i}>
                          <LocationCard location={location} />
                        </div>
                        // Each of these items has the LocationCard in them
                      );
                    }

                    return (
                      // They get rendered into the Row
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
        </div>
    );
  }
}

LocationsGrid.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(LocationsGrid);