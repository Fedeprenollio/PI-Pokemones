import { render, screen } from '@testing-library/react';
import App from './App';
import Creation from './src/Creation';

test('renders learn react link', () => {
  render(<App />);
  const linkElement = screen.getByText(/learn react/i);
  expect(linkElement).toBeInTheDocument();
});

test('Renderizar saludo', () => {
  render(<Creation />);
  const linkElement = screen.getByText(/Crea tu pokemon/i);
  expect(linkElement).toBeInTheDocument();
});


