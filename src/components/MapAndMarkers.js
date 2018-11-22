import React from "react";
import PropTypes from "prop-types";
import { withStyles } from "@material-ui/core/styles";
import GoogleMapReact from "google-map-react";
import MapMarker from "./MapMarker.js";

// import Marker from "./Marker/Marker.js";

const createMapOptions = () => {
  return {
    fullscreenControl: false,
    mapTypeControl: false,
    panControl: false,
    streetViewControl: false,
    zoomControl: "true",
    gestureHandling: "greedy"
  };
};

const styles = theme => ({});

class MapAndMarkers extends React.Component {
  static defaultProps = {
    center: {
      lat: 30,
      lng: -30
    },
    zoom: 0
  };

  render() {
    const { classes, locations, hoveredCardId, pageid } = this.props;

     let MapMarkers = locations.map((location, index) => {
        return (
          <MapMarker
            key={location.id}
            lat={location.lat}
            lng={location.lng}
            name={location.location_name}
            pageid={location.pageid}
            hoveredCardId={hoveredCardId}



            />
        );
      });

    return (
      <div style={{width:"100%", height:"100%"}}>
        <GoogleMapReact
          bootstrapURLKeys={{
            key: "AIzaSyBBvQLI7BPpXln_Jzl_tIUVH1f775C7GXM",
            v: "3.31"
          }}
          defaultCenter={this.props.center}
          defaultZoom={this.props.zoom}
          hoverDistance={20 / 2}
          options={createMapOptions}
        >
        {MapMarkers}

        </GoogleMapReact>
      </div>
    );
  }
}

MapAndMarkers.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(MapAndMarkers);