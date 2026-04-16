import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import App from './App';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';

// Mock the Maps component since react-leaflet causes ESM issues in Jest
jest.mock('./components/Maps', () => () => <div data-testid="mock-map" />);

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
    },
  },
});

test('renders app title', () => {
  render(
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  );
  const titleElement = screen.getByText((content, element) => {
    return element?.tagName.toLowerCase() === 'h1' && content.includes('IP-Tracker');
  });
  expect(titleElement).toBeInTheDocument();
});
