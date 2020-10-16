import React, { memo, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import { injectIntl } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import PropTypes from 'prop-types';
import { makeSelectITunesContainer, selectITunesError, selectITunesData, selectITuneName } from './selectors';
import styled from 'styled-components';
import saga from './saga';
import { Input, Card, Skeleton } from 'antd';
import { debounce, get } from 'lodash';
import { iTunesContainerCreators } from './reducer';
const { Search } = Input;

const Container = styled.div`
  width: 50%;
  background-color: lightgrey;
  max-width: ${props => props.maxwidth};
  display: flex;
  flex-direction: column;
  margin: 0 auto;
`;

const SongCard = styled(Card)`
  && {
    margin: 2vh 0;
  }
`;

const SongHead = styled.p`
  margin: 0;
  font-size: ${props => props.fontSize};
`;
export function ITunesContainer({ dispatchITunes, dispatchClearITunes, ituneData = {}, ituneError = null, ituneName }) {
  useInjectSaga({ key: 'iTunesContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = get(ituneData, 'results', null) || ituneError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [ituneData]);

  useEffect(() => {
    if (ituneData && !ituneData?.results?.length) {
      dispatchITunes(ituneName);
      setLoading(true);
    }
  }, []);

  const handleOnChange = tuneName => {
    if (tuneName) {
      dispatchITunes(tuneName);
      setLoading(true);
    } else {
      dispatchClearITunes();
    }
  };

  const debounceHandleOnChange = debounce(handleOnChange, 200);

  const renderITunesList = () => {
    const itunes = get(ituneData, 'results', []);
    return (
      (itunes.length !== 0 || loading) && (
        <Card>
          <Skeleton loading={loading} active>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gridGap: '1vh' }}>
              {itunes.map((itune, index) => (
                <SongCard key={index}>
                  <SongHead>
                    {itune.trackName} by {itune.artistName}
                  </SongHead>
                </SongCard>
              ))}
            </div>
          </Skeleton>
        </Card>
      )
    );
  };

  const renderErrorState = () => {
    let iTuneError;
    if (ituneError) {
      iTuneError = ituneError;
    } else if (!get(ituneData, 'resultCount', 0)) {
      iTuneError = 'respo_search_default';
    }
    return (
      !loading &&
      iTuneError && (
        <Card>
          <h4>Search for the itunes above.</h4>
        </Card>
      )
    );
  };

  return (
    <Container>
      <Helmet>
        <title>ITunesContainer</title>
        <meta name="description" content="Description of ITunesContainer" />
      </Helmet>
      <Search
        data-testid="search-bar"
        defaultValue={ituneName}
        type="text"
        onChange={e => debounceHandleOnChange(e.target.value)}
        onSearch={searchText => debounceHandleOnChange(searchText)}
      />
      {renderITunesList()}
      {renderErrorState()}
    </Container>
  );
}

ITunesContainer.propTypes = {
  dispatchITunes: PropTypes.func,
  dispatchClearITunes: PropTypes.func,
  intl: PropTypes.object,
  ituneData: PropTypes.object,
  ituneError: PropTypes.object,
  ituneName: PropTypes.string
};

const mapStateToProps = createStructuredSelector({
  iTunesContainer: makeSelectITunesContainer(),
  ituneData: selectITunesData(),
  ituneError: selectITunesError(),
  ituneName: selectITuneName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetITunes, clearITunes } = iTunesContainerCreators;
  return {
    dispatchITunes: ituneName => dispatch(requestGetITunes(ituneName)),
    dispatchClearITunes: () => dispatch(clearITunes())
  };
}

const withConnect = connect(
  mapStateToProps,
  mapDispatchToProps
);

export default compose(
  injectIntl,
  withConnect,
  memo
)(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
