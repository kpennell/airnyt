import React from "react";
import PropTypes from "prop-types";
import Slider from "react-slick";
import { withStyles } from "@material-ui/core/styles";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import CardMedia from "@material-ui/core/CardMedia";

import ChevronLeft from "@material-ui/icons/ChevronLeft";
import ChevronRight from "@material-ui/icons/ChevronRight";

//node_modules/slick-carousel/slick/slick-theme.css

function SampleNextArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ChevronRight
      className={className}
      style={{
        ...style,
        display: "block",
        color: "white",
        fontSize: "3em",
        right: "9px",
        zIndex: 1
      }}
      onClick={onClick}
    />
  );
}

function SamplePrevArrow(props) {
  const { className, style, onClick } = props;
  return (
    <ChevronLeft
      className={className}
      style={{
        ...style,
        display: "block",
        color: "white",
        fontSize: "3em",
        left: "9px",
        zIndex: 1
      }}
      onClick={onClick}
    />
  );
}

const styles = theme => ({
  media: {
    height: 190,
    objectFit: "cover",
    borderRadius: 5,
    opacity: 0.9,
    "&:hover": {
      opacity: "1"
    }
  },
  dotsCustomClass: {
    color: "white"
  }
});

const settings = {
  dots: true,
  infinite: true,
  speed: 300,
  slidesToShow: 1,
  slidesToScroll: 1,
  nextArrow: <SampleNextArrow />,
  prevArrow: <SamplePrevArrow />,

  appendDots: dots => (
    <div
      style={{
        bottom: 10
      }}
    >
      <ul style={{ margin: "0px", padding: 0 }}> {dots} </ul>
    </div>
  )
};



class CardCarousel extends React.Component {
  render() {
    const { classes, location } = this.props;

    return (
      <div>
        <Slider {...settings}>
          <div>
            <CardMedia
              component="img"
              className={classes.media}
              image={location.image1}
            />
          </div>
          {location.image2 && (
            <div>
              <CardMedia
                component="img"
                className={classes.media}
                image={location.image2}
              />
            </div>
          )}
          {location.image3 && (
            <div>
              <CardMedia
                component="img"
                className={classes.media}
                image={location.image3}
              />
            </div>
          )}{" "}

    
        </Slider>
      </div>
    );
  }
}

CardCarousel.propTypes = {
  classes: PropTypes.object.isRequired
};

export default withStyles(styles)(CardCarousel);