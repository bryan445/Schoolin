import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import FlashCards from './FlashCards';

describe('FlashCards', () => {
  test('renders flash cards with correct content', () => {
    render(<FlashCards />);
    
    // Check that at least one card is rendered
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    expect(screen.getByText('School Information')).toBeInTheDocument();
  });

  test('changes card when indicator is clicked', () => {
    render(<FlashCards />);
    
    // Check initial card
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    
    // Click on second indicator
    const indicators = screen.getAllByRole('button');
    fireEvent.click(indicators[1]);
    
    // Check that the card changed
    expect(screen.getByText('Monitor Performance')).toBeInTheDocument();
  });

  test('cycles through cards automatically', () => {
    jest.useFakeTimers();
    
    render(<FlashCards />);
    
    // Check initial card
    expect(screen.getByText('Stay Updated')).toBeInTheDocument();
    
    // Fast forward time
    jest.advanceTimersByTime(4000);
    
    // Check that the card changed
    expect(screen.getByText('Monitor Performance')).toBeInTheDocument();
    
    jest.useRealTimers();
  });
});