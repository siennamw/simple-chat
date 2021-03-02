import { useContext, useEffect, useState } from 'react';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';
import { useLocation } from 'react-router-dom';

const useConnectViaParams = () => {
  const {
    connectToNewPeer,
    peerId,
    users,
  } = useContext(PeerToPeerContext);
  const [connectAttempted, setConnectAttempted] = useState(false);
  const location = useLocation();

  useEffect(() => {
    // if no peerId, connection has not been initialized
    // if connectAttempted, we should not make a second attempt
    if (!peerId || connectAttempted) return;

    const searchParams = new URLSearchParams(location.search);
    if (searchParams.has('peer') && !users[searchParams.get('peer')]) {
      connectToNewPeer(searchParams.get('peer'));
      setConnectAttempted(true);
    }
  }, [connectAttempted, connectToNewPeer, location, peerId, users]);
};

export default useConnectViaParams;
