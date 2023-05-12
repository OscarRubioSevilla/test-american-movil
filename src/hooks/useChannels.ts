
import { useEffect } from "react";
import { useBookStore } from "../store/useChannelStore";
function useChannels() {

const { data, getChannels, hasErrors, loading } = useBookStore();

    useEffect(() => {
        getChannels()
    },[])

  return { data, hasErrors, loading }
}

export default useChannels