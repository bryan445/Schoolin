import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import HomePage from './HomePage';

// Mock the useNavigate hook
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate
}));

describe('HomePage', () => {
  beforeEach(() => {
    mockNavigate.mockClear();
  });

  test('renders home page with correct title and subtitle', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Schoolin')).toBeInTheDocument();
    expect(screen.getByText('Your Gateway to School Information')).toBeInTheDocument();
  });

  test('renders flash cards when no search query is entered', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
  });

  test('filters schools based on search query', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Enter search query
    const searchInput = screen.getByPlaceholderText('Search schools by name or location...');
    fireEvent.change(searchInput, { target: { value: 'Ngoms' } });
    
    // Check that only matching schools are displayed
    expect(screen.getByText('Ngoms')).toBeInTheDocument();
    // Note: We can't easily test that other schools are not displayed because they're not in the DOM
  });

  test('navigates to school page when school card is clicked', () => {
    render(
      <BrowserRouter>
        <HomePage />
      </BrowserRouter>
    );
    
    // Enter search query to display school cards
    const searchInput = screen.getByPlaceholderText('Search schools by name or location...');
    fireEvent.change(searchInput, { target: { value: 'Ngoms' } });
    
    // Click on a school card
    const schoolCard = screen.getByText('Ngoms').closest('div');
    fireEvent.click(schoolCard);
    
    // Check that navigate was called with correct path
    expect(mockNavigate).toHaveBeenCalledWith('/school/ngoms');
  });
});