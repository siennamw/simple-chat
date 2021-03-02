import { fireEvent, render, screen } from '@testing-library/react';
import DisplayName from './DisplayName';
import { PeerToPeerContext } from '../providers/PeerToPeerContext';

describe('DisplayName', () => {
  test('renders a form with a text input and a button', () => {
    const fn = jest.fn();

    render(
      <PeerToPeerContext.Provider value={{ changeOwnName: fn }}>
        <DisplayName/>
      </PeerToPeerContext.Provider>
    );

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('Update Display Name');
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
  });

  test('clicking the button with text in the text input calls the expected function', () => {
    const name = 'bjknnre';
    const newName = 'iuhergfiuhw';
    const fn = jest.fn();
    render(
      <PeerToPeerContext.Provider value={{ changeOwnName: fn, name  }}>
        <DisplayName/>
      </PeerToPeerContext.Provider>
    );
    const button = screen.getByRole('button');
    const input = screen.getByRole('textbox');

    expect(button).toBeInTheDocument();
    expect(input).toBeInTheDocument();

    fireEvent.change(input, { target: { value: newName }});
    fireEvent.click(button);

    expect(fn).toHaveBeenCalledWith(newName);
  });

  test('clicking the button without text in the text input does nothing', () => {
    const fn = jest.fn();
    render(
      <PeerToPeerContext.Provider value={{ changeOwnName: fn  }}>
        <DisplayName/>
      </PeerToPeerContext.Provider>
    );
    const button = screen.getByRole('button');

    expect(button).toBeInTheDocument();
    fireEvent.click(button);

    expect(fn).not.toHaveBeenCalledWith();
  });
});
