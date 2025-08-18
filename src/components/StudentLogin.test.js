import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentLogin from './StudentLogin';

describe('StudentLogin', () => {
  const mockOnLogin = jest.fn();
  
  beforeEach(() => {
    mockOnLogin.mockClear();
  });

  test('renders login form with correct fields', () => {
    render(<StudentLogin onLogin={mockOnLogin} schoolId="test" />);
    
    expect(screen.getByPlaceholderText('Enter your full name (e.g., John Mwamba)')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Enter your class (e.g., Form 4)')).toBeInTheDocument();
    expect(screen.getByText('View Account')).toBeInTheDocument();
  });

  test('calls onLogin with student data when form is submitted', async () => {
    render(<StudentLogin onLogin={mockOnLogin} schoolId="ngoms" />);
    
    // Fill in the form
    fireEvent.change(screen.getByPlaceholderText('Enter your full name (e.g., John Mwamba)'), {
      target: { value: 'John Mwamba' }
    });
    fireEvent.change(screen.getByPlaceholderText('Enter your class (e.g., Form 4)'), {
      target: { value: 'Form 4' }
    });
    
    // Submit the form
    fireEvent.click(screen.getByText('View Account'));
    
    // Wait for async operation
    await screen.findByText('View Account');
    
    // Check that onLogin was called
    expect(mockOnLogin).toHaveBeenCalled();
  });

  test('shows error message when form is submitted with empty fields', () => {
    render(<StudentLogin onLogin={mockOnLogin} schoolId="test" />);
    
    // Submit the form without filling it
    fireEvent.click(screen.getByText('View Account'));
    
    expect(screen.getByText('Please enter your name and class')).toBeInTheDocument();
  });

  test('calls onLogin with null when cancel button is clicked', () => {
    render(<StudentLogin onLogin={mockOnLogin} schoolId="test" />);
    
    fireEvent.click(screen.getByText('Cancel'));
    
    expect(mockOnLogin).toHaveBeenCalledWith(null);
  });
});