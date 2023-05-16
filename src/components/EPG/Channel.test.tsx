import { it, describe, expect, afterEach } from 'vitest';
import { fireEvent, render, renderHook, screen, cleanup } from '@testing-library/react';
import { Channel } from './Channel';
import { useChannelStore } from '../../store/useChannelStore';
describe('should channel renders with valid props', () => {
    afterEach(cleanup);
    it("should channel renders with props", async () => {
        const event = {
            name: 'Primer evento',
            date_begin: "2023/05/12 20:00:00",
            date_end: "2023/05/12 20:30:00"
        }

        render(<Channel event={event} />);

        const name = await screen.findByTestId('channel-name');
        const time = await screen.findByTestId('channel-time');
 
        expect(name.textContent).equals(event.name);
        expect(time.textContent).equals(`${event.date_begin.split(' ')[1]} - ${event.date_end.split(' ')[1]}`);
    });

    it("should handle mouseover function set current_event", () => {
        const event = {
            name: 'Primer evento',
            date_begin: "2023/05/12 20:00:00",
            date_end: "2023/05/12 20:30:00"
        }
        render(<Channel event={event} />);

        const eventDiv = screen.getByTestId("hover-test");

        const { result } = renderHook(() => useChannelStore((state) => state.current_event));

        // Act
        fireEvent.mouseOver(eventDiv);

        expect(result.current.name).equals(event.name)
    });
    it('should show message with event empty', () => {
        render(<Channel event={{}} />);
        const no_event = screen.getByTestId("no-event");
        expect(no_event.textContent).equals('Sin evento');
    })



})