import { useChannelStore } from "../../store/useChannelStore";

export function RenderChannel() {
    const current_event = useChannelStore((state) => state.current_event);

    return (
        <div className="h-[32vh] w-full flex flex-col justify-between">
            <div>
                {current_event.name}
            </div>
        </div>
    )
}
