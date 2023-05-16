import { MutableRefObject, useRef } from 'react'
import { EVENT_SIZE } from '../../constants/const';
import { Channel as ChannelProps } from '../../interfaces/IChannel';
import { Channel } from './Channel';
interface ChannelModalProps {
    dates: string[],
    channelData: ChannelProps[]
}

function RenderChannelModal({ channelData, dates }: ChannelModalProps) {
    const firstDivRef = useRef() as MutableRefObject<HTMLDivElement>;
    const secondDivRef = useRef() as MutableRefObject<HTMLDivElement>;

    const syncScrollFirstToSecond = (scroll: any) => {
        secondDivRef.current.scrollLeft = scroll.target.scrollLeft;
    };

    const syncScrollSecondToFirst = (scroll: any) => {
        firstDivRef.current.scrollLeft = scroll.target.scrollLeft;
    };

    const scrollEvents = (scrollRight: boolean) => {
        if (scrollRight) {
            secondDivRef.current.scrollLeft += EVENT_SIZE;
            firstDivRef.current.scrollLeft += EVENT_SIZE;
            return;
        }
        secondDivRef.current.scrollLeft -= EVENT_SIZE;
        firstDivRef.current.scrollLeft -= EVENT_SIZE;
    }
    return (
        <>
            {channelData.length > 0 ? (
                <>
                    <div>
                        <div className="list-none w-[104%] lg:w-fit inline-flex px-2 bg-black">

                            <div className="w-1/3 lg:w-[11vw] bg-black text-white flex justify-center items-center">

                                <p test-id="today_mark" className="text-white text-xl font-semibold">HOY</p>
                            </div>

                            <div className="w-2/3 lg:w-[89vw] py-1 relative overflow-y-hidden flex items-center">
                                <div className="absolute right-0 z-30 flex justify-center items-center gap-4 pr-4 lg:pr-2 bg-black">
                                    <button data-testid="scroll_minus" onClick={() => scrollEvents(false)} className="text-white text-4xl font-bold">{`<`}</button>
                                    <button data-testid="scroll_plus" onClick={() => scrollEvents(true)} className="text-white text-4xl font-bold">{`>`}</button>
                                </div>
                                <div className="relative w-full h-fit overflow-y-hidden overflow-x-hidden" data-testid="second_div" ref={secondDivRef} onScroll={syncScrollSecondToFirst}>
                                    <div className="inline-flex text-white relative" >
                                        {
                                            dates.map((date, index) => <div className="w-[330px] py-1 px-2 border-r border-transparent" key={index}>
                                                <p className="text-white text-xl font-semibold">{date}</p>
                                            </div>)
                                        }

                                    </div>

                                </div>
                            </div>
                        </div>
                        <div className="w-[104%] lg:w-fit h-[63vh] overflow-y-auto inline-flex bg-black">

                            <div className="w-1/3 lg:w-[11vw] h-fit bg-black">

                                {channelData.map((channel, index) => (
                                    <div key={index} data-testid="channel-item" className="channel-item p-3 lg:px-2 h-[7.2rem] bg-nero flex-col sm:flex-row rounded-xl flex border-black border-8 justify-between items-center">
                                        <p className="text-white text-xl sm:text-3xl">{channel.number}</p>
                                        <figure className=" w-24 sm:w-36">
                                            <img src={channel.image} alt="" />
                                        </figure>
                                    </div>
                                ))}
                            </div>

                            <div className="w-2/3 lg:w-[89vw] h-fit relative overflow-y-hidden">
                                <div className="relative h-full overflow-x-auto w-full overflow-y-auto" data-testid="first_div" ref={firstDivRef} onScroll={syncScrollFirstToSecond}>

                                    {channelData.map((channel, key) => (
                                        <div className="inline-flex  bg-nero text-white" key={key}>
                                            {
                                                channel.events.map((event, index) => <Channel key={index} name={event.name} date_begin={event.date_begin} event={event} date_end={event.date_end} index={index} />)
                                            }
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </>
            ) : (
                <p role="no_available">No hay canales disponibles.</p>
            )}
        </>
    )
}

export default RenderChannelModal