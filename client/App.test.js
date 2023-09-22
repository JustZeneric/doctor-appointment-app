import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';

test('renders App correctly', () => {
  render(<App />);
  const welcomeText = screen.getByText(/Welcome to the Appointment App/i);
  expect(welcomeText).toBeInTheDocument();
});
