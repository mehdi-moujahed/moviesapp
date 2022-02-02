import { ADD_TVSHOW_INFOS } from '../../action/actionType';

import { tvShowsReducer, initialState } from './index';

const addTvShowsInfosAction = {
  type: ADD_TVSHOW_INFOS,
  payload: { name: 'star wars', type: 'Animation' }
};

describe('test tw shows reducer', () => {
  it('returns initialState', () => {
    expect(tvShowsReducer(undefined, {})).toEqual(initialState);
  });
  it('set friends', () => {
    expect(tvShowsReducer(initialState, addTvShowsInfosAction)).toEqual({
      ...initialState,
      ...{
        tvShowInfos: addTvShowsInfosAction.payload
      }
    });
  });
});
