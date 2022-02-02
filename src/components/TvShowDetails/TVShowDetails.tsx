import { useState } from 'react';

import Grid from '@material-ui/core/Grid';
import Paper from '@material-ui/core/Paper';
import { makeStyles } from '@material-ui/core/styles';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import PlayArrowIcon from '@material-ui/icons/PlayArrow';
import GradeIcon from '@material-ui/icons/Grade';

// jss properties
const useStyles = makeStyles(() => ({
  tvShowDetailsMainGrid: {
    margin: '10vh 0'
  },
  name: {
    letterSpacing: 2,
    textShadow: '2px 2px 4px rgb(0 0 0 / 45%)'
  },
  description: {
    display: 'flex',
    alignItems: 'center',
    textShadow: '1px 1px 2px rgb(0 0 0 / 100%)'
  },
  infos: {
    padding: '5px 10px',
    marginRight: 8
  },
  rating: {
    padding: '5px 10px',
    marginRight: 8,
    display: 'flex',
    alignItems: 'center'
  },
  ratingIcon: {
    paddingLeft: 5,
    color: '#FFD700'
  },
  playBtn: {
    fontWeight: 700,
    marginRight: 16,
    textTransform: 'capitalize',
    width: 250,
    height: 50
  },
  summary: {
    textShadow: '1px 1px 2px rgb(0 0 0 / 100%)',
    fontSize: 18
  }
}));

// defining the props structure
interface TVShowDetailsProps {
  name: string;
  vote_average: number;
  genres: any;
  number_of_seasons: number;
  year: string;
  summary: any;
}

function TVShowDetails(props: TVShowDetailsProps) {
  // useStyles is used to access the jss proprties defined in top
  const classes = useStyles();

  return (
    <Grid container spacing={2} className={classes?.tvShowDetailsMainGrid}>
      <Grid item xs={12}>
        <Typography variant="h2" className={classes?.name}>
          {props?.name}
        </Typography>
      </Grid>
      <Grid item xs={12} className={classes?.description}>
        {props?.genres?.map((genre: any, index: number) => (
          <Paper key={index} className={classes.infos}>
            {genre}
          </Paper>
        ))}
        <Paper className={classes?.infos}>{props?.year}</Paper>
        <Paper className={classes?.rating}>
          {props?.vote_average}{' '}
          <GradeIcon fontSize="small" className={classes?.ratingIcon} />
        </Paper>
        <Paper className={classes?.infos}>
          {`${props?.number_of_seasons} season${
            props?.number_of_seasons > 1 ? 's' : ''
          }`}
        </Paper>
      </Grid>
      <Grid item xs={12}>
        <Typography className={classes?.summary}>
          {props?.summary !== null
            ? props?.summary
                ?.replace('<p>', ' ')
                .replace('</p>', ' ')
                .replace('<b>', ' ')
                .replace('</b>', ' ')
            : 'No summary found !'}
        </Typography>
      </Grid>
      <Grid item xs={12}>
        <Button
          className={classes?.playBtn}
          variant="contained"
          color="secondary"
          startIcon={<PlayArrowIcon />}
          size="large"
          onClick={() => {
            window.open('https://www.youtube.com/watch?v=7ijeZK9NIOE');
          }}
        >
          Trailer
        </Button>
      </Grid>
    </Grid>
  );
}

export default TVShowDetails;
