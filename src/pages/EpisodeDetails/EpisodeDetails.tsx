import { useDispatch, useSelector } from 'react-redux';
import { useEffect } from 'react';
import { useHistory, useParams } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import { Button, Typography } from '@material-ui/core';
import InfoIcon from '@material-ui/icons/Info';
import GradeIcon from '@material-ui/icons/Grade';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';

import { getEpisodeDetails } from '../../store/action';
import NotAvailable from '../../assets/images/not-available.png';

// jss properties
const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1
  },
  headerGrid: {
    height: '50vh'
  },
  descriptionText: {
    color: '#777'
  },
  ratingText: {
    color: '#777',
    paddingRight: 5
  },
  seasonEpNumberContainer: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'space-evenly',
    height: '100%'
  },
  rate: {
    display: 'flex',
    alignItems: 'center'
  },
  moreInfosButton: {
    fontWeight: 700,
    marginRight: '16px',
    textTransform: 'capitalize',
    width: '250px',
    height: '50px'
  },
  seasonEpNumber: {
    border: `solid 1px ${theme?.palette?.error?.main}`,
    padding: theme.spacing(0, 2)
  },
  arrowBackIcon: {
    fontSize: 14
  },
  backBtn: {
    position: 'absolute',
    top: 25,
    left: 25,
    backgroundColor: 'red'
  },
  name: {
    letterSpacing: '2px',
    textShadow: '2px 2px 4px rgb(0 0 0 / 45%)',
    textAlign: 'center'
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary
  },
  summary: {
    textShadow: '1px 1px 2px rgb(0 0 0 / 100%)',
    fontSize: '18px',
    paddingLeft: 10
  },
  ratingIcon: {
    paddingLeft: 5,
    color: '#FFD700'
  },
  episodeImg: {
    width: '100%',
    height: '100%',
    objectFit: 'cover'
  }
}));

// defining interface to get the id passed in URL parameters
interface ParamTypes {
  id: string;
}

function EpisodeDetails() {
  // useStyles is used to access the jss proprties defined in top
  const classes = useStyles();

  // get id passed in URL parameters
  const { id } = useParams<ParamTypes>();

  // useDispatch is used to dispatch (send) actions as needed
  const dispatch = useDispatch();

  // useHistory is used to navigate between different routes in the app
  const history = useHistory();

  // get episode details from the store
  const episode = useSelector(
    (state: any) => state?.tvShowsReducer?.episodeDetails
  );

  // when the component is mounted we send this action with the api URL to get all details about a specific episode
  useEffect(() => {
    dispatch(
      getEpisodeDetails(`${process.env.REACT_APP_API_BASE_URL}/episodes/${id}`)
    );
  }, []);

  // this fucntion allows to go back to the previous route
  const handleClickBackBtn = () => {
    history.goBack();
  };

  return (
    <div className={classes?.root}>
      <Grid container spacing={3}>
        <Grid item xs={12} className={classes?.headerGrid}>
          <img
            src={episode?.image?.original || NotAvailable}
            alt="episode_img"
            className={classes?.episodeImg}
            onError={(e: any) => {
              e.target.onerror = null;
              e.target.src = NotAvailable;
            }}
          />
          <Button
            variant="outlined"
            className={classes?.backBtn}
            onClick={handleClickBackBtn}
            startIcon={<ArrowBackIosIcon className={classes?.arrowBackIcon} />}
          >
            Back
          </Button>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="h4" className={classes?.name}>
            {episode?.name}
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <div className={classes?.seasonEpNumberContainer}>
            <Typography variant="h6" className={classes?.seasonEpNumber}>
              Season {episode?.season}
            </Typography>
            <Typography variant="h6" className={classes?.seasonEpNumber}>
              Episode {episode?.number}
            </Typography>
          </div>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1">
            <span className={classes?.descriptionText}>Type :</span>
            {episode?.type}
          </Typography>
          <Typography variant="subtitle1">
            <span className={classes?.descriptionText}> Duration :</span>{' '}
            {episode?.runtime} min
          </Typography>
        </Grid>
        <Grid item xs={6} sm={3}>
          <Typography variant="subtitle1">
            <span className={classes?.descriptionText}> Air date :</span>{' '}
            {episode?.airdate}
          </Typography>
          {episode?.rating?.average !== null ? (
            <Typography variant="subtitle1" className={classes?.rate}>
              <span className={classes?.ratingText}> Rating :</span>{' '}
              {episode?.rating?.average}
              <GradeIcon fontSize="small" className={classes?.ratingIcon} />
            </Typography>
          ) : (
            ''
          )}
        </Grid>
        <Grid item xs={12} sm={6}>
          <Typography className={classes?.summary}>
            {episode?.summary !== null
              ? episode?.summary
                  ?.replace('<p>', ' ')
                  .replace('</p>', ' ')
                  .replace('<b>', ' ')
                  .replace('</b>', ' ')
              : 'No summary found !'}
          </Typography>
        </Grid>
        <Grid item xs={12} sm={6}>
          <Button
            className={classes?.moreInfosButton}
            variant="contained"
            color="secondary"
            endIcon={<InfoIcon />}
            size="large"
            onClick={() => {
              window.open(`${episode?.url}`);
            }}
          >
            More Informations
          </Button>
        </Grid>
      </Grid>
    </div>
  );
}

export default EpisodeDetails;
