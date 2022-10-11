import { render, screen } from '@testing-library/react';
import App from './App';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/Enter username/i);
  expect(linkElement).toBeInTheDocument();
});

test('check if class exists', () => {
  const { container } = render(<App />);
  const divs = container.getElementsByClassName('App');
  expect(divs.length).toBe(1);
})