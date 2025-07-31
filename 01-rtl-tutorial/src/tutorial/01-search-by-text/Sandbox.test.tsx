import { render, screen } from "@testing-library/react";
import Sandbox from "./Sandbox";

describe('01-search-by-text', () => {
  it('check heading text', () => {
    render(<Sandbox />);

    expect(screen.getByText('React Testing Library Examples')).toBeInTheDocument();
  });
  it('verify phone number', () => {
    render(<Sandbox />);

    const phoneRegex = /\d{3}-\d{3}-\d{4}/;
    const phoneText = screen.getByText(phoneRegex);
    expect(phoneText).toBeInTheDocument();
  });
  it('Error message', () => {
    render(<Sandbox />);
    const errorMessage = screen.queryByText('Error message');
    expect(errorMessage).not.toBeInTheDocument();
  });
  it('check list items', () => {
    render(<Sandbox />);
    const listItems = screen.getAllByText('Item 1');

    expect(listItems).toHaveLength(3);
  });
  it('check Async message', async() => {
    render(<Sandbox />);
    const asyncMessage = await screen.findByText('Async message');

    expect(asyncMessage).toBeInTheDocument();
  });
});