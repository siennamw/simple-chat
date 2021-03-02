import { render, screen, within } from '@testing-library/react';
import Status from './Status';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

describe('Status', () => {
  test('renders the expected link', () => {
    const peerId = 'vnsovhd';
    const anotherPeerId = 'ugynvel';
    const users = {
      [peerId]: {},
      [anotherPeerId]: {},
    };
    const expectedLink = `${window.location.protocol}//${window.location.host}?peer=${peerId}`;
    render(
      <PeerToPeerContext.Provider value={{ peerId, users }}>
        <Status/>
      </PeerToPeerContext.Provider>
    );
    expect(screen.getByText(expectedLink)).toBeDefined();
  });

  test('lists players\' ids if no names', () => {
    const peerId = 'vnsovhd';
    const anotherPeerId = 'ugynvel';
    const users = {
      [peerId]: {},
      [anotherPeerId]: {},
    };
    render(
      <PeerToPeerContext.Provider value={{ peerId, users }}>
        <Status/>
      </PeerToPeerContext.Provider>
    );
    const container = screen.getByText(/Users in this chat:/i);
    expect(within(container).getByText(RegExp(peerId))).toBeInTheDocument();
    expect(within(container).getByText(RegExp(anotherPeerId))).toBeInTheDocument();
  });

  test('lists players\' names when they exist', () => {
    const peerId = 'vnsovhd';
    const anotherPeerId = 'ugynvel';
    const users = {
      [peerId]: { name: 'wgejnseh'},
      [anotherPeerId]: { name: 'nbieruh' },
    };
    render(
      <PeerToPeerContext.Provider value={{ peerId, users }}>
        <Status/>
      </PeerToPeerContext.Provider>
    );
    const container = screen.getByText(/Users in this chat:/i);
    expect(within(container).getByText(RegExp(users[peerId].name))).toBeInTheDocument();
    expect(within(container).getByText(RegExp(users[anotherPeerId].name))).toBeInTheDocument();
  });
});
