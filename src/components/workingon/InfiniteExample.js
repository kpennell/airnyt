import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import { getMovies, setTitle } from '../actions';
import _ from 'lodash';
import PropTypes from 'prop-types';
import Card from '@material-ui/core/Card';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import Typography from '@material-ui/core/Typography';
import CircularProgress from '@material-ui/core/CircularProgress';
import Badge from '@material-ui/core/Badge';
import FavoriteBorder from '@material-ui/icons/FavoriteBorder';
import LinearProgress from '@material-ui/core/LinearProgress';
import CastCrew from '../components/castcrew';
import purple from '@material-ui/core/colors/purple';
import { InfiniteLoader, WindowScroller, List, AutoSizer } from 'react-virtualized';
import { getMovieList, getPageDetails, getTitle, searchResults } from '../reducers';

const MOVIE_POSTER_URL = 'https://image.tmdb.org/t/p/w500';
const STATUS_LOADING = 1;
const STATUS_LOADED = 2;
let itemsPerRow = 0;
class MoviesVirtualized extends PureComponent {
  constructor(props) {
    super(props);

    this.state = {
      loadedRowCount: 0,
      loadedRowsMap: {},
      loadingRowCount: 0,
      rowCount: 0
    };

    this.timeoutIdMap = {};
    this.rowRenderer = this.rowRenderer.bind(this);
    this.isRowLoaded = this.isRowLoaded.bind(this);
    this.loadMoreRows = this.loadMoreRows.bind(this);
  }
  componentDidMount() {
    //if (this.props.authenticated)
    this.props.getMovies(1);
    document.title = 'Movies Virtualized';
  }

  componentDidUpdate() {
    if (this.props.page.totalPages <= this.props.page.page)
      this.props.setTitle('Virtualized cards - You scrolled all pages');
    else
      this.props.setTitle(
        'Virtualized cards - Keep scrolling, you scrolled till page ' +
          this.props.page.page +
          ' / ' +
          this.props.page.totalPages
      );
  }

  componentWillUnmount() {
    Object.keys(this.timeoutIdMap).forEach(timeoutId => {
      clearTimeout(timeoutId);
    });
  }
  

  loadMoreRows({ startIndex, stopIndex }) {
    const { loadedRowsMap, loadingRowCount } = this.state;
    const increment = stopIndex - startIndex + 1;

    for (var i = startIndex; i <= stopIndex; i++) {
      loadedRowsMap[i] = STATUS_LOADING;
    }

    this.setState({
      loadingRowCount: loadingRowCount + increment
    });

    const timeoutId = setTimeout(() => {
      const { loadedRowCount } = this.state;

      delete this.timeoutIdMap[timeoutId];

      for (i = startIndex; i <= stopIndex; i++) {
        loadedRowsMap[i] = STATUS_LOADED;
      }

      this.setState({
        loadingRowCount: loadingRowCount - increment,
        loadedRowCount: loadedRowCount + increment
      });

      this.props.getMovies(Math.ceil(this.props.movies.length / 20) + 1);

      promiseResolver();
    }, 1000 + Math.round(Math.random() * 2000));

    this.timeoutIdMap[timeoutId] = true;

    let promiseResolver;

    return new Promise(resolve => {
      promiseResolver = resolve;
    });
  }

  isRowLoaded({ index }) {
    const { loadedRowsMap } = this.state;
    return !!loadedRowsMap[index]; // STATUS_LOADING or STATUS_LOADED
  }

  rowRenderer({ index, key, style }) {
    const movies = [];
    const fromIndex = index * itemsPerRow;
    const toIndex = Math.min(fromIndex + itemsPerRow, this.props.searchResults.length);
    for (let i = fromIndex; i < toIndex; i++) {
      const movieList = this.props.movies.find(
        movie => movie.id === parseInt(this.props.searchResults[i], 0)
      );

      const movie = movieList.movie;

      movies.push(
        <Card className="movieCard" key={movie.id}>
          <CardMedia className="media" image={MOVIE_POSTER_URL + movie.poster_path} />
          <Typography variant="subheading" className="mediaText">
            {movie.overview}
          </Typography>
          <CardContent>
            <Typography variant="headline">{movie.title}</Typography>
            <LinearProgress color="secondary" variant="determinate" value={movie.popularity} />
            <div>
              <Badge badgeContent={movie.vote_count} color="primary">
                <FavoriteBorder />
              </Badge>
              <Typography variant="body2">Date : {movie.release_date}</Typography>
            </div>
            <CastCrew castCrew={movieList.castcrew} />
          </CardContent>
        </Card>
      );
    }

    return (
      <div key={key} style={style} className="moviesRow">
        {movies}
      </div>
    );
  }

  render() {
    if (!_.isEmpty(this.props.searchResults)) {
      return (
        <div style={{ display: 'flex', height: '100vh', width: '100%' }}>
          <div style={{ flex: '1 1 auto' }}>
            <InfiniteLoader
              isRowLoaded={this.isRowLoaded}
              loadMoreRows={this.loadMoreRows}
              rowCount={
                this.props.page.page === this.props.page.totalPages
                  ? this.props.searchResults.length + 1
                  : this.props.searchResults.length
              }
              minimumBatchSize={4}
            >
              {({ onRowsRendered, registerChild }) => (
                <WindowScroller>
                  {({ height, isScrolling, scrollTop }) => (
                    <AutoSizer disableHeight>
                      {({ width }) => {
                        itemsPerRow = Math.floor(width / 320);
                        const rowCount = Math.ceil(this.props.searchResults.length / itemsPerRow);
                        return (
                          <List
                            ref={registerChild}
                            onRowsRendered={onRowsRendered}
                            isScrolling={isScrolling}
                            autoHeight
                            width={width}
                            height={height}
                            rowCount={rowCount}
                            rowHeight={820}
                            rowRenderer={this.rowRenderer}
                            scrollTop={scrollTop}
                          />
                        );
                      }}
                    </AutoSizer>
                  )}
                </WindowScroller>
              )}
            </InfiniteLoader>
          </div>
        </div>
      );
    } else {
      return (
        <CircularProgress
          style={{ color: purple[500], marginLeft: '50%' }}
          thickness={7}
          size={100}
        />
      );
    }
  }
}

function mapStateToProps(state) {
  return {
    movies: getMovieList(state),
    page: getPageDetails(state),
    title: getTitle(state),
    authenticated: state.authenticated.authenticated,
    searchResults: searchResults(state)
  };
}

MoviesVirtualized.propTypes = {
  movies: PropTypes.array.isRequired,
  setTitle: PropTypes.func.isRequired,
  getMovies: PropTypes.func.isRequired,
  page: PropTypes.object.isRequired,
  searchResults: PropTypes.array.isRequired
};

export default connect(
  mapStateToProps,
  { getMovies, setTitle }
)(MoviesVirtualized);