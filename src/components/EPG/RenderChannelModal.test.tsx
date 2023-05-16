import { describe, it, expect, afterEach, vi } from 'vitest';
import { fireEvent, render, cleanup, screen, renderHook } from '@testing-library/react';
import RenderChannelModal from './RenderChannelModal';
import { useChannelStore } from '../../store/useChannelStore';
import { EVENT_SIZE } from '../../constants/const';

describe('render channel modal', () => { 

    afterEach(cleanup);
    
    it('should show a message (No hay canalaes disponibles)', async () => {
        render(<RenderChannelModal channelData={[]} dates={[]} />)
        const no_available = await screen.findByRole('no_available');
        
        expect(no_available.textContent).equals('No hay canales disponibles.');
    });
    it('should show a list of channels', async () => {
               // Arrange
               const channelData = [
                {
                    number: 1,
                    image: "image1",
                    events: [
                        {
                            name: "event1",
                            date_begin: "2022-01-01 00:00:00",
                            date_end: "2022-01-01 01:00:00"
                        }
                    ]
                }
            ];
            const dates = ["2022-01-01"];
    
            // Act
            render(<RenderChannelModal channelData={channelData} dates={dates} />);
            // Assert
            expect(screen.getByText("HOY").textContent).equals('HOY');
            expect(screen.getByText("event1").textContent).equal(channelData[0].events[0].name);
    });
    it("should render channel modal with valid data", async () => {
        const channelData = [
            {
                number: "1",
                image: "image1",
                events: [
                    {
                        name: "event1",
                        date_begin: "2022-02-01 10:00:00",
                        date_end: "2022-02-01 11:00:00"
                    },
                    {
                        name: "event2",
                        date_begin: "2022-02-01 12:00:00",
                        date_end: "2022-02-01 13:00:00"
                    }
                ]
            },
            {
                number: "2",
                image: "image2",
                events: [
                    {
                        name: "event3",
                        date_begin: "2022-02-01 14:00:00",
                        date_end: "2022-02-01 15:00:00"
                    },
                    {
                        name: "event4",
                        date_begin: "2022-02-01 16:00:00",
                        date_end: "2022-02-01 17:00:00"
                    }
                ]
            }
        ];
        const dates = ["2022-02-01", "2022-02-02"];
        render(<RenderChannelModal channelData={channelData} dates={dates} />);
        const items = await screen.findAllByTestId("channel-item");
        expect(items).toHaveLength(2);
    });
    it("should sync scrolling between two divs", () => {
        // Arrange
        const channelData = [
            {
                number: 1,
                image: "image1",
                events: [
                    {
                        name: "event1",
                        date_begin: "2022-01-01 00:00:00",
                        date_end: "2022-01-01 01:00:00"
                    }
                ]
            }
        ];
        const dates = ["2022-01-01"];
        render(<RenderChannelModal channelData={channelData} dates={dates} />);
        const firstDiv = screen.getByTestId("first_div");
        const secondDiv = screen.getByTestId("second_div");

        // Act
        fireEvent.scroll(firstDiv, { target: { scrollLeft: 100 } });

        // Assert
        expect(secondDiv.scrollLeft).toEqual(100);
    });
    it("should handle mouseover function set current_event", () => {
        // Arrange
        const channelData = [
            {
                number: 1,
                image: "image1",
                events: [
                    {
                        name: "event1",
                        date_begin: "2022-02-01 10:00:00",
                        date_end: "2022-02-01 12:00:00"
                    }
                ]
            }
        ];
        const dates = ["2022-02-01"];
        render(<RenderChannelModal channelData={channelData} dates={dates} />);
        const eventDiv = screen.getByTestId("hover-test");
        const { result } = renderHook(() => useChannelStore((state) => state.current_event));

        // Act
        fireEvent.mouseOver(eventDiv);

        expect(result.current.name).equals(channelData[0].events[0].name)
    });
    it("should scroll left and right", () => {
        // Arrange
        const channelData = [
            {
                number: 1,
                image: "image1",
                events: [
                    {
                        name: "event1",
                        date_begin: "2022-02-01 10:00:00",
                        date_end: "2022-02-01 12:00:00"
                    }
                ]
            }
        ];
        const dates = ["2022-02-01"];
        render(<RenderChannelModal channelData={channelData} dates={dates} />);
        const firstDiv = screen.getByTestId("first_div");
        const secondDiv = screen.getByTestId("second_div");
        const minusButton = screen.getByTestId("scroll_minus");
        const plusButton = screen.getByTestId("scroll_plus");
        

        // Act
        // fireEvent.click(plusButton);
        fireEvent.click(minusButton);

        // Assert
        expect(firstDiv.scrollLeft).toEqual(-EVENT_SIZE);
        expect(secondDiv.scrollLeft).toEqual(-EVENT_SIZE);
        fireEvent.click(plusButton);
        fireEvent.click(plusButton);
        expect(firstDiv.scrollLeft).toEqual(EVENT_SIZE);
        expect(secondDiv.scrollLeft).toEqual(EVENT_SIZE);
    });
    it("should scroll left and right within available events", () => {
        const channelData = [
            {
                number: "1",
                image: "image1",
                events: [
                    {
                        name: "event1",
                        date_begin: "2022-02-01 10:00:00",
                        date_end: "2022-02-01 11:00:00"
                    },
                    {
                        name: "event2",
                        date_begin: "2022-02-01 12:00:00",
                        date_end: "2022-02-01 13:00:00"
                    }
                ]
            },
            {
                number: "2",
                image: "image2",
                events: [
                    {
                        name: "event3",
                        date_begin: "2022-02-01 14:00:00",
                        date_end: "2022-02-01 15:00:00"
                    },
                    {
                        name: "event4",
                        date_begin: "2022-02-01 16:00:00",
                        date_end: "2022-02-01 17:00:00"
                    }
                ]
            }
        ];
        const dates = ["2022-02-01", "2022-02-02"];
        render(<RenderChannelModal channelData={channelData} dates={dates} />);
        const firstDiv = screen.getByTestId("first_div");
        const secondDiv = screen.getByTestId("second_div");
        const minusButton = screen.getByTestId("scroll_minus");
        const plusButton = screen.getByTestId("scroll_plus");
 
        fireEvent.click(plusButton);

        expect(firstDiv.scrollLeft).toEqual(EVENT_SIZE);
        expect(secondDiv.scrollLeft).toEqual(EVENT_SIZE);
        
        fireEvent.click(minusButton); 

        expect(firstDiv.scrollLeft).toEqual(0);
        expect(secondDiv.scrollLeft).toEqual(0);
    });
 })