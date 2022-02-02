import { useEffect, useRef, useState } from 'react';
import { useDispatch } from 'react-redux';

import {
  Box,
  FormControl,
  MenuItem,
  Select,
  Typography,
  Grid,
  Container,
  CircularProgress
} from '@material-ui/core';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import Divider from '@material-ui/core/Divider';
import { makeStyles } from '@material-ui/core/styles';
import { useHistory } from 'react-router-dom';
import { getTvShowEpisodes } from '../../store/action';
import NotAvailable from '../../assets/images/not-found.png';

// jss properties
const useStyles = makeStyles((theme) => ({
  episodeSelectorHeader: {
    display: 'flex'
  },
  episodeContainer: {
    width: '100%'
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120
  },
  episodeSelectorLabel: {
    flexGrow: 1
  },
  circularProgress: {
    color: theme?.palette?.error?.main
  },
  episodeImg: {
    width: '100%',
    height: 140,
    objectFit: 'cover'
  },
  listContainer: {
    marginBottom: 60
  },
  episodeNumber: {
    textAlign: 'center'
  },
  spinnerBox: {
    minHeight: 140,
    width: '100%'
  },
  selectorMenu: {
    '& .MuiPaper-root': {
      backgroundColor: 'rgba(0,0,0,.9)',
      border: '1px solid rgb(20,20,20)'
    }
  }
}));

// defining the props structure
interface EpisodesProps {
  seasons: any;
  episodes: any;
}

function Episodes(props: EpisodesProps) {
  // useStyles is used to access the jss proprties defined in top
  const classes = useStyles();

  // useDispatch is used to dispatch (send) actions as needed
  const dispatch = useDispatch();

  // useHistory is used to navigate between different routes in the app
  const history = useHistory();

  // we used this state to know which season the user has selected
  const [selectedSeason, setSelectedSeason] = useState(0);

  // this state is used to display a spinner(when it values is true) when the image is not successfully downloaded
  const [loadingImg, setLoadingImg] = useState(true);

  // we used this variable to check if the image is downloaded succesfully
  const counter = useRef(0);

  // this function checks if the image is downloaded succesfully it sets the loading image state to false to hide the spinenr and display the image
  const imageLoaded = () => {
    counter.current += 1;
    if (counter.current >= props?.episodes?.length) {
      setLoadingImg(false);
    }
  };

  // when the user select a new season (when the state selectedSeason has changed) we fetch all the episodes for that season
  useEffect(() => {
    dispatch(
      getTvShowEpisodes(
        `${process.env.REACT_APP_API_BASE_URL}/seasons/${props?.seasons[selectedSeason]?.id}/episodes`
      )
    );
  }, [selectedSeason]);

  // function to set the index of the selected season that the user chosen
  const handleChange = (event: any) => {
    setSelectedSeason(event.target.value);
  };
  return (
    <Box className={classes.episodeContainer}>
      <Box className={classes.episodeSelectorHeader}>
        <Typography variant="h3" className={classes.episodeSelectorLabel}>
          Episodes
        </Typography>
        <FormControl variant="outlined" className={classes.formControl}>
          <Select
            value={selectedSeason}
            MenuProps={{
              anchorOrigin: {
                vertical: 'bottom',
                horizontal: 'left'
              },
              getContentAnchorEl: null,
              className: classes.selectorMenu
            }}
            onChange={handleChange}
          >
            {props?.seasons?.map((season: any, index: number) => (
              <MenuItem key={season?.id} value={index}>
                {`Season ${season?.number} `}
                {`(${season?.episodeOrder} episodes)`}
              </MenuItem>
            ))}
          </Select>
        </FormControl>
      </Box>
      <Container className={classes?.listContainer}>
        <List>
          {props?.episodes?.map((episode: any, index: number) => (
            <div key={episode?.id}>
              <ListItem
                alignItems="center"
                button
                onClick={() => history.push(`episodeDetails/${episode?.id}`)}
              >
                <Grid container spacing={1} alignItems="center">
                  <Grid item xs={1}>
                    <Typography
                      color="textPrimary"
                      variant="h4"
                      className={classes?.episodeNumber}
                    >
                      {episode?.number}
                    </Typography>
                  </Grid>
                  <Grid item xs={11}>
                    <Grid container spacing={4} alignItems="center">
                      <Grid item xs={3}>
                        <Box
                          display="flex"
                          justifyContent="center"
                          alignItems="center"
                          className={classes?.spinnerBox}
                          style={{
                            display: loadingImg ? 'block' : 'none'
                          }}
                        >
                          <CircularProgress
                            className={classes?.circularProgress}
                          />
                        </Box>
                        <img
                          alt="episode_img"
                          src={episode?.image?.original || NotAvailable}
                          onLoad={imageLoaded}
                          className={classes?.episodeImg}
                          style={{
                            display: !loadingImg ? 'block' : 'none'
                          }}
                          onError={(e: any) => {
                            e.target.onerror = null;
                            e.target.src = NotAvailable;
                          }}
                        />
                      </Grid>
                      <Grid item xs={9}>
                        <Typography variant="h5">{episode?.name}</Typography>

                        <Typography variant="body2">
                          {episode?.summary !== null
                            ? episode?.summary
                                ?.replace('<p>', ' ')
                                .replace('</p>', ' ')
                                .replace('<b>', ' ')
                                .replace('</b>', ' ')
                            : 'No summary found !'}
                        </Typography>
                      </Grid>
                    </Grid>
                  </Grid>
                </Grid>
              </ListItem>
              {!(index === props?.episodes?.length - 1) && <Divider />}
            </div>
          ))}
        </List>
      </Container>
    </Box>
  );
}

export default Episodes;
