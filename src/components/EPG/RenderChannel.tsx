import { useChannelStore } from "../../store/useChannelStore";
import { formatEventTime } from "../../utils/utils";
export function RenderChannel() {
    const current_event = useChannelStore((state) => state.current_event);

    const eventTime = formatEventTime({
        date_begin: current_event.date_begin,
        date_end: current_event.date_end,
        duration: current_event.duration,
    })
 
    return (
        <div className="h-[32vh] w-full flex flex-col justify-between overflow-y-hidden">
            <div className="lg:py-6 lg:px-10 px-3">
                <h1 role="title" className="text-white text-3xl lg:text-5xl font-bold text whitespace-nowrap overflow-ellipsis">{current_event.name}</h1>
                <p role="event_time" className="text-white mt-5 lg:mt-10 text-lg">{ eventTime }</p>
                <p role="description" className="text-white">{current_event.description}</p>
            </div>
        </div>
    )
}
