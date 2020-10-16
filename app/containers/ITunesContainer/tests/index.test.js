import React from 'react';
import { renderProvider, timeout } from '@utils/testUtils';
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

  it('should call dispatchClearITunes on empty change', async () => {
    const getITunesSpy = jest.fn();
    const clearITunesSpy = jest.fn();
    const { getByTestId } = renderProvider(
      <ITunesContainer dispatchClearITunes={clearITunesSpy} dispatchITunes={getITunesSpy} />
    );
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'a' }
    });
    await timeout(500);
    expect(getITunesSpy).toBeCalled();
  });

  it('should call dispatchGetITunes on change', async () => {
    const { getByTestId } = renderProvider(<ITunesContainer dispatchITunes={submitSpy} />);
    fireEvent.change(getByTestId('search-bar'), {
      target: { value: 'some' }
    });
    await timeout(500);
    expect(submitSpy).toBeCalled();
  });
});
