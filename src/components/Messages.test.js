import { render, screen } from '@testing-library/react';
import Messages from './Messages';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

describe('Messages', () => {
  test('if no chats, renders the expected message', () => {
    const chats = [];
    const peerId = 'vnsovhd';
    const users = {};
    render(
      <PeerToPeerContext.Provider value={{ chats, peerId, users }}>
        <Messages/>
      </PeerToPeerContext.Provider>
    );
    expect(screen.getByText('Sent and received messages will be displayed here')).toBeDefined();
  });

  test('if there are chats, renders them', () => {
    const chats = [
      {
        from: 'iuegrw',
        message: 'nuivwrlhrw hiuweflnfw',
        sentAt: Date.now(),
      },
      {
        from: 'bnkerlkefm',
        message: 'jnwegrkm nweofv',
        sentAt: Date.now(),
      }
    ];
    const peerId = 'vnsovhd';
    const users = {};
    render(
      <PeerToPeerContext.Provider value={{ chats, peerId, users }}>
        <Messages/>
      </PeerToPeerContext.Provider>
    );
    expect(screen.getByText(chats[0].message)).toBeInTheDocument();
    expect(screen.getByText(chats[0].from)).toBeInTheDocument();
    expect(screen.getByText(chats[1].message)).toBeInTheDocument();
    expect(screen.getByText(chats[1].from)).toBeInTheDocument();
  });
});
