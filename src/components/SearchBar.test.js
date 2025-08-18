import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SearchBar from './SearchBar';

describe('SearchBar', () => {
  test('renders search input', () => {
    render(<SearchBar value="" onChange={() => {}} />);
    expect(screen.getByPlaceholderText('Search schools by name or location...')).toBeInTheDocument();
  });

  test('calls onChange when input value changes', () => {
    const mockOnChange = jest.fn();
    render(<SearchBar value="" onChange={mockOnChange} />);
    
    const input = screen.getByPlaceholderText('Search schools by name or location...');
    fireEvent.change(input, { target: { value: 'test' } });
    
    expect(mockOnChange).toHaveBeenCalledWith('test');
  });

  test('displays the correct value', () => {
    render(<SearchBar value="test value" onChange={() => {}} />);
    
    const input = screen.getByPlaceholderText('Search schools by name or location...');
    expect(input).toHaveValue('test value');
  });
});