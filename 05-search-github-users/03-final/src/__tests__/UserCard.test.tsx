import { render, screen } from '@testing-library/react';
import { describe, it, expect } from 'vitest';
import UserCard from '@/components/user/UserCard';

describe('UserCard', () => {
  const mockProps = {
    avatarUrl: 'https://example.com/avatar.jpg',
    name: 'John Doe',
    bio: 'Frontend Developer',
    url: 'https://github.com/johndoe',
  };

  it('renders user information correctly', () => {
    render(<UserCard {...mockProps} />);

    // Check if name is rendered
    expect(screen.getByText('John Doe')).toBeInTheDocument();

    // Check if bio is rendered
    expect(screen.getByText('Frontend Developer')).toBeInTheDocument();

    // Check if avatar image is present with correct attributes
    const avatarImage = screen.getByAltText('John Doe');
    expect(avatarImage).toBeInTheDocument();
    expect(avatarImage).toHaveAttribute(
      'src',
      'https://example.com/avatar.jpg'
    );

    // Check if follow button/link is present with correct href
    const followLink = screen.getByRole('link', { name: /follow/i });
    expect(followLink).toHaveAttribute('href', 'https://github.com/johndoe');
    expect(followLink).toHaveAttribute('target', '_blank');
    expect(followLink).toHaveAttribute('rel', 'noreferrer');
  });

  it('renders default values when name and bio are not provided', () => {
    const propsWithoutNameAndBio = {
      ...mockProps,
      name: '',
      bio: '',
    };

    render(<UserCard {...propsWithoutNameAndBio} />);

    // Check if default name is rendered
    expect(screen.getByText('Coding Addict')).toBeInTheDocument();

    // Check if default bio is rendered
    expect(
      screen.getByText('Passionate about coding and technology')
    ).toBeInTheDocument();
  });
});
