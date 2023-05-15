import { useChannels } from "../../hooks/useChannels";
import './Modal.scss';
import { Channel } from "./Channel";
import { RenderChannel } from "./RenderChannel";
import { MutableRefObject, useRef } from "react";
import { EVENT_SIZE } from "../../constants/const";
import { setDateToString } from "../../utils/utils";
import moment from "moment";
interface ChannelModalProps {
    handleClose: () => void;
}
  
function ChannelModal({ handleClose }: ChannelModalProps) {
    const firstDivRef = useRef() as MutableRefObject<HTMLDivElement>;
    const secondDivRef = useRef() as MutableRefObject<HTMLDivElement>;
  
    const syncScrollFirstToSecond  = (scroll: any) => {
        secondDivRef.current.scrollLeft = scroll.target.scrollLeft;
    };
  
    const syncScrollSecondToFirst  = (scroll: any) => {
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


    const { loading, data: channelData, hasErrors, dates } = useChannels({
        date_from: setDateToString(moment()),
        date_to:   setDateToString(moment().add(1, 'day'))
    });

    if (loading)
        return <></>;

    if (hasErrors)
        return <p>Ha ocurrido un error al cargar los canales.</p>;

    return <div className="modal">
        <div className="flex justify-between">
            <button onClick={handleClose}>OK</button>
        </div>
        <div className="content">
            <section>
                <>
                    {channelData.length > 0 ? (
                        <>
                            <RenderChannel />
                                <div>
                                    <div className="list-none w-[104%] lg:w-fit inline-flex px-2 bg-black">

                                        <div className="w-1/3 lg:w-[11vw] bg-black text-white flex justify-center items-center">

                                            <p className="text-white text-xl font-semibold">HOY</p>
                                        </div>

                                        <div className="w-2/3 lg:w-[89vw] py-1 relative overflow-y-hidden">
                                            <div className="absolute right-0 z-30 flex justify-center items-center gap-4 pr-4 lg:pr-2">
                                                    <button onClick={() => scrollEvents(false)} className="text-red-800 text-4xl font-bold">-</button>
                                                    <button onClick={() => scrollEvents(true)} className="text-red-800 text-4xl font-bold">+</button>
                                            </div>
                                            <div className="relative w-full h-fit overflow-y-hidden overflow-x-hidden" ref={secondDivRef} onScroll={syncScrollSecondToFirst }>
                                                <div className="inline-flex text-white relative" >
                                                    {
                                                        dates.map((date) => <div className="w-[330px] py-1 px-2 border-r border-transparent" key={date}>
                                                            <p className="text-white text-xl font-semibold">{date}</p>
                                                        </div>)
                                                    }
                                               
                                                </div>
                                      
                                            </div> 
                                        </div>
                                    </div>
                                    <div className="w-[104%] lg:w-fit h-[63vh] overflow-y-auto inline-flex bg-black">

                                        <div className="w-1/3 lg:w-[11vw] h-fit bg-black">

                                            {channelData.map((channel) => (
                                                <div className="px-2 h-[7.2rem] bg-[#1a1a1a] rounded-xl flex border-black border-8 justify-between items-center">
                                                    <p className="text-white text-3xl">{channel.number}</p>
                                                    <figure className="w-36">
                                                        <img src={channel.image} alt="" />
                                                    </figure>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="w-2/3 lg:w-[89vw] h-fit relative overflow-y-hidden"> 
                                            <div className="relative h-full overflow-x-auto w-full overflow-y-auto" ref={firstDivRef} onScroll={syncScrollFirstToSecond }>

                                                {channelData.map((channel) => (
                                                    <div className="inline-flex  bg-[#1a1a1a] text-white" >
                                                        {
                                                            channel.events.map((event, index) => <Channel name={event.name} date_begin={event.date_begin} event={event} date_end={event.date_end} index={index} />)
                                                        }
                                                    </div>
                                                ))}
                                            </div> 
                                        </div>
                                    </div>
                                </div> 
                        </>
                    ) : (
                        <p>No hay canales disponibles.</p>
                    )}
                </>
            </section>
        </div>
    </div>
}

export default ChannelModal;



