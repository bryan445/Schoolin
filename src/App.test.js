import React from 'react';
import { render, screen } from '@testing-library/react';
import { BrowserRouter } from 'react-router-dom';
import App from './App';

// Mock the fetch API for school data
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

describe('App', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('renders home page at root route', () => {
    render(
      <BrowserRouter>
        <App />
      </BrowserRouter>
    );
    
    // Check that the home page content is rendered
    expect(screen.getByText('Schoolin')).toBeInTheDocument();
    expect(screen.getByText('Your Gateway to School Information')).toBeInTheDocument();
  });

  test('renders school page at /school/:schoolId route', async () => {
    render(
      <BrowserRouter initialEntries={['/school/ngoms']}>
        <App />
      </BrowserRouter>
    );
    
    // Wait for the school page to load
    const schoolName = await screen.findByText('Ngoms');
    expect(schoolName).toBeInTheDocument();
  });
});