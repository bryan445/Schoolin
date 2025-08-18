import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { BrowserRouter, MemoryRouter } from 'react-router-dom';
import SchoolPage from './SchoolPage';

// Mock the fetch API
global.fetch = jest.fn(() =>
  Promise.resolve({
    ok: true,
    json: () => Promise.resolve({
      name: 'Ngoms',
      location: 'Zalewa',
      motto: 'Excellence Through Knowledge',
      fees: 'MK 150,000 per term',
      about: 'Established in 1985, Ngoms is a premier educational institution in Zalewa.',
      admissionInfo: {
        requirements: 'Birth certificate, Previous school reports, Medical certificate, Passport photos (4)',
        process: 'Visit the school office, Complete application form, Pay application fee of MK 5,000, Attend interview',
        deadline: 'Applications close on December 15th each year',
        contact: 'Phone: +265 1 234 567 | Email: admissions@ngoms.edu.mw'
      },
      news: [
        {
          title: 'New Science Laboratory Opened',
          date: '2025-01-10',
          content: 'We are excited to announce the opening of our state-of-the-art science laboratory.'
        }
      ],
      announcements: [
        {
          title: 'Term 1 2025 Begins',
          date: '2025-01-15',
          content: 'Classes for Term 1 2025 begin on January 22nd. All students should report by 7:00 AM.',
          urgent: true
        }
      ]
    })
  })
);

describe('SchoolPage', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders loading state initially', () => {
    render(
      <MemoryRouter initialEntries={['/school/ngoms']}>
        <SchoolPage />
      </MemoryRouter>
    );
    
    expect(screen.getByText('Loading school information...')).toBeInTheDocument();
  });

  test('renders school information after loading', async () => {
    render(
      <MemoryRouter initialEntries={['/school/ngoms']}>
        <SchoolPage />
      </MemoryRouter>
    );
    
    // Wait for the data to load
    const schoolName = await screen.findByText('Ngoms');
    expect(schoolName).toBeInTheDocument();
    
    // Check that other information is displayed
    expect(screen.getByText('Zalewa')).toBeInTheDocument();
    expect(screen.getByText('Excellence Through Knowledge')).toBeInTheDocument();
  });

  test('renders error message when fetch fails', async () => {
    // Mock fetch to return an error
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        ok: false,
        status: 404,
        statusText: 'Not Found'
      })
    );
    
    render(
      <MemoryRouter initialEntries={['/school/nonexistent']}>
        <SchoolPage />
      </MemoryRouter>
    );
    
    // Wait for the error message
    const errorMessage = await screen.findByText(/Failed to load school data/);
    expect(errorMessage).toBeInTheDocument();
  });

  test('switches between tabs when tab buttons are clicked', async () => {
    render(
      <MemoryRouter initialEntries={['/school/ngoms']}>
        <SchoolPage />
      </MemoryRouter>
    );
    
    // Wait for the data to load
    await screen.findByText('Ngoms');
    
    // Check initial tab
    expect(screen.getByText('Latest Announcements')).toBeInTheDocument();
    
    // Click on About tab
    fireEvent.click(screen.getByText('About'));
    expect(screen.getByText('About Ngoms')).toBeInTheDocument();
    
    // Click on Admission tab
    fireEvent.click(screen.getByText('Admission'));
    expect(screen.getByText('Admission Information')).toBeInTheDocument();
  });
});