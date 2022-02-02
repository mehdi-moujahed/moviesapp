import {
  ADD_TVSHOW_CAST,
  ADD_TVSHOW_EPISODES,
  ADD_TVSHOW_INFOS,
  ADD_TVSHOW_SEASONS,
  ADD_EPISODE_DETAILS
} from '../../action/actionType';

// Initialization of our initial state
export const initialState = {
  tvShowInfos: {},
  episodes: [],
  seasons: [],
  cast: [],
  episodeDetails: []
};

export const tvShowsReducer = (state = initialState, action: any) => {
  switch (action.type) {
    case ADD_TVSHOW_INFOS:
      return {
        ...state,
        tvShowInfos: { ...action.payload }
      };
    case ADD_TVSHOW_SEASONS:
      return {
        ...state,
        seasons: [...action.payload]
      };
    case ADD_TVSHOW_EPISODES:
      return {
        ...state,
        episodes: [...action.payload]
      };
    case ADD_TVSHOW_CAST:
      return {
        ...state,
        cast: [...action.payload]
      };
    case ADD_EPISODE_DETAILS:
      return {
        ...state,
        episodeDetails: { ...action.payload }
      };

    default:
      return state;
  }
};
