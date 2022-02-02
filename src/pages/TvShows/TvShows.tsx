import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import { makeStyles } from '@material-ui/core/styles';
import { Container, Grid } from '@material-ui/core';

import TVShowDetails from '../../components/TvShowDetails';
import Episodes from '../../components/EpisodesList/EpisodesList';
import Cast from '../../components/Cast';

import {
  getTvShowInformations,
  getTvShowSeasons,
  getTvShowEpisodes,
  getTvShowCast
} from '../../store/action';

// jss properties
const useStyles = makeStyles((theme) => ({
  mainContainer: {
    padding: theme.spacing(10, 10, 0, 10)
  },
  backgroundContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    zIndex: -1
  },
  fillContainer: {
    padding: theme.spacing(30, 10, 0, 10)
  },
  background: {
    position: 'relative',
    width: '100%'
  },
  backdropPath: {
    filter: 'brightness(50%) blur(4px)',
    width: '100vw',
    height: '85vh',
    objectFit: 'cover'
  },
  vignette: {
    position: 'absolute',
    bottom: 0,
    transform: 'translateY(10px)',
    background: 'linear-gradient(180deg,transparent 20%,rgb(20, 20, 20) 80%)',
    width: '100%',
    height: '500px'
  }
}));

function TVShow() {
  // useStyles is used to access the jss proprties defined in top
  const classes = useStyles();

  // useDispatch is used to dispatch (send) actions as needed
  const dispatch = useDispatch();

  // useSelector is used to extract data from redux store state
  // we get the tvShowinfos data from redux store state
  const tvShowInfos = useSelector(
    (state: any) => state?.tvShowsReducer?.tvShowInfos
  );
  // we get the seasons data from redux store state
  const seasons = useSelector((state: any) => state?.tvShowsReducer?.seasons);

  // we get the episodes data from redux store state
  const episodes = useSelector((state: any) => state?.tvShowsReducer?.episodes);

  // we get the cast data from redux store state
  const cast = useSelector((state: any) => state?.tvShowsReducer?.cast);

  // when the component is mounted we send the propriate url of each API to the actions in our store
  useEffect(() => {
    dispatch(
      getTvShowInformations(`${process.env.REACT_APP_API_BASE_URL}/shows/6771`)
    );
    dispatch(
      getTvShowSeasons(
        `${process.env.REACT_APP_API_BASE_URL}/shows/6771/seasons`
      )
    );
    dispatch(
      getTvShowCast(`${process.env.REACT_APP_API_BASE_URL}/shows/6771/cast`)
    );
  }, []);

  // display all the season 1 episodes by default
  useEffect(() => {
    dispatch(
      getTvShowEpisodes(
        `${process.env.REACT_APP_API_BASE_URL}/seasons/${seasons[0]?.id}/episodes`
      )
    );
  }, [seasons]);

  return (
    <div className={classes?.mainContainer}>
      <div className={classes?.backgroundContainer}>
        <div className={classes?.background}>
          <img
            className={classes?.backdropPath}
            src={tvShowInfos?.image?.medium}
            alt="cover_img"
          />
          <div className={classes.vignette} />
        </div>
      </div>
      <Container>
        <Grid container spacing={4} alignItems="center">
          <TVShowDetails
            vote_average={tvShowInfos?.rating?.average}
            name={tvShowInfos?.name}
            genres={tvShowInfos?.genres}
            number_of_seasons={seasons?.length}
            year={tvShowInfos?.premiered}
            summary={tvShowInfos?.summary}
          />
          <Episodes seasons={seasons} episodes={episodes} />
        </Grid>
        <Grid container alignItems="center" spacing={3}>
          <Cast cast={cast} />
        </Grid>
      </Container>
    </div>
  );
}

export default TVShow;
