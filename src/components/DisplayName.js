import { useContext, useEffect, useState } from 'react';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

const DisplayName = () => {
  const { changeOwnName, name } = useContext(PeerToPeerContext);
  const [nameInForm, setNameInForm] = useState(name || '');

  useEffect(() => {
    setNameInForm(name || '');
  }, [name]);

  const onNameChangeSubmit = (e) => {
    e.preventDefault();
    if (!nameInForm) return;
    changeOwnName(nameInForm);
  };

  return (
    <div>
      <form onSubmit={onNameChangeSubmit}>
        <input
          aria-label="display name"
          onChange={(e) => setNameInForm(e.target.value)}
          placeholder="display name"
          type="text"
          value={nameInForm}
        />
        <button type="submit">
          Update Display Name
        </button>
      </form>
    </div>
  );
};

export default DisplayName;
