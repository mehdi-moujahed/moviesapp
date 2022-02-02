import { setTvShowInfos } from './index';
import { ADD_TVSHOW_INFOS } from '../actionType';

describe('tv show action unit testing', () => {
  it('dispatches ADD_TVSHOW_INFOS', () => {
    const payload = { name: 'star wars', type: 'Animation' };
    expect(setTvShowInfos(payload)).toEqual({
      type: ADD_TVSHOW_INFOS,
      payload
    });
  });
});
