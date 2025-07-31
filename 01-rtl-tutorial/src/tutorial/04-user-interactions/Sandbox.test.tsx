import { render, screen, fireEvent, logRoles } from '@testing-library/react';
// need to install as separate package
// "npm install @testing-library/user-event"
// something we will cover/do in the next chapter (not required for this chapter)
import userEvent from '@testing-library/user-event';
import Sandbox from './Sandbox';

describe('04-user-interactions', () => {
    test('Screen Debug', () => {
        const { container } = render(<Sandbox />);
        screen.debug();
        logRoles(container);
    })
    test('should increment and decrement count using fireEvent (legacy approach)', () => {
      render(<Sandbox />);

      const increaseButton = screen.getByRole('button', { name: /increase/i });
      const decreaseButton = screen.getByRole('button', { name: /decrease/i });

      expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
      // Using fireEvent (legacy way)
      fireEvent.click(increaseButton);
      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

      fireEvent.click(decreaseButton);
      expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    });

    test('should increment and decrement count using userEvent', async () => {
      render(<Sandbox />);
      const user = userEvent.setup();

      const increaseButton = screen.getByRole('button', { name: /increase/i });
      const decreaseButton = screen.getByRole('button', { name: /decrease/i });

      // Initial count should be 0
      expect(screen.getByText(/count: 0/i)).toBeInTheDocument();

      // Using userEvent (preferred way)
      await user.click(increaseButton);
      expect(screen.getByText(/count: 1/i)).toBeInTheDocument();

      await user.click(decreaseButton);
      expect(screen.getByText(/count: 0/i)).toBeInTheDocument();
    });

    it('toggles between unlike and like buttons when clicked', async () => {
      const user = userEvent.setup();
      render(<Sandbox />);

      // Initially shows unlike button (outline heart)
      const unlikeButton = screen.getByRole('button', {
        name: 'unlike button',
      });
      expect(unlikeButton).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'like button' })
      ).not.toBeInTheDocument();

      // Click unlike button
      await user.click(unlikeButton);

      // Should now show like button (filled heart)
      const likeButton = screen.getByRole('button', { name: 'like button' });
      expect(likeButton).toBeInTheDocument();
      expect(
        screen.queryByRole('button', { name: 'unlike button' })
      ).not.toBeInTheDocument();
    });

});