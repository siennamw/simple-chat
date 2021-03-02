import { useContext } from 'react';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

const Status = () => {
  const {
    peerId,
    users,
  } = useContext(PeerToPeerContext);

  const link = `${window.location.protocol}//${window.location.host}?peer=${peerId}`;

  return (
    <div className="status">
      <p>Link to join this chat: <a href={link} rel="noopener noreferrer" target="_blank">{link}</a></p>
      <p>Users in this chat: {Object.keys(users).map((id) => users[id].name || id).join(', ')}</p>
    </div>
  );
};

export default Status;
