import { useEffect } from "react";
import { useChannelStore } from "../store/useChannelStore";
import { getDateHeader, getDateFromString } from "../utils/utils";
import { shallow } from "zustand/shallow";

interface UseChannelProps {
  date_from: string, 
  date_to: string
}

export function useChannels(props: UseChannelProps) {
  const { data, getChannels, hasErrors, date_from, loading } = useChannelStore(
    (state) => ({
      getChannels: state.getChannels,
      hasErrors: state.hasErrors,
      loading: state.loading,
      date_from: state.date_from,
      data: state.data,
    }), shallow);

  useEffect(() => {
    getChannels({
      date_from: props.date_from,
      date_to: props.date_to
    });
  }, []);

  const dates = getDateHeader(getDateFromString(date_from));

  return { data, hasErrors, loading, dates };
}
