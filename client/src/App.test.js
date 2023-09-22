import { render } from '@testing-library/react';
import App from './App';

test('renders landing page content', () => {
  const { getByText } = render(<App />);
  
  // Check for specific elements or text in your landing page content
  const welcomeText = getByText(/Welcome to the Appointment App/i);
  const manageText = getByText(/Manage your appointments easily!/i);
  
  // You can add more checks as needed based on your landing page content
  
  expect(welcomeText).toBeInTheDocument();
  expect(manageText).toBeInTheDocument();
});
