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

export function Channel({ index, date_end, date_begin, name, event }: ChannelProps) {
    // const current_event = useChannelStore((state) => state.current_event);
    const date_from = useChannelStore((state) => state.date_from);
    const setCurrentEvent = useChannelStore((state) => state.setCurrentEvent);
 
 
    const width = ( index === 0 ?
        moment(date_end).diff(roundToNearestHalfHour(getDateFromString(date_from)), 'minutes') :
        moment(date_end).diff(moment(date_begin), 'minutes')
    );


    const handleMouseOver  = (event: Event) => setCurrentEvent(event)

    return <div onMouseOver={() => handleMouseOver(event)} className={`hover:bg-red-700`} style={{
        width: `${ width * 11}px`
    }}>
        <div className="border-[#585858] p-4 h-[7.2rem] first:border-t border-r first:border-l border-b border-[3px]">

            <h2 className="whitespace-nowrap overflow-hidden text-xl font-semibold overflow-ellipsis">{name} </h2>

            <p>
                {date_begin.split(' ')[1]} - {date_end.split(' ')[1]}
            </p>
        </div>
    </div>
} 
