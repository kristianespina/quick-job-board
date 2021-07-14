// app.test.js
import { render, screen } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import { createMemoryHistory } from 'history'
import React from 'react'
import { Router } from 'react-router-dom'

import '@testing-library/jest-dom/extend-expect'

import JobListing from './index'

test('renders the job listing page', () => {
  const history = createMemoryHistory()
  const route = '/joblisting'
  history.push(route)
  render(
    <Router history={history}>
      <JobListing />
    </Router>
  )

  const searchText = screen.getByPlaceholderText(/Search for job title, or position/i);
  expect(searchText).toBeInTheDocument();

  const title = screen.getByText(/Job Listings/i);
  expect(title).toBeInTheDocument();
})