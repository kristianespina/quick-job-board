import { render, screen } from '@testing-library/react';
import App from './App';

test('Renders all textboxes', () => {
  render(<App />);
  const searchText = screen.getByPlaceholderText(/Search for job title, or position/i);
  const emailText = screen.getByPlaceholderText(/Enter your email address/i);
  expect(searchText).toBeInTheDocument();
  expect(emailText).toBeInTheDocument();
});
