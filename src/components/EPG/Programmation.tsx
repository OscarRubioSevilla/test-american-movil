import { useState } from "react";
import ChannelModal from "./ChannelModal";
export function Programmation() { 

  const [openModal, setOpenModal] = useState(false)

  return (
    <div className="relative">
      <button onClick={() => setOpenModal(true)}>Abrir Modal</button>
      {
        openModal ? <ChannelModal handleClose={() => setOpenModal(false)} /> : ''
      }
    </div>
  );
}