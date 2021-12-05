/**
 * @jest-environment jsdom
 */

import React from 'react';
import { render, screen } from '@testing-library/react';
import * as nextRouter from 'next/router';
import Home from '../pages/index';

nextRouter.useRouter = jest.fn();
nextRouter.useRouter.mockImplementation(() => ({ route: '/', query: '' }));

describe('Admin', () => {
  it('should render header', () => {
    render(<Home />);

    const heading = screen.getByText('ADMIN Customers');
    const logo = screen.getByRole('img', {
      name: 'Wethenew',
    });

    expect(heading).toBeInTheDocument();
    expect(logo).toBeInTheDocument();
  });
});
