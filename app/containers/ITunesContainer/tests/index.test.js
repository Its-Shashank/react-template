/**
 *
 * Tests for HomeContainer
 *
 */

import React from 'react';
import { timeout, renderProvider } from '@utils/testUtils';
import { fireEvent } from '@testing-library/dom';
import { ITunesContainerTest as ITunesContainer } from '../index';

describe('<ITunesContainer /> tests', () => {
  let submitSpy;

  beforeEach(() => {
    submitSpy = jest.fn();
  });
  it('should render and match the snapshot', () => {
    const { baseElement } = renderProvider(<ITunesContainer dispatchITunes={submitSpy} />);
    expect(baseElement).toMatchSnapshot();
  });

  it('should call dispatchITunes on change', async () => {
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunes={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some itune' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: '' }
    });
    await timeout(500);
    expect(clearITunesSpy).toBeCalled();
  });

  it('should call dispatchITunes on change', async () => {
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunes={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some itune' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
