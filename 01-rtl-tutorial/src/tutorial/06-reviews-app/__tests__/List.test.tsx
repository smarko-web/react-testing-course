import { render, screen } from '@testing-library/react';
import { describe, test, expect } from 'vitest';
import List from '../List';
import { Review } from '../Sandbox';

// Mock data is used to simulate real data that would typically come from an API or user input
// This allows us to test our components in isolation without depending on external services
const mockReviews: Review[] = [
  {
    email: 'test@example.com',
    rating: '4',
    text: 'Great product!',
  },
  {
    email: 'user@example.com',
    rating: '5',
    text: 'Excellent service',
  },
];


describe('list component', () => {
  test('renders headings', () => {
    render(<List reviews={mockReviews}/>);
    expect(screen.getByRole('heading', { level: 2, name: /Reviews/i })).toBeInTheDocument();
  });
  test('no reviews heading', () => {
     render(<List reviews={[]} />);
     expect(screen.getByText('No reviews yet')).toBeInTheDocument();
  });
  test('render reviews correctly when provided', () => {
    render(<List reviews={mockReviews} />);
    mockReviews.forEach((review) => {
      expect(screen.getByText(review.email)).toBeInTheDocument();
      expect(screen.getByText(review.text)).toBeInTheDocument();
      // Check if stars are rendered
      const stars = '⭐'.repeat(Number(review.rating));
      expect(screen.getByText(stars)).toBeInTheDocument();
    });
  });
});
