import { render, screen } from '@testing-library/react';
import StatsCard from '@/components/user/StatsCard';

describe('StatsCard', () => {
  test('renders title and count correctly', () => {
    render(<StatsCard title='Total Users' count={42} />);

    expect(screen.getByText('Total Users')).toBeInTheDocument();
    expect(screen.getByText('42')).toBeInTheDocument();
  });

  test('renders with zero count', () => {
    render(<StatsCard title='Active Sessions' count={0} />);

    expect(screen.getByText('Active Sessions')).toBeInTheDocument();
    expect(screen.getByText('0')).toBeInTheDocument();
  });

  test('renders with large numbers', () => {
    render(<StatsCard title='Total Views' count={1000000} />);

    expect(screen.getByText('Total Views')).toBeInTheDocument();
    expect(screen.getByText('1000000')).toBeInTheDocument();
  });
});
