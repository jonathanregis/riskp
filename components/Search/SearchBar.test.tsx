import React from 'react';
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react';
import SearchTokenPair from './SearchTokenPair';

describe('SearchTokenPair', () => {
    it('renders an input field', () => {
        render(<SearchTokenPair />);
        const input = screen.getByPlaceholderText('Search here');
        expect(input).toBeInTheDocument();
    });

    it('renders no results message when no matching token is found', () => {
        render(<SearchTokenPair />);
        const input = screen.getByPlaceholderText('Search here');
        fireEvent.change(input, { target: { value: 'nonexistenttoken' } });
        const noResultsMessage = screen.getByText('No results found for "nonexistenttoken"');
        expect(noResultsMessage).toBeInTheDocument();
    });
    jest.setTimeout(10000);

    it('renders a list of matching tokens when search term matches', async () => {
        render(<SearchTokenPair />);
        const input = screen.getByPlaceholderText('Search here');
        fireEvent.change(input, { target: { value: 'matic' } });
        const resultList = screen.getByRole('list');
        expect(resultList).toBeInTheDocument();
        setTimeout(() => {
            const resultLinks = screen.getAllByRole('link');
            expect(resultLinks[0]).toHaveAttribute('href', '/trade/MATIC-USD');
        }, 4000)

    });
});