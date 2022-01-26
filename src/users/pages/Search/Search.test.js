import { render, screen } from '@testing-library/react';
import { BrowserRouter as Router } from 'react-router-dom';
import { Home } from '.';

test('render Home', () => {
  render(
    <Router>
      <Home />
    </Router>
  );
  const linkElement = screen.getByText(/Início/i);
  expect(linkElement).toBeInTheDocument();
});
