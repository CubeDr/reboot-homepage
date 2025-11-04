import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Header from '../Header';

jest.mock('next/font/google', () => ({
  Do_Hyeon: () => ({ className: 'do-hyeon' }),
}));

jest.mock('next/navigation', () => ({
  usePathname: () => '/',
}));

describe('Header', () => {
  it('renders a heading', () => {
    render(<Header />);

    const heading = screen.getByText(/REBOOT/i);

    expect(heading).toBeInTheDocument();
  });

  it('renders a link to the home page', () => {
    render(<Header />);

    const link = screen.getByRole('link');

    expect(link).toHaveAttribute('href', '/');
  });
});
