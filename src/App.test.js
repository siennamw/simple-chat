import { render, screen } from '@testing-library/react';
import { BrowserRouter, Router } from 'react-router-dom';
import { createMemoryHistory } from 'history';

import App from './App';
import { PeerToPeerContext } from './providers/PeerToPeerContext';

jest.mock('./components/ChatForm', () => () => (<div data-testid="chatform-component" />));
jest.mock('./components/DisplayName', () => () => (<div data-testid="displayname-component" />));
jest.mock('./components/Messages', () => () => (<div data-testid="messages-component" />));
jest.mock('./components/Status', () => () => (<div data-testid="status-component" />));

describe('App', () => {
  test('if no peerId in context, renders loading message only', () => {
    render(
      <BrowserRouter>
        <PeerToPeerContext.Provider value={{}}>
          <App/>
        </PeerToPeerContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByText('Loading...')).toBeInTheDocument();
  });

  test('if peerId is defined, renders expected components', () => {
    const value = {
      changeOwnName: jest.fn(),
      connectToNewPeer: jest.fn(),
      chats: [],
      name: 'gufnjsvd',
      peerId: 'wegyfundw',
      sendChat: jest.fn(),
      users: {},
    };
    render(
      <BrowserRouter>
        <PeerToPeerContext.Provider value={value}>
          <App/>
        </PeerToPeerContext.Provider>
      </BrowserRouter>
    );
    expect(screen.getByTestId('chatform-component')).toBeInTheDocument();
    expect(screen.getByTestId('displayname-component')).toBeInTheDocument();
    expect(screen.getByTestId('messages-component')).toBeInTheDocument();
    expect(screen.getByTestId('status-component')).toBeInTheDocument();
  });

  test('if location has expected query param, calls expected function with useConnectViaParams', () => {
    const value = {
      changeOwnName: jest.fn(),
      connectToNewPeer: jest.fn(),
      chats: [],
      name: 'gufnjsvd',
      peerId: 'wegyfundw',
      sendChat: jest.fn(),
      users: {},
    };

    const peer = 'ugyefwbhjwef';

    const history = createMemoryHistory();
    history.push(`/?peer=${peer}`);

    render(
      <Router history={history}>
        <PeerToPeerContext.Provider value={value}>
          <App/>
        </PeerToPeerContext.Provider>
      </Router>
    );

    expect(value.connectToNewPeer).toHaveBeenCalledWith(peer);
  });
});
