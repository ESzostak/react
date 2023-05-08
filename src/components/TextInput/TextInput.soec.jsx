import { render, screen } from "@testing-library/react";
import { TextInput } from '.';
import userEvent from "@testing-library/user-event";

describe('<Posts />', () => {
    it('should have a value os searchValue', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'} />);

        const input = screen.getByPlaceholderText(/type your serach/i );

        expect(input.value).toBe('testando');
    });

    it('should call random change function on each key pressed', () => {
        const fn = jest.fn();
        render(<TextInput handleChange={fn} searchValue={'testando'} />);
        
        const input = screen.getByPlaceholderText(/type your serach/i );

        const value = 'o valor';

        userEvent.type(input, value);

        expect(input.value).toBe(value);
    });
    it('should match snapshot', () => {
        const fn = jest.fn();
        const { container } = render(<TextInput handleChange={fn} />);
        expect(container.firstChild).toMatchSnapshot();
    });
});