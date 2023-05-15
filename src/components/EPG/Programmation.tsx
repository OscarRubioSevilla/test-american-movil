import { useState } from "react";
import ChannelModal from "./ChannelModal";
export function Programmation() { 

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="relative h-screen w-screen flex justify-center items-center">
      <button onClick={() => setOpenModal(true)}>MOSTRAR EPG</button>
      {
        openModal ? <ChannelModal handleClose={() => setOpenModal(false)} /> : ''
      }
    </div>
  );
}