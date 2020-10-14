/**
 *
 * ITunesContainer
 *
 */

import React, { memo } from 'react';
import { connect } from 'react-redux';
import { injectIntl, FormattedMessage as T } from 'react-intl';
import { Helmet } from 'react-helmet';
import { createStructuredSelector } from 'reselect';
import { compose } from 'redux';
import { useInjectSaga } from '@utils/injectSaga';
import makeSelectITunesContainer from './selectors';
import styled from 'styled-components';
import saga from './saga';
import { Input } from 'antd';
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
export function ITunesContainer() {
  useInjectSaga({ key: 'iTunesContainer', saga });

  return (
    <Container>
      <Helmet>
        <title>ITunesContainer</title>
        <meta name="description" content="Description of ITunesContainer" />
      </Helmet>
      <T id={'ITunesContainer'} />
      <Search data-testid="search-bar" />
    </Container>
  );
}

// ITunesContainer.propTypes = {
//   dispatchITunes: PropTypes.func,
//   dispatchClearITunes: PropTypes.func,
//   intl: PropTypes.object,
//   ituneData: [],
//   ituneError: PropTypes.object,
//   ituneName: PropTypes.string
// };

const mapStateToProps = createStructuredSelector({
  iTunesContainer: makeSelectITunesContainer()
  // ituneData: selectITunesData(),
  // ituneError: selectITunesError(),
  // ituneName: selectITuneName()
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
