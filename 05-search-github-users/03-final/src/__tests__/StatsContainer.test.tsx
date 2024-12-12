import { render, screen } from '@testing-library/react';
import StatsContainer from '@/components/user/StatsContainer';

describe('StatsContainer', () => {
  test('renders all stats cards with correct values', () => {
    const props = {
      totalRepos: 25,
      followers: 100,
      following: 50,
      gists: 10,
    };

    render(<StatsContainer {...props} />);

    expect(screen.getByText('Total Repositories')).toBeInTheDocument();
    expect(screen.getByText('25')).toBeInTheDocument();

    expect(screen.getByText('Followers')).toBeInTheDocument();
    expect(screen.getByText('100')).toBeInTheDocument();

    expect(screen.getByText('Following')).toBeInTheDocument();
    expect(screen.getByText('50')).toBeInTheDocument();

    expect(screen.getByText('Gists')).toBeInTheDocument();
    expect(screen.getByText('10')).toBeInTheDocument();
  });
});
