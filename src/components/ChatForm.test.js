import { render, screen, fireEvent } from '@testing-library/react';
import ChatForm from './ChatForm';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

describe('ChatForm', () => {
  test('renders a form with a text input and a button', () => {
    const fn = jest.fn();
    render(
      <PeerToPeerContext.Provider value={{ sendChat: fn }}>
        <ChatForm/>
      </PeerToPeerContext.Provider>
    );
    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Send Message');
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('clicking the button with a message in the text input calls the expected function', () => {
    const message = 'huierwg iuhergfiuhw';
    const fn = jest.fn();
    render(
      <PeerToPeerContext.Provider value={{ sendChat: fn }}>
        <ChatForm/>
      </PeerToPeerContext.Provider>
    );
    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: message }});
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledWith(message);
  });

  test('clicking the button without a message in the text input does nothing', () => {
    const fn = jest.fn();
    render(
      <PeerToPeerContext.Provider value={{ sendChat: fn }}>
        <ChatForm/>
      </PeerToPeerContext.Provider>
    );
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(fn).not.toHaveBeenCalledWith();
  });
});
