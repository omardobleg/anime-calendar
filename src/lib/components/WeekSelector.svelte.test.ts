import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest';
import { render, screen } from '@testing-library/svelte';
import WeekSelector, { type WeekSelectorProps } from './WeekSelector.svelte';

// Mock date to Wednesday to have consistent test results
const MOCK_TODAY = new Date('2024-07-24T12:00:00.000Z'); // This is a Wednesday, getDay() will be 3

/**
 * Renders the WeekSelector component with the given props.
 * @param props - The props to pass to the component.
 * @param props.active - The active day offset.
 */
const renderComponent = (props: { active: WeekSelectorProps['active'] }) => {
	return render(WeekSelector, { props });
};

describe('WeekSelector.svelte', () => {
	beforeEach(() => {
		vi.useFakeTimers();
		vi.setSystemTime(MOCK_TODAY);
	});

	afterEach(() => {
		vi.useRealTimers();
	});

	it('should render all days of the week', () => {
		renderComponent({ active: 0 });
		const weekDays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
		for (const day of weekDays) {
			expect(screen.getByText(day)).toBeInTheDocument();
		}
	});

	it('should generate correct links for each day relative to today (Wednesday)', () => {
		renderComponent({ active: 0 });
		const links = screen.getAllByRole('link');

		expect(links[0]).toHaveAttribute('href', '?active=-3'); // Sun
		expect(links[1]).toHaveAttribute('href', '?active=-2'); // Mon
		expect(links[2]).toHaveAttribute('href', '?active=-1'); // Tue
		expect(links[3]).toHaveAttribute('href', '?active=0'); // Wed
		expect(links[4]).toHaveAttribute('href', '?active=1'); // Thu
		expect(links[5]).toHaveAttribute('href', '?active=2'); // Fri
		expect(links[6]).toHaveAttribute('href', '?active=3'); // Sat
	});

	it.each([
		{ active: 0, expectedDayIndexSum: 3 },
		{ active: 2, expectedDayIndexSum: 5 },
		{ active: -1, expectedDayIndexSum: 2 }
	])(
		'should calculate the correct offset when active is $active',
		({ active, expectedDayIndexSum }) => {
			const { container } = renderComponent({ active });
			// This test assumes the bug with the missing closing parenthesis in the calc() function is fixed.
			const expectedOffsetString = `calc(((100% - .5rem) / 7 ) * (${expectedDayIndexSum}) + .25rem)`;
			const mainDiv = container.querySelector('div');
			expect(mainDiv).toHaveStyle(`--left-offset: ${expectedOffsetString}`);
		}
	);
});
