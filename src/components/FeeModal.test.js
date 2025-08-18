import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FeeModal from './FeeModal';

describe('FeeModal', () => {
  const mockSchoolData = {
    name: 'Chisomo Academy',
    detailedFees: {
      nursery: {
        level: 'Nursery',
        tuitionFee: 'MK 50,000',
        admissionFee: 'MK 10,000',
        developmentFee: 'MK 5,000',
        booksAndMaterials: 'MK 8,000',
        uniformFee: 'MK 12,000',
        total: 'MK 85,000'
      },
      primary: {
        level: 'Primary',
        tuitionFee: 'MK 70,000',
        admissionFee: 'MK 15,000',
        developmentFee: 'MK 10,000',
        booksAndMaterials: 'MK 12,000',
        uniformFee: 'MK 15,000',
        total: 'MK 122,000'
      },
      secondary: {
        level: 'Secondary',
        tuitionFee: 'MK 100,000',
        admissionFee: 'MK 20,000',
        developmentFee: 'MK 15,000',
        booksAndMaterials: 'MK 18,000',
        examFees: 'MK 5,000',
        laboratoryFee: 'MK 10,000',
        computerLab: 'MK 8,000',
        sportsAndActivities: 'MK 5,000',
        uniformFee: 'MK 20,000',
        total: 'MK 201,000'
      },
      additionalInfo: 'Fees are subject to annual review and may change.'
    }
  };

  test('renders fee modal with correct school name', () => {
    render(<FeeModal schoolData={mockSchoolData} onClose={() => {}} />);
    
    expect(screen.getByText('Fee Structure')).toBeInTheDocument();
    expect(screen.getByText('Chisomo Academy')).toBeInTheDocument();
  });

  test('displays fee information for all levels', () => {
    render(<FeeModal schoolData={mockSchoolData} onClose={() => {}} />);
    
    expect(screen.getByText('Nursery')).toBeInTheDocument();
    expect(screen.getByText('Primary')).toBeInTheDocument();
    expect(screen.getByText('Secondary')).toBeInTheDocument();
  });

  test('calls onClose when close button is clicked', () => {
    const mockOnClose = jest.fn();
    render(<FeeModal schoolData={mockSchoolData} onClose={mockOnClose} />);
    
    fireEvent.click(screen.getByText('Close'));
    expect(mockOnClose).toHaveBeenCalled();
  });
});