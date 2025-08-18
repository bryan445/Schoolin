import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import SchoolComparison from './SchoolComparison';

describe('SchoolComparison', () => {
  const mockSchools = [
    { id: 'ngoms', name: 'Ngoms' },
    { id: 'soba', name: 'Soba' }
  ];
  
  const mockOnClose = jest.fn();
  const mockOnRemoveSchool = jest.fn();

  beforeEach(() => {
    mockOnClose.mockClear();
    mockOnRemoveSchool.mockClear();
  });

  test('renders school comparison with correct school names', () => {
    render(
      <SchoolComparison 
        schools={mockSchools} 
        onClose={mockOnClose} 
        onRemoveSchool={mockOnRemoveSchool} 
      />
    );
    
    expect(screen.getByText('School Comparison')).toBeInTheDocument();
    expect(screen.getByText('Ngoms')).toBeInTheDocument();
    expect(screen.getByText('Soba')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    render(
      <SchoolComparison 
        schools={mockSchools} 
        onClose={mockOnClose} 
        onRemoveSchool={mockOnRemoveSchool} 
      />
    );
    
    fireEvent.click(screen.getByText('×'));
    expect(mockOnClose).toHaveBeenCalled();
  });

  test('calls onRemoveSchool when remove button is clicked', () => {
    render(
      <SchoolComparison 
        schools={mockSchools} 
        onClose={mockOnClose} 
        onRemoveSchool={mockOnRemoveSchool} 
      />
    );
    
    const removeButtons = screen.getAllByText('Remove');
    fireEvent.click(removeButtons[0]);
    
    expect(mockOnRemoveSchool).toHaveBeenCalledWith('chisomo');
  });
});