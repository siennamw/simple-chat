import { useContext, useState } from 'react';

import { PeerToPeerContext } from '../providers/PeerToPeerContext';

const ChatForm = () => {
  const { sendChat } = useContext(PeerToPeerContext);

  const [chatInForm, setChatInForm] = useState('');

  const onSendChat = (e) => {
    e.preventDefault();
    if (!chatInForm) return;
    sendChat(chatInForm);
    setChatInForm('');
  };

  return (
    <div>
      <form onSubmit={onSendChat}>
        <input
          aria-label="message"
          autoFocus
          onChange={(e) => setChatInForm(e.target.value)}
          placeholder="type message here"
          type="text"
          value={chatInForm}
        />
        <button type="submit">
          Send Message
        </button>
      </form>
    </div>
  );
};

export default ChatForm;
