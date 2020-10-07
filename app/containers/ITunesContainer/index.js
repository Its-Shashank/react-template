import React, { useEffect, memo, useState } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import _ from 'lodash';
import { Card, Skeleton, Input } from 'antd';
import styled from 'styled-components';
import { FormattedMessage as T, injectIntl } from 'react-intl';
import { withRouter } from 'react-router-dom';
import Text from '@components/T';
import Clickable from '@components/Clickable';
import { useInjectSaga } from 'utils/injectSaga';
// import { useInjectReducer } from 'utils/injectReducer';
import { selectITuneData, selectITuneError, selectITuneName, selectITunesContainer } from './selectors';
import reducer, { itunesContainerCreators } from './reducer';
import saga from './saga';

const { Search } = Input;

const CustomCard = styled(Card)`
  && {
    margin: 20px 0;
    width: 100%;
    max-width: ${props => props.maxwidth};
    color: ${props => props.color};
    ${props => props.color && `color: ${props.color}`};
  }
`;
const CustomContainer = styled.div`
  background-color: white;
  width: 100%;
  display: grid;
  grid-template-columns: 1fr 1fr;
  grid-gap: 1vh;
`;
const Container = styled.div`
  && {
    display: flex;
    flex-direction: column;
    max-width: 500px;
    width: 100%;
    margin: 0 auto;
    padding: 20px;
  }
`;
const RightContent = styled.div`
  display: flex;
  align-self: flex-end;
`;
export function ITunesContainer({
  dispatchITunes,
  intl,
  ituneData = {},
  ituneError = null,
  ituneName,
  history,
  dispatchClearITunes
}) {
  // useInjectReducer({ key: 'itunesContainer', reducer });
  useInjectSaga({ key: 'itunesContainer', saga });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const loaded = _.get(ituneData, 'results', null) || ituneError;
    if (loading && loaded) {
      setLoading(false);
    }
  }, [ituneData]);

  useEffect(() => {
    if (ituneData && !ituneData?.results?.length) {
      dispatchITunes(ituneData);
      setLoading(true);
      console.log(ituneData);
    }
  }, []);

  const handleOnChange = name => {
    if (name) {
      dispatchITunes(name);
      setLoading(true);
    } else {
      dispatchClearITunes();
    }
  };
  const debouncedHandleOnChange = _.debounce(handleOnChange, 200);
  // console.log(ituneData);
  const renderRepoList = () => {
    const items = _.get(ituneData, 'results', []);
    const filteredItems = items.filter(item => item.wrapperType === 'track');
    const totalCount = _.get(ituneData, 'resultCount', 0);
    return (
      (filteredItems.length !== 0 || loading) && (
        <CustomCard maxwidth="80vw">
          <Skeleton loading={loading} active>
            {ituneName && (
              <div>
                <T id="search_query" values={{ ituneName }} />
              </div>
            )}
            {totalCount !== 0 && (
              <div>
                <T id="matching_itunes" values={{ totalCount }} />
              </div>
            )}
            <CustomContainer>
              {filteredItems.map((item, index) => (
                <CustomCard key={index}>
                  <T id="itune_name" values={{ name: item.trackName }} />
                </CustomCard>
              ))}
            </CustomContainer>
          </Skeleton>
        </CustomCard>
      )
    );
  };
  const renderErrorState = () => {
    let itunesError;
    if (ituneError) {
      itunesError = ituneError;
    } else if (!_.get(ituneData, 'totalCount', 0)) {
      itunesError = 'respo_search_default';
    }
    return (
      !loading &&
      itunesError && (
        <CustomCard color={ituneError ? 'red' : 'grey'} title={intl.formatMessage({ id: 'repo_list' })}>
          <T id={itunesError} />
        </CustomCard>
      )
    );
  };
  const refreshPage = () => {
    history.push('stories');
    window.location.reload();
  };
  return (
    <Container>
      <RightContent>
        <Clickable textId="stories" onClick={refreshPage} />
      </RightContent>
      <CustomCard title={intl.formatMessage({ id: 'itune_search' })} maxwidth={500}>
        <Text marginBottom={10} id="get_itune_details" />
        <Search
          data-testid="search-bar"
          defaultValue={ituneName}
          type="text"
          onChange={evt => debouncedHandleOnChange(evt.target.value)}
          onSearch={searchText => debouncedHandleOnChange(searchText)}
        />
      </CustomCard>
      {renderRepoList()}
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
  ituneName: PropTypes.string,
  history: PropTypes.object
};

const mapStateToProps = createStructuredSelector({
  ituneContainer: selectITunesContainer(),
  ituneData: selectITuneData(),
  ituneError: selectITuneError(),
  ituneName: selectITuneName()
});

function mapDispatchToProps(dispatch) {
  const { requestGetITunes, clearITunes } = itunesContainerCreators;
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
  memo,
  withRouter
)(ITunesContainer);

export const ITunesContainerTest = compose(injectIntl)(ITunesContainer);
