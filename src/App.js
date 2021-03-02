import { useContext } from 'react';

import { PeerToPeerContext } from './providers/PeerToPeerContext';

import ChatForm from './components/ChatForm';
import DisplayName from './components/DisplayName';
import Messages from './components/Messages';
import Status from './components/Status';

import useConnectViaParams from './hooks/useConnectViaParams';

function App() {
  const { peerId } = useContext(PeerToPeerContext);
  useConnectViaParams();

  if (!peerId) {
    return (
      <p>Loading...</p>
    );
  }

  return (
    <>
      <Messages/>
      <ChatForm/>
      <Status/>
      <DisplayName/>
    </>
  );
}

export default App;
