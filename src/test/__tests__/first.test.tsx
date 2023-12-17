import '@testing-library/jest-dom';
import { render, screen } from '@testing-library/react';
import Test from '../Test';

// Describe the test case
describe('MyComponent', () => {
    it('Should succeed', () => {
        render(<Test message="Hello, World!" />);

        expect(screen.getByText('Hello, World!')).toBeDefined();
    });

    it('Should fail', () => {
        render(<Test message="Hello, World!" />);

        expect(screen.getByText('Hello!!')).toBeDefined();
    });
});
