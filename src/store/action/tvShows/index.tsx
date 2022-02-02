import {
  ADD_TVSHOW_INFOS,
  ADD_TVSHOW_SEASONS,
  ADD_TVSHOW_EPISODES,
  ADD_TVSHOW_CAST,
  ADD_EPISODE_DETAILS
} from '../actionType';

const axios = require('axios').default;

// all the functions below are used to specify the role of each action
export const setTvShowInfos = (payload: any) => ({
  type: ADD_TVSHOW_INFOS,
  payload
});

export const setTvShowSeasons = (payload: any) => ({
  type: ADD_TVSHOW_SEASONS,
  payload
});

export const setTvShowEpisodes = (payload: any) => ({
  type: ADD_TVSHOW_EPISODES,
  payload
});

export const setTvShowCast = (payload: any) => ({
  type: ADD_TVSHOW_CAST,
  payload
});

export const setEpisodeDetails = (payload: any) => ({
  type: ADD_EPISODE_DETAILS,
  payload
});

// function to fetch the main informations about a tvshow by the ID and set the fetched informations in the global state
export const getTvShowInformations = (url: string) => (dispatch: any) => {
  axios
    .get(url)
    .then((response: any) => {
      if (response.status === 200) {
        dispatch(setTvShowInfos(response?.data));
      }
    })
    .catch((error: any) => {
      console.log('error get infos', error);
    });
};

// function to fetch the main informations about a tvshow seasons by the ID and set the fetched informations in the global state
export const getTvShowSeasons = (url: string) => (dispatch: any) => {
  axios
    .get(url)
    .then((response: any) => {
      if (response.status === 200) {
        dispatch(setTvShowSeasons(response?.data));
      }
    })
    .catch((error: any) => {
      console.log('error get infos', error);
    });
};

// function to fetch the main informations about episodes in a specific season and set the fetched informations in the global state
export const getTvShowEpisodes = (url: string) => (dispatch: any) => {
  axios
    .get(url)
    .then((response: any) => {
      if (response.status === 200) {
        dispatch(setTvShowEpisodes(response?.data));
      }
    })
    .catch((error: any) => {
      console.log('error get infos', error);
    });
};

// function to fetch the main informations about a tvshow cast by the ID and set the fetched informations in the global state
export const getTvShowCast = (url: string) => (dispatch: any) => {
  axios
    .get(url)
    .then((response: any) => {
      if (response.status === 200) {
        dispatch(setTvShowCast(response?.data));
      }
    })
    .catch((error: any) => {
      console.log('error get infos', error);
    });
};

// function to fetch the main informations about a specific episode and set the fetched informations in the global state
export const getEpisodeDetails = (url: string) => (dispatch: any) => {
  axios
    .get(url)
    .then((response: any) => {
      if (response.status === 200) {
        dispatch(setEpisodeDetails(response?.data));
      }
    })
    .catch((error: any) => {
      console.log('error get infos', error);
    });
};
