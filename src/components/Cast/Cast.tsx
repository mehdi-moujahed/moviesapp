import { Grid, Paper, Typography } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
// jss properties
const useStyles = makeStyles((theme) => ({
  container: {
    display: 'flex',
    justifyContent: 'center',
    overflow: 'hidden',
    padding: theme.spacing(0, 1)
  },
  actor: {
    backgroundColor: 'rgba(0,0,0,0)',
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: '4px',
    transition: '.2s',
    '&:hover': {
      backgroundColor: 'rgba(0,0,0,1)'
    }
  },
  actorImage: {
    borderRadius: '4px',
    width: 141,
    height: 219,
    objectFit: 'cover'
  },
  characterName: {
    fontSize: 14,
    textAlign: 'center'
  },
  actorName: {
    fontSize: 14,
    textAlign: 'center',
    fontWeight: 900
  }
}));

// defining the props structure
interface CastProps {
  cast: any;
}
function Cast(props: CastProps) {
  // useStyles is used to access the jss proprties defined in top
  const classes = useStyles();

  return (
    <Container className={classes?.container}>
      <Grid container style={{ flexGrow: 1 }} spacing={2}>
        <Grid item xs={12}>
          <Grid container justifyContent="center" spacing={4}>
            {props?.cast?.map((actor: any, index: number) => (
              <Grid key={index} item>
                <Paper className={classes?.actor}>
                  <img
                    src={actor?.person?.image?.original}
                    alt="actor_img"
                    className={classes?.actorImage}
                  />
                  <Typography className={classes?.actorName}>
                    {actor?.person?.name}
                  </Typography>
                  <Typography className={classes?.characterName}>
                    {actor?.character?.name}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>
        </Grid>
      </Grid>
    </Container>
  );
}

export default Cast;
