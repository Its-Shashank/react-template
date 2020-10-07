import { itunesContainerTypes, itunesContainerCreators } from '../reducer';

describe('ITunesContainer action tests', () => {
  it('has a type of REQUEST_GET_I_TUNES', () => {
    const expected = {
      type: itunesContainerTypes.REQUEST_GET_I_TUNES,
      ituneName: 'ituneName'
    };
    expect(itunesContainerCreators.requestGetITunes('ituneName')).toEqual(expected);
  });
});
