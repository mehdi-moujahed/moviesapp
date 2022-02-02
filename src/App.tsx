import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import { ThemeProvider } from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';

import theme from './utility/theme';

import TvShows from './pages/TvShows';
import EpisodeDetails from './pages/EpisodeDetails';

function App() {
  return (
    <Router>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Switch>
          <Route path="/" exact component={TvShows} />
          <Route path="/episodeDetails/:id" exact component={EpisodeDetails} />
        </Switch>
      </ThemeProvider>
    </Router>
  );
}

export default App;
