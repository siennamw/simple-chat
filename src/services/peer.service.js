import Peer from 'peerjs';

// peer statuses
export const PEER_STATUS_CONNECTED = 'connected';

// message types
export const MESSAGE_PEER_LIST = 'MESSAGE_PEER_LIST'; // peer ids
export const MESSAGE_USER_NAME = 'MESSAGE_USER_NAME'; // update user's display name
export const MESSAGE_CHAT = 'MESSAGE_CHAT'; // chat text

let ownConnection;
let ownName;
const connections = {};
const peerData = {};
const chats = [];

export const getPeerData = () => {
  return {
    ownName,
    peerData,
    chatList: chats,
    id: ownConnection && ownConnection.id ? ownConnection.id : null,
  };
};

const broadcast = (payload) => {
  Object.values(connections).forEach((connection) => {
    connection.send({
      ...payload,
      from: ownConnection.id,
    })
  });
};

export const broadcastChat = (message, callback) => {
  const sentAt = Date.now();
  const chatData = {
    message,
    sentAt,
    from: ownConnection.id,
  };
  chats.push(chatData);
  broadcast({
    ...chatData,
    type: MESSAGE_CHAT,
  });
  callback();
};

export const changeName = (newName, callback) => {
  ownName = newName;
  peerData[ownConnection.id].name = newName;
  broadcast({
    type: MESSAGE_USER_NAME,
    from: ownConnection.id,
    name: ownName,
  });
  callback();
};

const sendName = (connection) => {
  if (!ownName) return;
  connection.send({
    type: MESSAGE_USER_NAME,
    from: ownConnection.id,
    name: ownName,
  });
};

const broadcastPeerList = () => {
  broadcast({
    type: MESSAGE_PEER_LIST,
    peerIds: Object.keys(connections),
  });
};

const getPeerCount = () => {
  return Object.keys(connections).length;
};

const addPeer = (connection) => {
  const id = connection.peer || connection.id;

  // okay to add self to peerData
  peerData[id] = {
    status: PEER_STATUS_CONNECTED,
  };

  // do not add self to connections
  if (id === ownConnection.id) return;
  connections[id] = connection;
};

const removePeer = (connection) => {
  const { peer: id } = connection;
  delete peerData[id];
  delete connections[id];
};

export const connectToNewPeer = (id, callback) => {
  if (connections[id] || id === ownConnection.id) return;

  const dataConnection = ownConnection.connect(id)
    .on('open', () => {
      addPeer(dataConnection);
      dataListener(dataConnection, callback);
      closeListener(dataConnection, callback);
      broadcastPeerList();
      sendName(dataConnection);
      callback();
    })
    .on('error', (error) => {
      console.log('new peer connection error', { error });
    });
};

const dataListener = (connection, callback) => {
  connection.on('data', (data) => {
    console.log(data);
    switch (data.type) {
      case MESSAGE_PEER_LIST:
        data.peerIds.forEach((id) => connectToNewPeer(id, callback));
        break;
      case MESSAGE_USER_NAME:
        const { from: id, name } = data;
        if (!peerData[id]) return;
        peerData[id].name = name;
        break;
      case MESSAGE_CHAT:
      default:
        const {from, message, sentAt} = data;
        chats.push({
          from,
          message,
          sentAt,
        });
        break;
    }
    callback();
  });
};

const closeListener = (connection, callback) => {
  connection.on('close', () => {
    removePeer(connection);
    callback();
  });
};

export const initializePeerToPeer = (callback) => {
  ownConnection = new Peer({
    config: {
      iceServers: [
        { url: 'stun:stun4.l.google.com:19302' },
      ],
    },
    debug: 2, // errors and warnings only
  })
    .on('error', (error) => {
      console.error(`P2P error: ${error}`);
    })
    .on('open', (id) => {
      ownName = id;
      addPeer(ownConnection);
      callback();
    })
    .on('connection', (dataConnection) => {
      // receive connection request
      dataConnection.on('open', () => {
        addPeer(dataConnection);
        dataListener(dataConnection, callback);
        closeListener(dataConnection, callback);
        broadcastPeerList();
        sendName(dataConnection);
        callback()
      });
    })
    .on('disconnected', () => {
      console.log('disconnected');
      ownConnection.reconnect();
    });
};
