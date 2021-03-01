import React, { createContext, useEffect, useState } from 'react';

import * as peerService from '../services/peer.service';

export const PeerToPeerContext = createContext();

const PeerToPeerProvider = ({ children }) => {
  const [peerId, setPeerId] = useState(null);
  const [name, setName] = useState(null);
  const [users, setUsers] = useState({});
  const [chats, setChats] = useState([]);

  const callback = () => {
    const data = peerService.getPeerData();
    const { ownName, peerData, chatList, id } = data;
    setUsers({ ...peerData });
    setChats([...chatList]);
    setPeerId(id);
    setName(ownName);
  };

  const connectToNewPeer = (id) => {
    peerService.connectToNewPeer(id, callback);
  };

  const changeOwnName = (newName) => {
    peerService.changeName(newName, callback);
  };

  const sendChat = (message) => {
    peerService.broadcastChat(message, callback);
  };

  useEffect(() => {
    peerService.initializePeerToPeer(callback);
  }, []);

  const value = {
    changeOwnName,
    connectToNewPeer,
    chats,
    name,
    peerId,
    sendChat,
    users,
  };

  return (
    <PeerToPeerContext.Provider value={value}>
      {children}
    </PeerToPeerContext.Provider>
  );
};

export default PeerToPeerProvider;
