import { selectITunesContainer, selectITuneName, selectITuneData, selectITuneError } from '../selectors';

describe('ITuneContainer selector tests', () => {
  let mockedState;
  let ituneName;
  let ituneData;
  let ituneError;

  beforeEach(() => {
    ituneName = 'mac';
    ituneData = { totalCount: 1, items: [{ ituneName }] };
    ituneError = 'There was some error while fetching the repository details';

    mockedState = {
      itunesContainer: {
        ituneName,
        ituneData,
        ituneError
      }
    };
  });
  it('should select the homeContainer state', () => {
    const selector = selectITunesContainer();
    expect(selector(mockedState)).toEqual(mockedState.itunesContainer);
  });
  it('should select the ituneName', () => {
    const repoSelector = selectITuneName();
    expect(repoSelector(mockedState)).toEqual(ituneName);
  });

  it('should select ituneData', () => {
    const ituneDataSelector = selectITuneData();
    expect(ituneDataSelector(mockedState)).toEqual(ituneData);
  });

  it('should select the ituneError', () => {
    const ituneErrorSelector = selectITuneError();
    expect(ituneErrorSelector(mockedState)).toEqual(ituneError);
  });
});
