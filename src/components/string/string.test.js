/* eslint-disable testing-library/no-wait-for-multiple-assertions */
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { StringComponent } from "./string";
import { BrowserRouter } from 'react-router-dom';
import { DELAY_IN_MS } from '../../constants/delays';

describe('String Commponent', () => {

    it('A string with an even number of characters is expanded correctly', async () => {
        render(
            <BrowserRouter>
                <StringComponent />
            </BrowserRouter>
        );
        const inputElement = screen.getByTestId('input');
        fireEvent.change(inputElement, { target: {value: '1234'} })
        expect(inputElement.value).toBe('1234')

        const buttonElement = screen.getByTestId('reverse_button');
        fireEvent.click(buttonElement);

        await waitFor(() => {
            const circles = screen.getAllByTestId('circle');
            expect(circles[0]).toHaveTextContent('4');
            expect(circles[1]).toHaveTextContent('3');
            expect(circles[2]).toHaveTextContent('2');
            expect(circles[3]).toHaveTextContent('1');
        }, { timeout: DELAY_IN_MS * 3 } )
    }); 
});
