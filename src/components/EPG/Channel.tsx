import moment from "moment"
import { roundToNearestHalfHour, getDateFromString } from "../../utils/utils"
import { useChannelStore } from "../../store/useChannelStore";
import { Event } from "../../interfaces/IChannel";
interface ChannelProps {
    event: Event,
    index: number,
    name: string,
    date_end: string,
    date_begin: string
}

export function Channel({ index, event }: ChannelProps) {


    if (!Object.values(event).length) {
        return <div data-testid="no-event">Sin evento</div>
    }


    // const current_event = useChannelStore((state) => state.current_event);
    const date_from = useChannelStore((state) => state.date_from);
    const setCurrentEvent = useChannelStore((state) => state.setCurrentEvent);
 
    const width = ( index === 0 ?
        moment(event.date_end).diff(roundToNearestHalfHour(getDateFromString(date_from)), 'minutes') :
        moment(event.date_end).diff(moment(event.date_begin), 'minutes')
    );

    const handleMouseOver  = (event: Event) => setCurrentEvent(event)

    return <div onMouseOver={() => handleMouseOver(event)} data-testid="hover-test" className={`hover:bg-gun-powder`} style={{
        width: `${ width * 11}px`
    }}>
        <div className="border-mortar p-4 h-[7.2rem] first:border-t border-r first:border-l border-b border-[3px]">

            <h2 data-testid="channel-name" className="whitespace-nowrap overflow-hidden text-xl font-semibold overflow-ellipsis">{event.name}</h2>

            <p data-testid="channel-time">{event.date_begin.split(' ')[1]} - {event.date_end.split(' ')[1]}</p>
        </div>
    </div>
} 
