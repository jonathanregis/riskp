import { render, screen, fireEvent } from '@testing-library/react';
import { PairSelector } from './PairSelector';
import '@testing-library/jest-dom';

describe('PairSelector component', () => {
    const onApply = jest.fn();
    const defaultBase = 'ETH';
    const defaultQuote = 'USD';

    test('renders from and to select fields', () => {
        const { container } = render(<PairSelector defaultBase={defaultBase} defaultQuote={defaultQuote} onApply={onApply} />);
        const baseSelect = screen.getByLabelText('from');
        const quoteSelect = screen.getByLabelText('to');

        expect(baseSelect).toBeInTheDocument();
        expect(quoteSelect).toBeInTheDocument();
        expect(container).toMatchSnapshot();
    });

    test('calls onApply function when update button is clicked', () => {
        const { container } = render(<PairSelector defaultBase={defaultBase} defaultQuote={defaultQuote} onApply={onApply} />);
        const newBase = 'BTC';
        const newQuote = 'EUR';

        fireEvent.change(screen.getByLabelText('from'), { target: { value: newBase } });
        fireEvent.change(screen.getByLabelText('to'), { target: { value: newQuote } });
        setTimeout(() => {
            expect(screen.getByLabelText('from')).toHaveValue(newBase);
            expect(screen.getByLabelText('to')).toHaveValue(newQuote);
            const updateButton = screen.getByText('update');
            fireEvent.click(updateButton);

            expect(onApply).toHaveBeenCalledTimes(1);
            expect(onApply).toHaveBeenCalledWith(newBase, newQuote);
        }, 4000)

        expect(container).toMatchSnapshot();
    });
});
