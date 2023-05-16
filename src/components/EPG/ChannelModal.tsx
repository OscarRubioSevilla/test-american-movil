import { useChannels } from "../../hooks/useChannels";
import './Modal.scss'; 
import { RenderChannel } from "./RenderChannel";
import RenderChannelModal from "./RenderChannelModal";
import { setDateToString } from "../../utils/utils";
import moment from "moment";
interface ChannelModalProps {
    handleClose: () => void;
}
  
function ChannelModal({ handleClose }: ChannelModalProps) {

    const { loading, data: channelData, hasErrors, dates } = useChannels({
        date_from: setDateToString(moment()),
        date_to:   setDateToString(moment().add(1, 'day'))
    });
  
    if (loading)
        return <></>;

    if (hasErrors)
        return <p>Ha ocurrido un error al cargar los canales.</p>;

    return <div className="modal" role="modal">
        <div className="modal-header">
            <div className="flex text-white justify-end">
                <button role="close_modal" onClick={handleClose} className="text-white">
                    <svg stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 16 16" height="3em" width="3em" xmlns="http://www.w3.org/2000/svg"><path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z"></path></svg>
                </button>
            </div>
            <RenderChannel />
        </div>
        <div className="content">
            <section>
                <RenderChannelModal channelData={channelData} dates={dates}></RenderChannelModal>
            </section>
        </div>
    </div>
}

export default ChannelModal;



