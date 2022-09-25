import { act, render, screen } from '@testing-library/react';

import { Clock } from './Clock';

describe('<Clock />', () => {
    beforeAll(() => {
        jest.useFakeTimers();
    });

    afterAll(() => {
        jest.useRealTimers();
    });

    it('shows current time initially', async () => {
        jest.setSystemTime(new Date('1970-12-31T01:02:34'));

        render(<Clock />);

        expect(screen.getByText('01:02:34')).toBeInTheDocument();
    });

    it('updates time every second', async () => {
        jest.setSystemTime(new Date('1970-12-31T23:59:59'));

        render(<Clock />);

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(await screen.findByText('23:59:59')).toBeInTheDocument();

        act(() => {
            jest.advanceTimersByTime(500);
        });

        expect(await screen.findByText('00:00:00')).toBeInTheDocument();
    });
});
