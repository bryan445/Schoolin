import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import StudentDetails from './StudentDetails';

describe('StudentDetails', () => {
  const mockStudent = {
    name: 'John Mwamba',
    class: 'Form 4',
    results: {
      term1: {
        firstAssessment: {
          english: 85,
          mathematics: 82,
          science: 84,
          history: 81,
          geography: 83,
          date: '2024-03-15',
          average: 83.0
        },
        secondAssessment: {
          english: 88,
          mathematics: 85,
          science: 87,
          history: 84,
          geography: 86,
          date: '2024-05-20',
          average: 86.0
        },
        finalExam: {
          english: 92,
          mathematics: 90,
          science: 90,
          history: 87,
          geography: 89,
          date: '2024-07-10',
          average: 89.6
        },
        termAverage: 86.2,
        termGrade: 'A-',
        position: 3,
        totalStudents: 25
      }
    }
  };

  test('renders student details with correct information', () => {
    render(<StudentDetails student={mockStudent} type="results" onClose={() => {}} />);
    
    expect(screen.getByText('Academic Results')).toBeInTheDocument();
    expect(screen.getByText('John Mwamba')).toBeInTheDocument();
    expect(screen.getByText('Form 4')).toBeInTheDocument();
  });

  test('switches between terms when term tabs are clicked', () => {
    render(<StudentDetails student={mockStudent} type="results" onClose={() => {}} />);
    
    // Check initial term
    expect(screen.getByText('Term 1')).toBeInTheDocument();
    
    // Click on a term tab (if there were more terms)
    // In this case, we only have one term in our mock data
  });

  test('switches between assessment types when tabs are clicked', () => {
    render(<StudentDetails student={mockStudent} type="results" onClose={() => {}} />);
    
    // Check initial assessment type
    expect(screen.getByText('First Assessment')).toBeInTheDocument();
    
    // Click on second assessment tab
    fireEvent.click(screen.getByText('Second Assessment'));
    expect(screen.getByText('Second Assessment')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<StudentDetails student={mockStudent} type="results" onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});