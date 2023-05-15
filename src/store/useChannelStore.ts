import { getChannels } from './../services/channels';
import { create } from 'zustand';

import { Channel, IResponse, Event } from '../interfaces/IChannel';
import { ChannelProps } from './../services/channels';
export interface ChannelStore {
    current_event: Event,
    data: Array<Channel>,
    date_from: string,
    loading: boolean,
    hasErrors: boolean,
    getChannels: (props: ChannelProps) => void,
    setCurrentEvent: (event: Event) => void,
}

export const useChannelStore = create<ChannelStore>((set) => ({
    data: [],
    date_from: '',
    loading: false,
    hasErrors: false,
    current_event: {} as Event,
    getChannels: async (props) => {
      set(() => ({ loading: true }));
      try {
        const response: IResponse = await getChannels(props);
        set((state: ChannelStore) => ({ 
          data: state.data = response.response.channels, 
          date_from: state.date_from = response.entry.date_from, 
          loading: false 
        }));
      } catch (err) {
        set(() => ({ hasErrors: true, loading: false }));
      }
    },
    setCurrentEvent: (event: Event) => {
      set((state) => ({
        current_event: state.current_event = event
      }) )
    }
})); 
