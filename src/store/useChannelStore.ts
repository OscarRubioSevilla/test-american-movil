import { getChannels } from './../services/channels';
import { create } from 'zustand';


interface BookStore {
    data: Array<any>,
    loading: boolean,
    hasErrors: boolean,
    getChannels: () => void
}


export const useBookStore = create<BookStore>((set) => ({
    data: [],
    loading: false,
    hasErrors: false,
    getChannels: async () => {
      set(() => ({ loading: true }));
      try {
        const response = await getChannels();
        set((state: BookStore) => ({ data: (state.data = response.data), loading: false }));
      } catch (err) {
        set(() => ({ hasErrors: true, loading: false }));
      }
    },
})); 
