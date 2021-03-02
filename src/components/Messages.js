import dayjs from 'dayjs';
import { createRef, useContext, useEffect } from 'react';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

const Message = ({ fromName, message, ownMessage, sentAt }) => (
  <div className={`message${ownMessage ? ' own-message' : ''}`}>
    <div className="meta">
      <span className="from">
        {fromName}
      </span>
      <span className="timestamp">
        {dayjs(sentAt).format('hh:mm:ss a')}
      </span>
    </div>
    {message}
  </div>
);

const Messages = () => {
  const {
    chats,
    peerId,
    users,
  } = useContext(PeerToPeerContext);

  const messagesEndRef = createRef();

  useEffect(() => {
    if (messagesEndRef.current && messagesEndRef.current.scrollIntoView) {
      messagesEndRef.current.scrollIntoView();
    }
  }, [messagesEndRef, chats]);

  const content = !chats || chats.length === 0
    ? <p className="no-messages">Sent and received messages will be displayed here</p>
    : (
      chats.map((chatData) => {
        const { from, message, sentAt } = chatData;
        const fromName = users[from] && users[from].name
          ? users[from].name
          : from;
        return (
          <Message
            fromName={fromName}
            key={`${fromName}-${sentAt}`}
            message={message}
            ownMessage={from === peerId}
            sentAt={sentAt}
          />
        );
      })
    );
  return (
    <div className="messages-parent">
      <div className="messages-scroll">
        <div className="messages">
          {content}
          <div ref={messagesEndRef} />
        </div>
      </div>
    </div>
  );
};

export default Messages;
